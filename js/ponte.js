import { supabase } from "./supabaseClient.js";

const traducoes = [
  ["Invalid login credentials", "E-mail ou senha incorretos"],
  ["User already registered", "Este e-mail já está cadastrado"],
  ["already been registered", "Este e-mail já está cadastrado"],
  ["Password should be at least", "A senha precisa ter 6 ou mais caracteres"],
  ["Email not confirmed", "Confirme o seu e-mail antes de entrar"],
  ["Unable to validate email", "E-mail inválido"],
];

function traduzir(mensagem) {
  for (const [original, texto] of traducoes) {
    if (mensagem && mensagem.indexOf(original) !== -1) return texto;
  }
  return mensagem || "Erro ao falar com o servidor";
}

async function nomeDoUsuario(email) {
  const { data } = await supabase
    .from("usuarios_db")
    .select("nome")
    .eq("email", email)
    .maybeSingle();
  return data && data.nome ? data.nome : email.split("@")[0];
}

async function usuarioDaSessao() {
  const { data } = await supabase.auth.getUser();
  return data && data.user ? data.user : null;
}

let temporizador = null;

window.ponte = {
  async usuarioAtual() {
    const { data } = await supabase.auth.getSession();
    if (!data || !data.session) return null;
    const email = data.session.user.email;
    return { nome: await nomeDoUsuario(email), email: email };
  },

  async cadastrar(nome, email, senha) {
    const { data, error } = await supabase.auth.signUp({ email: email, password: senha });
    if (error) throw new Error(traduzir(error.message));

    if (!data.session) {
      const entrada = await supabase.auth.signInWithPassword({ email: email, password: senha });
      if (entrada.error) throw new Error(traduzir(entrada.error.message));
    }

    const { error: erroPerfil } = await supabase.from("usuarios_db").insert([{ nome: nome, email: email }]);
    if (erroPerfil) console.error("Erro ao salvar o nome:", erroPerfil.message);

    return { nome: nome, email: email };
  },

  async entrar(email, senha) {
    const { error } = await supabase.auth.signInWithPassword({ email: email, password: senha });
    if (error) throw new Error(traduzir(error.message));
    return { nome: await nomeDoUsuario(email), email: email };
  },

  async sair() {
    await supabase.auth.signOut();
  },

  async carregarEstado() {
    const user = await usuarioDaSessao();
    if (!user) return undefined;
    const { data, error } = await supabase
      .from("estado_site_db")
      .select("estado")
      .eq("user_id", user.id)
      .maybeSingle();
    if (error) {
      console.error("Não foi possível carregar os dados:", error.message);
      return undefined;
    }
    return data ? data.estado : undefined;
  },

  salvarEstado(estado) {
    clearTimeout(temporizador);
    temporizador = setTimeout(async () => {
      const user = await usuarioDaSessao();
      if (!user) return;
      const { error } = await supabase
        .from("estado_site_db")
        .upsert({ user_id: user.id, estado: estado, atualizado: new Date().toISOString() });
      if (error) console.error("Não foi possível salvar os dados:", error.message);
    }, 600);
  },

  async enviarContato(dados) {
    const { error } = await supabase.from("contatos_db").insert([
      {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone || null,
        mensagem: (dados.assunto ? "[" + dados.assunto + "] " : "") + dados.mensagem,
        retorno: null,
      },
    ]);
    if (error) throw new Error("Não foi possível enviar. Tente de novo.");
  },
};
