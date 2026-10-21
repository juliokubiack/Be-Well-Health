function mostrarErro(texto) {
    let caixa = document.getElementById('arena-erro');
    if (!caixa) {
        caixa = document.createElement('div');
        caixa.id = 'arena-erro';
        document.getElementById('arena').prepend(caixa);
    }
    caixa.textContent = texto;
}

window.addEventListener('error', function (e) {
    if (e.filename && e.filename.indexOf('mini_jogo') !== -1) {
        mostrarErro('Erro no jogo: ' + e.message + ' (' + e.filename.split('/').pop() + ', linha ' + e.lineno + ')');
    }
});

function completar(original) {
    const ex = Object.assign({}, original);
    if (!ex.nome) {
        ex.nome = 'Exercício';
    }
    if (!ex.descricao) {
        ex.descricao = '';
    }
    if (typeof ex.dicas === 'string') {
        ex.dicas = [ex.dicas];
    }
    if (!Array.isArray(ex.dicas)) {
        ex.dicas = [];
    }
    if (['corrida', 'peso', 'reps', 'tempo'].indexOf(ex.tipo) === -1) {
        ex.tipo = 'reps';
    }
    return ex;
}

let carregado = false;
let treinos = [];
try {
    treinos = JSON.parse(localStorage.getItem('bewell-treinos')) || [];
} catch (erro) {
    treinos = [];
}

function guardar() {
    localStorage.setItem('bewell-treinos', JSON.stringify(treinos));
    if (typeof sincronizarNuvem === 'function') {
        sincronizarNuvem(treinos);
    }
}

function definirTreinos(lista) {
    treinos = lista;
    localStorage.setItem('bewell-treinos', JSON.stringify(treinos));
    atualizarTopo();
    desenharHistorico();
}

function totalXP() {
    let soma = 0;
    for (let i = 0; i < treinos.length; i++) {
        soma += treinos[i].xp;
    }
    return soma;
}

function calcularNivel(xp) {
    return Math.floor(xp / 100) + 1;
}

const metasMedalha = [400, 800, 1200];
const nomesMedalha = ['bronze', 'prata', 'ouro'];

function medalhasConquistadas(xp) {
    let total = 0;
    for (let i = 0; i < metasMedalha.length; i++) {
        if (xp >= metasMedalha[i]) {
            total = i + 1;
        }
    }
    return total;
}

function atualizarMedalhas() {
    const xp = totalXP();
    const ganhas = medalhasConquistadas(xp);

    for (let i = 0; i < 3; i++) {
        const img = document.getElementById('med-' + (i + 1));
        if (img) {
            img.classList.toggle('opaca', ganhas <= i);
        }
    }

    const texto = document.getElementById('medalha-texto');
    if (texto) {
        if (ganhas >= 3) {
            texto.innerHTML = 'Todas as medalhas conquistadas!';
        } else {
            texto.innerHTML = '<strong>' + xp + '/' + metasMedalha[ganhas] + '</strong> XP para a medalha de ' + nomesMedalha[ganhas] + '!';
        }
    }
}

function atualizarTopo() {
    const xp = totalXP();
    document.getElementById('xp').textContent = xp;
    document.getElementById('nivel').textContent = calcularNivel(xp);
    document.getElementById('barra-xp').style.width = (xp % 100) + '%';
    atualizarMedalhas();
    if (typeof atualizarGraficoXP === 'function') {
        atualizarGraficoXP();
    }
}

const nomesMusculos = {
    peito: 'Peito', ombro: 'Ombros', biceps: 'Bíceps', triceps: 'Tríceps', antebraco: 'Antebraço',
    abdome: 'Abdome', obliquos: 'Oblíquos', adutores: 'Adutores', quadriceps: 'Quadríceps',
    trapezio: 'Trapézio', dorsais: 'Dorsais', lombar: 'Lombar', gluteos: 'Glúteos',
    posterior: 'Posterior de coxa', panturrilha: 'Panturrilha'
};

function el(musculo, tipo, a, b, c, d) {
    if (tipo === 'e') {
        return '<ellipse data-m="' + musculo + '" cx="' + a + '" cy="' + b + '" rx="' + c + '" ry="' + d + '"/>';
    }
    return '<polygon data-m="' + musculo + '" points="' + a + '"/>';
}

