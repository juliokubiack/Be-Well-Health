# Be-Well-Health

# Be Well + BeHealthier

Site único com as páginas dos dois projetos. O visual (menu lateral, verde, pêssego e branco) é o do BeHealthier. O cérebro do Be Well aparece só nas páginas do Be Well.

## Páginas

BeHealthier: `index.html`, `receitas.html`, `cardapio.html`, `equilibrio.html`, `dicas.html`, `entrega.html`, `videos.html`

Be Well: `bewell.html` (início), `rotina.html`, `exercicios.html`, `progresso.html` (com o jogo Be Well Arena)

Dos dois: `sobre.html`, `contato.html`

Conta: `login.html` (entrar e criar conta), `recuperar-senha.html`, `editar-perfil.html`

## Antes de publicar

1. No Supabase, abra SQL Editor, cole o conteúdo de `supabase_tabelas.sql` e clique em Run. Isso cria `progresso_db` e `estado_site_db`, cada uma com regra para a pessoa ver só os próprios dados.
2. Confirme que `usuarios_db` (nome, email) e `contatos_db` (nome, email, telefone, mensagem, retorno) existem e permitem INSERT.

## Como funciona o login

Existe uma conta só, a do Supabase. Cardápio, favoritas, metas e pedido do BeHealthier ficam salvos em `estado_site_db`. O XP e os treinos do Be Well ficam em `progresso_db`. Quem não entra na conta continua usando o site como visitante, com os dados só no aparelho.

## Pastas

- `css/`: `style.css`, `auth.css` e `reset.css` são do BeHealthier. `bewell.css` tem o estilo das páginas do Be Well, já com as cores do BeHealthier.
- `js/`: `app.js` é do BeHealthier (agora usando o Supabase). `ponte.js` liga o `app.js` ao Supabase. O restante é do Be Well.
- `bewell/`: imagens do Be Well.
- `Imagens/`: imagens do BeHealthier.
