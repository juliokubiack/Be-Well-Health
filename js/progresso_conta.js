import { supabase } from "./supabaseClient.js";

let usuario = null;

function primeiroNome(nome) {
  return nome.trim().split(" ")[0];
}

async function iniciar() {
  const campoNome = document.getElementById("nome-usuario");
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (localStorage.getItem("bewell-dono")) {
      localStorage.removeItem("bewell-dono");
      definirTreinos([]);
    }
    return;
  }

  usuario = user;

  const { data: perfil } = await supabase
    .from("usuarios_db")
    .select("nome")
    .eq("email", user.email)
    .single();

  if (campoNome) {
    if (perfil && perfil.nome) campoNome.textContent = ", " + primeiroNome(perfil.nome);
  }

  const { data: linha, error } = await supabase
    .from("progresso_db")
    .select("treinos")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Não foi possível carregar o progresso:", error.message);
    return;
  }

  const dono = localStorage.getItem("bewell-dono");
  localStorage.setItem("bewell-dono", user.id);
  const daNuvem = linha && Array.isArray(linha.treinos) ? linha.treinos : [];

  if (daNuvem.length > 0) {
    definirTreinos(daNuvem);
  } else if (dono === null || dono === user.id) {
    if (treinos.length > 0) {
      await sincronizarNuvem(treinos);
    }
  } else {
    definirTreinos([]);
  }

}

async function sincronizarNuvem(lista) {
  if (!usuario) return;
  const { error } = await supabase
    .from("progresso_db")
    .upsert({ user_id: usuario.id, treinos: lista, atualizado: new Date().toISOString() });
  if (error) {
    console.error("Não foi possível salvar o progresso:", error.message);
  }
}

window.sincronizarNuvem = sincronizarNuvem;

iniciar();