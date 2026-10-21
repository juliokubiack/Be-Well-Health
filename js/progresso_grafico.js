const imgBronze = new Image();
imgBronze.src = "bewell/img_progresso/medalha-um.png";
const imgPrata = new Image();
imgPrata.src = "bewell/img_progresso/medalha-dois.png";
const imgOuro = new Image();
imgOuro.src = "bewell/img_progresso/medalha-tres.png";

const metasDia = [100, 200, 300];

function medalhaDoDia(xp) {
  let total = 0;
  for (let i = 0; i < metasDia.length; i++) {
    if (xp >= metasDia[i]) total = i + 1;
  }
  return total;
}

const pluginMedalhasComImagens = {
  id: "pluginMedalhasComImagens",
  afterDatasetsDraw(chart) {
    const { ctx, data } = chart;
    const tamanhoMedalha = 24;
    const imagens = [null, imgBronze, imgPrata, imgOuro];

    ctx.save();
    ctx.textAlign = "center";
    ctx.font = "700 12px Mulish, sans-serif";
    ctx.fillStyle = "#252b42";
    data.datasets[0].data.forEach((valor, index) => {
      if (valor <= 0) return;
      const metaBarra = chart.getDatasetMeta(0).data[index];
      const xBarra = metaBarra.x;
      const yBarra = metaBarra.y;

      ctx.fillText(valor + " XP", xBarra, yBarra - 6);

      const imagem = imagens[medalhaDoDia(valor)];
      if (imagem && imagem.complete) {
        ctx.drawImage(
          imagem,
          xBarra - tamanhoMedalha / 2,
          yBarra - tamanhoMedalha - 22,
          tamanhoMedalha,
          tamanhoMedalha
        );
      }
    });
    ctx.restore();
  },
};

const ctx = document.getElementById("meuGrafico").getContext("2d");
const meuGrafico = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#5e7745",
        borderRadius: 4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 40 } },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (item) => item.parsed.y + " XP",
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        display: false,
        beginAtZero: true,
        max: 375,
      },
    },
  },
  plugins: [pluginMedalhasComImagens],
});

function xpPorDia() {
  const hoje = new Date();
  const diaSemana = hoje.getDay() === 0 ? 6 : hoje.getDay() - 1;
  const segunda = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - diaSemana);
  const lista = [];

  for (let i = 0; i < 7; i++) {
    const dia = new Date(segunda.getFullYear(), segunda.getMonth(), segunda.getDate() + i);
    const texto = dia.toLocaleDateString("pt-BR");
    let soma = 0;
    for (let j = 0; j < treinos.length; j++) {
      if (treinos[j].data === texto) soma += treinos[j].xp;
    }
    lista.push(soma);
  }
  return lista;
}

function atualizarGraficoXP() {
  const dados = xpPorDia();
  const maior = Math.max(metasDia[2], ...dados);
  meuGrafico.data.datasets[0].data = dados;
  meuGrafico.options.scales.y.max = Math.ceil(maior * 1.25);
  meuGrafico.update();
}

function atualizarTudo() {
  const lista = document.getElementById("lista-tarefas");
  const checkboxes = lista.querySelectorAll("input[type='checkbox']");
  const msgSemMeta = document.getElementById("sem-meta-msg");
  const totalMetas = checkboxes.length;

  let marcadas = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) marcadas++;
  });

  if (msgSemMeta) {
    if (totalMetas === 0) {
      msgSemMeta.style.display = "block";
    } else {
      msgSemMeta.style.display = "none";
    }
  }

  const contador = document.getElementById("contador");
  if (contador) contador.innerText = `${marcadas}/${totalMetas}`;

}

function abrirModalMeta() {
  const totalMetas = document.querySelectorAll("#lista-tarefas li").length;
  if (totalMetas >= 3) {
    alert("Você só pode adicionar no máximo 3 metas por dia!");
    return;
  }
  const modal = document.getElementById("modal-meta");
  if (modal) modal.classList.add("ativo");
}

function fecharModalMeta() {
  const modal = document.getElementById("modal-meta");
  if (modal) modal.classList.remove("ativo");
  const input = document.getElementById("input-meta-texto");
  if (input) input.value = "";
}

function salvarMeta() {
  const input = document.getElementById("input-meta-texto");
  const texto = input ? input.value.trim() : "";

  if (texto === "") {
    alert("Por favor, digite o texto da meta.");
    return;
  }

  const lista = document.getElementById("lista-tarefas");
  const idMeta = `meta-${Date.now()}`;

  const novoLi = document.createElement("li");
  novoLi.innerHTML = `
    <input type="checkbox" id="${idMeta}" onchange="atualizarTudo()">
    <label for="${idMeta}">${texto}</label>
  `;

  if (lista) lista.appendChild(novoLi);
  fecharModalMeta();
  atualizarTudo();
}

function removerMeta() {
  const lista = document.getElementById("lista-tarefas");
  if (!lista) return;

  const itens = lista.querySelectorAll("li");
  if (itens.length === 0) {
    alert("Não há metas para remover!");
    return;
  }

  lista.removeChild(itens[itens.length - 1]);
  atualizarTudo();
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarTudo();
  atualizarGraficoXP();
});