function duplo(musculo, x, y, rx, ry) {
    return el(musculo, 'e', x, y, rx, ry) + el(musculo, 'e', 100 - x, y, rx, ry);
}

const formasFrente = [
    duplo('ombro', 28, 40, 7, 7),
    duplo('peito', 41, 50, 10, 7),
    duplo('biceps', 22, 58, 5, 10),
    duplo('antebraco', 19, 82, 4.5, 11),
    el('abdome', 'e', 50, 77, 8, 15),
    duplo('obliquos', 36, 78, 4, 12),
    duplo('quadriceps', 40, 127, 9, 22),
    duplo('adutores', 47, 124, 3, 15),
    duplo('panturrilha', 39, 175, 6, 16)
].join('');

const formasCostas = [
    el('trapezio', 'p', '50,29 36,39 50,58 64,39'),
    duplo('ombro', 28, 40, 7, 7),
    duplo('dorsais', 40, 66, 9, 13),
    duplo('triceps', 22, 58, 5, 10),
    duplo('antebraco', 19, 82, 4.5, 11),
    el('lombar', 'e', 50, 91, 9, 7),
    duplo('gluteos', 42, 107, 8, 8),
    duplo('posterior', 40, 133, 8, 19),
    duplo('panturrilha', 39, 175, 6, 16)
].join('');

function bonecoSVG(titulo, formas, ativos) {
    let svg = '<figure><svg viewBox="0 0 100 200" role="img" aria-label="' + titulo + '">';
    svg += '<g class="base"><circle cx="50" cy="14" r="10"/><rect x="45" y="22" width="10" height="9" rx="3"/>';
    svg += '<path d="M29 33 Q50 28 71 33 L67 102 Q50 108 33 102 Z"/>';
    svg += '<ellipse cx="22" cy="58" rx="6" ry="14"/><ellipse cx="78" cy="58" rx="6" ry="14"/>';
    svg += '<ellipse cx="19" cy="82" rx="5.5" ry="13"/><ellipse cx="81" cy="82" rx="5.5" ry="13"/>';
    svg += '<ellipse cx="40" cy="130" rx="11" ry="28"/><ellipse cx="60" cy="130" rx="11" ry="28"/>';
    svg += '<ellipse cx="39" cy="175" rx="7" ry="20"/><ellipse cx="61" cy="175" rx="7" ry="20"/></g>';
    svg += '<g class="musculos">' + formas + '</g></svg><figcaption>' + titulo + '</figcaption></figure>';
    for (let i = 0; i < ativos.length; i++) {
        svg = svg.split('data-m="' + ativos[i] + '"').join('data-m="' + ativos[i] + '" class="ativo"');
    }
    return svg;
}

function desenharMusculos(musculos, foto) {
    let html = '<div class="caixa"><h3>Músculos trabalhados</h3>';
    if (foto) {
        html += '<div class="foto-ex"><img src="' + foto + '" alt="Foto do exercício"></div>';
    }
    html += '<div class="corpos">' + bonecoSVG('Frente', formasFrente, musculos) + bonecoSVG('Costas', formasCostas, musculos) + '</div>';
    const nomes = [];
    for (let i = 0; i < musculos.length; i++) {
        nomes.push(nomesMusculos[musculos[i]] || musculos[i]);
    }
    html += '<p class="texto-musculos"><b>Ativa:</b> ' + nomes.join(', ') + '</p></div>';
    return html;
}

function mostrarSecao(id) {
    document.getElementById('menu').classList.add('escondido');
    document.getElementById('lista').classList.add('escondido');
    document.getElementById('exercicio').classList.add('escondido');
    document.getElementById(id).classList.remove('escondido');
    if (carregado) {
        document.getElementById('arena').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function mostrarMenu() {
    mostrarSecao('menu');
    atualizarTopo();
    desenharHistorico();
}

function abrirTreinos() {
    let html = '<button class="botao" onclick="mostrarMenu()">← Voltar</button>';
    html += '<h2>Academia</h2>';
    html += '<p class="texto">Escolha o seu treino:</p>';
    html += '<div class="cards">';
    for (const letra in treinosAcademia) {
        html += '<div class="card academia" onclick="abrirTreino(\'' + letra + '\')">';
        html += '<h2>Treino ' + letra + '</h2>';
        html += '<p>' + treinosAcademia[letra] + '</p>';
        html += '</div>';
    }
    html += '</div>';

    document.getElementById('lista').innerHTML = html;
    mostrarSecao('lista');
}

function abrirTreino(letra) {
    let html = '<button class="botao" onclick="abrirTreinos()">← Voltar</button>';
    html += '<h2>Treino ' + letra + '</h2>';
    html += '<p class="texto">' + treinosAcademia[letra] + '</p>';

    const lista = exercicios.academia;
    let quantos = 0;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].treino === letra) {
            html += '<div class="item" onclick="abrirExercicio(\'academia\', ' + i + ')">';
            html += '<b>' + (lista[i].nome || 'Exercício') + '</b><br>';
            html += '<small>' + (lista[i].descricao || '') + '</small>';
            html += '</div>';
            quantos++;
        }
    }
    if (quantos === 0) {
        html += '<p>Ainda não tem exercícios neste treino.</p>';
    }

    document.getElementById('lista').innerHTML = html;
    mostrarSecao('lista');
}

function abrirModo(modo) {
    if (modo === 'academia') {
        abrirTreinos();
        return;
    }
    let html = '<button class="botao" onclick="mostrarMenu()">← Voltar</button>';
    html += '<h2>' + modos[modo] + '</h2>';
    html += '<p class="texto">Escolha um exercício:</p>';

    const lista = exercicios[modo];
    for (let i = 0; i < lista.length; i++) {
        html += '<div class="item" onclick="abrirExercicio(\'' + modo + '\', ' + i + ')">';
        html += '<b>' + (lista[i].nome || 'Exercício') + '</b><br>';
        html += '<small>' + (lista[i].descricao || '') + '</small>';
        html += '</div>';
    }

    document.getElementById('lista').innerHTML = html;
    mostrarSecao('lista');
}

function abrirExercicio(modo, indice) {
    const ex = completar(exercicios[modo][indice]);

    let voltar = 'abrirModo(\'' + modo + '\')';
    if (modo === 'academia') {
        voltar = 'abrirTreino(\'' + ex.treino + '\')';
    }
    let html = '<button class="botao" onclick="' + voltar + '">← Voltar</button>';
    html += '<h2>' + ex.nome + '</h2>';

    html += '<div class="caixa">';
    if (ex.video) {
        html += '<a class="botao" href="' + ex.video + '" target="_blank">▶ Ver como fazer (YouTube)</a>';
    }
    html += '<ul class="dicas">';
    for (let i = 0; i < ex.dicas.length; i++) {
        html += '<li>' + ex.dicas[i] + '</li>';
    }
    html += '</ul></div>';

    if (ex.musculos && ex.musculos.length) {
        html += desenharMusculos(ex.musculos, ex.foto);
    }

    html += '<div class="caixa"><h3>Registrar treino</h3>';
    if (ex.tipo === 'corrida') {
        html += campo('km', 'Distância (km)') + campo('minutos', 'Tempo (minutos)');
    }
    if (ex.tipo === 'peso') {
        html += campo('peso', 'Carga (kg)') + campo('series', 'Séries') + campo('reps', 'Repetições');
    }
    if (ex.tipo === 'reps') {
        html += campo('series', 'Séries') + campo('reps', 'Repetições');
    }
    if (ex.tipo === 'tempo') {
        html += campo('series', 'Séries') + campo('segundos', 'Segundos por série');
    }
    html += '<br><button class="botao" onclick="salvarTreino(\'' + modo + '\', ' + indice + ')">Salvar treino</button>';
    html += '</div>';

    html += '<h3>Seu histórico</h3><ul>';
    let achou = false;
    for (let i = treinos.length - 1; i >= 0; i--) {
        if (treinos[i].nome === ex.nome) {
            html += '<li>' + treinos[i].data + ' - ' + resumo(treinos[i]) + ' (+' + treinos[i].xp + ' XP)</li>';
            achou = true;
        }
    }
    if (!achou) {
        html += '<li>Ainda não tem nenhum treino aqui.</li>';
    }
    html += '</ul>';

    document.getElementById('exercicio').innerHTML = html;
    mostrarSecao('exercicio');
}

function campo(id, texto) {
    return '<label for="' + id + '">' + texto + '</label><input id="' + id + '" type="text" inputmode="decimal">';
}

function pegar(id) {
    const caixa = document.getElementById(id);
    if (!caixa) {
        return 0;
    }
    const n = parseFloat(caixa.value.replace(',', '.'));
    if (isNaN(n)) {
        return 0;
    }
    return n;
}

function salvarTreino(modo, indice) {
    const ex = completar(exercicios[modo][indice]);
    const dados = {};
    let xp = 0;

    if (ex.tipo === 'corrida') {
        dados.km = pegar('km');
        dados.minutos = pegar('minutos');
        if (dados.km <= 0 || dados.minutos <= 0) {
            alert('Preenche a distância e o tempo!');
            return;
        }
        xp = Math.round(dados.km * 10 + dados.minutos / 2);
    }

    if (ex.tipo === 'peso') {
        dados.peso = pegar('peso');
        dados.series = pegar('series');
        dados.reps = pegar('reps');
        if (dados.series <= 0 || dados.reps <= 0) {
            alert('Preenche as séries e as repetições! (se for sem carga, coloca 0 no peso)');
            return;
        }
        xp = Math.round(dados.series * 10);
    }

    if (ex.tipo === 'reps') {
        dados.series = pegar('series');
        dados.reps = pegar('reps');
        if (dados.series <= 0 || dados.reps <= 0) {
            alert('Preenche as séries e as repetições!');
            return;
        }
        xp = Math.round(dados.series * 8);
    }

    if (ex.tipo === 'tempo') {
        dados.series = pegar('series');
        dados.segundos = pegar('segundos');
        if (dados.series <= 0 || dados.segundos <= 0) {
            alert('Preenche as séries e os segundos!');
            return;
        }
        xp = Math.round(dados.series * 8);
    }

    if (xp < 5) {
        xp = 5;
    }

    const nivelAntes = calcularNivel(totalXP());
    const medalhasAntes = medalhasConquistadas(totalXP());

    treinos.push({
        modo: modo,
        nome: ex.nome,
        tipo: ex.tipo,
        dados: dados,
        xp: xp,
        data: new Date().toLocaleDateString('pt-BR')
    });
    guardar();

    const nivelDepois = calcularNivel(totalXP());
    const medalhasDepois = medalhasConquistadas(totalXP());
    atualizarTopo();

    if (medalhasDepois > medalhasAntes) {
        avisar('MEDALHA DE ' + nomesMedalha[medalhasDepois - 1].toUpperCase() + ' CONQUISTADA! (+' + xp + ' XP)');
    } else if (nivelDepois > nivelAntes) {
        avisar('SUBIU DE NÍVEL! Agora você é nível ' + nivelDepois + ' (+' + xp + ' XP)');
    } else {
        avisar('+' + xp + ' XP! Bora continuar!');
    }

    abrirExercicio(modo, indice);
}

function resumo(t) {
    if (t.tipo === 'corrida') {
        return t.dados.km + ' km em ' + t.dados.minutos + ' min';
    }
    if (t.tipo === 'peso') {
        return t.dados.series + 'x' + t.dados.reps + ' com ' + t.dados.peso + ' kg';
    }
    if (t.tipo === 'reps') {
        return t.dados.series + 'x' + t.dados.reps;
    }
    return t.dados.series + 'x' + t.dados.segundos + ' s';
}

function desenharHistorico() {
    const lista = document.getElementById('historico');
    if (treinos.length === 0) {
        lista.innerHTML = '<li>Nenhum treino ainda. Escolha um modo e comece!</li>';
        return;
    }
    let html = '';
    let contador = 0;
    for (let i = treinos.length - 1; i >= 0 && contador < 5; i--) {
        html += '<li><b>' + treinos[i].nome + '</b> - ' + resumo(treinos[i]) + ' (+' + treinos[i].xp + ' XP)</li>';
        contador++;
    }
    lista.innerHTML = html;
}

function avisar(texto) {
    const aviso = document.getElementById('aviso');
    aviso.textContent = texto;
    aviso.classList.add('mostrar');
    setTimeout(function () {
        aviso.classList.remove('mostrar');
    }, 3000);
}

function apagarTudo() {
    if (confirm('Quer mesmo apagar todo o seu progresso?')) {
        treinos = [];
        guardar();
        mostrarMenu();
    }
}

if (typeof exercicios === 'undefined' || typeof treinosAcademia === 'undefined' || typeof modos === 'undefined') {
    mostrarErro('Não encontrei os exercícios. Confira se o arquivo java.script/mini_jogo_dados.js existe, com esse nome exato, e se está carregado antes do mini_jogo.js na página.');
}

mostrarMenu();
carregado = true;