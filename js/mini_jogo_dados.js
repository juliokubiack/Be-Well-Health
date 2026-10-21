const modos = {
    corrida: 'Corrida',
    academia: 'Academia',
    calistenia: 'Calistenia',
    treino: 'Treino híbrido'
};

const treinosAcademia = {
    A: 'Peito, ombros e costas',
    B: 'Costas, lombar, coxas e abdome',
    C: 'Pernas, panturrilha e abdome',
    D: 'Braços e abdome'
};

const exercicios = {
    corrida: [
        {
            nome: 'Corrida leve',
            tipo: 'corrida',
            descricao: 'Ritmo em que dá para conversar.',
            dicas: ['Passada curta e leve, sem esticar demais a perna à frente', 'Braços dobrados a 90 graus, soltos e relaxados', 'Respire de forma natural; se faltar ar para conversar, diminua o ritmo'],
            video: 'https://www.youtube.com/watch?v=JeRmySBC0K4'
        },
        {
            nome: 'Tiros',
            tipo: 'corrida',
            descricao: 'Blocos rápidos com descanso no meio.',
            dicas: ['Aqueça uns 10 minutos antes de começar', 'Faça tiros de 30 a 60 segundos em ritmo forte, mas controlado', 'Descanse trotando ou caminhando antes do próximo tiro'],
            video: 'https://www.youtube.com/watch?v=5h7LUqUGoPU'
        },
        {
            nome: 'Longão',
            tipo: 'corrida',
            descricao: 'O treino mais longo da semana.',
            dicas: ['Comece bem devagar e mantenha o ritmo constante', 'Beba água antes e durante o treino', 'Aumente a distância aos poucos, de semana em semana'],
            video: 'https://www.youtube.com/watch?v=F4huoURvaYA'
        },
        {
            nome: 'Caminhada acelerada',
            tipo: 'corrida',
            descricao: 'Baixo impacto, ótima para começar.',
            dicas: ['Mantenha a postura ereta e o olhar à frente', 'Dê passos firmes, apoiando primeiro o calcanhar', 'Balance os braços junto com as pernas'],
            video: 'https://www.youtube.com/watch?v=wT3CSzZmCPs'
        }
    ],

    academia: [
        {
            nome: 'Supino reto na barra guiada',
            tipo: 'peso',
            treino: 'A',
            descricao: 'Peito, ombro e tríceps.',
            musculos: ['peito', 'ombro', 'triceps'],
            dicas: ['Alinhe o banco para a barra descer na linha dos mamilos', 'Mantenha as escápulas juntas, os cotovelos em diagonal (45° a 60°) e os antebraços na vertical', 'Comece com pouca carga para aquecer e aumente aos poucos, sempre com segurança'],
            video: 'https://www.youtube.com/watch?v=I9dUhe2W0YQ'
        },
        {
            nome: 'Crucifixo inclinado na polia baixa',
            tipo: 'peso',
            treino: 'A',
            descricao: 'Parte superior do peito.',
            musculos: ['peito', 'ombro'],
            dicas: ['Dê um passo à frente e incline levemente o tronco', 'Mantenha os cotovelos levemente dobrados durante todo o movimento', 'Una as mãos à frente do peito, sem balançar o corpo'],
            video: 'https://www.youtube.com/watch?v=NPQ3zjKwa4g'
        },
        {
            nome: 'Supino inclinado com halteres',
            tipo: 'peso',
            treino: 'A',
            descricao: 'Parte superior do peito e ombros.',
            musculos: ['peito', 'ombro', 'triceps'],
            dicas: ['Banco inclinado entre 30° e 45°, com as costas bem apoiadas', 'Desça os halteres devagar até a linha do peito', 'Empurre sem bater os halteres um no outro lá em cima'],
            video: 'https://www.youtube.com/watch?v=G-i3jMIbDmo'
        },
        {
            nome: 'Pullover',
            tipo: 'peso',
            treino: 'A',
            descricao: 'Peito e dorsais.',
            musculos: ['peito', 'dorsais', 'triceps'],
            dicas: ['Deite no banco segurando o halter com as duas mãos', 'Mantenha os cotovelos levemente dobrados e desça o peso atrás da cabeça devagar', 'Volte até a linha do peito sem arquear demais as costas'],
            video: 'https://www.youtube.com/watch?v=TVUYI8UhahE'
        },
        {
            nome: 'Elevação frontal com barra supinada',
            tipo: 'peso',
            treino: 'A',
            descricao: 'Ombros (parte da frente).',
            musculos: ['ombro'],
            dicas: ['Segure a barra com as palmas das mãos para cima, na largura dos ombros', 'Levante até a altura dos ombros, sem balançar o tronco', 'Desça controlando o peso, sem deixar a barra cair'],
            video: 'https://www.youtube.com/watch?v=MekKcbptjOE'
        },
        {
            nome: 'Desenvolvimento sentado na barra guiada',
            tipo: 'peso',
            treino: 'A',
            descricao: 'Ombros e tríceps.',
            musculos: ['ombro', 'triceps', 'trapezio'],
            dicas: ['Costas bem apoiadas no encosto e pés firmes no chão', 'Empurre a barra para cima sem travar os cotovelos', 'Desça a barra devagar até a altura do queixo'],
            video: 'https://www.youtube.com/watch?v=Uc93l97AOYU'
        },
        {
            nome: 'Elevação lateral na polia (por trás)',
            tipo: 'peso',
            treino: 'A',
            descricao: 'Ombros (parte lateral).',
            musculos: ['ombro', 'trapezio'],
            dicas: ['Fique de costas para a polia e puxe o cabo pela lateral do corpo', 'Suba o braço até a altura do ombro, com o cotovelo levemente dobrado', 'Controle a descida e evite usar impulso do tronco'],
            video: 'https://www.youtube.com/watch?v=P-3v8ieYCSc'
        },
        {
            nome: 'Remada alta no Cross Over',
            tipo: 'peso',
            treino: 'A',
            descricao: 'Ombros e trapézio.',
            musculos: ['ombro', 'trapezio', 'biceps'],
            dicas: ['Puxe o cabo na altura do peito, com os cotovelos acima das mãos', 'Mantenha o tronco firme e os ombros longe das orelhas', 'Desça devagar, sem soltar a carga de uma vez'],
            video: 'https://www.youtube.com/watch?v=qVdQsMODm0o'
        },
        {
            nome: 'Remada baixa neutra',
            tipo: 'peso',
            treino: 'B',
            descricao: 'Costas e bíceps.',
            musculos: ['dorsais', 'trapezio', 'biceps', 'lombar'],
            dicas: ['Sente com a coluna reta e o peito aberto', 'Puxe o triângulo em direção ao abdome, juntando as escápulas', 'Volte devagar, sem curvar as costas para frente'],
            video: 'https://www.youtube.com/watch?v=2YebbYuuBJQ'
        },
        {
            nome: 'Peck Deck inverso',
            tipo: 'peso',
            treino: 'B',
            descricao: 'Parte de trás dos ombros e costas.',
            musculos: ['ombro', 'trapezio', 'dorsais'],
            dicas: ['Fique de frente para o encosto, com o peito apoiado', 'Abra os braços para trás com os cotovelos levemente dobrados', 'Volte devagar, sem deixar a carga bater'],
            video: 'https://www.youtube.com/watch?v=_7ZJJy3Z99k'
        },
        {
            nome: 'Pull Down',
            tipo: 'peso',
            treino: 'B',
            descricao: 'Costas (dorsais).',
            musculos: ['dorsais', 'biceps'],
            dicas: ['Puxe a barra até a altura do peito, com o tronco levemente inclinado para trás', 'Leve os cotovelos para baixo e para trás', 'Suba controlando o peso, sem soltar os ombros'],
            video: 'https://www.youtube.com/watch?v=V-Z_RntYhZg'
        },
        {
            nome: 'Puxada alta bi-articulada',
            tipo: 'peso',
            treino: 'B',
            descricao: 'Costas e bíceps.',
            musculos: ['dorsais', 'biceps', 'trapezio'],
            dicas: ['Ajuste o banco para as pernas ficarem firmes sob o apoio', 'Puxe as manoplas em direção ao peito, juntando as escápulas', 'Volte com os braços quase estendidos, sem perder a postura'],
            video: 'https://www.youtube.com/watch?v=xSSle0N-364'
        },
        {
            nome: 'Extensor lombar',
            tipo: 'reps',
            treino: 'B',
            descricao: 'Lombar.',
            musculos: ['lombar', 'gluteos', 'posterior'],
            dicas: ['Posicione o quadril na ponta do apoio, com os pés bem presos', 'Desça o tronco com as costas retas e suba até alinhar o corpo', 'Não estique demais a coluna no final do movimento'],
            video: 'https://www.youtube.com/watch?v=6Bg5woPBEA8'
        },
        {
            nome: 'Agachamento com barra romana',
            tipo: 'peso',
            treino: 'B',
            descricao: 'Coxas e glúteos.',
            musculos: ['quadriceps', 'gluteos', 'posterior', 'lombar'],
            dicas: ['Mantenha a coluna reta e o abdome firme', 'Joelhos acompanhando a direção dos pés', 'Desça até onde conseguir manter a postura e suba empurrando o chão'],
            video: 'https://www.youtube.com/watch?v=yzUbKRchg_Q'
        },
        {
            nome: 'Abdominal bicicleta',
            tipo: 'reps',
            treino: 'B',
            descricao: 'Abdome e oblíquos.',
            musculos: ['abdome', 'obliquos'],
            dicas: ['Deite com as mãos atrás da cabeça, sem puxar o pescoço', 'Leve o cotovelo em direção ao joelho oposto, alternando os lados', 'Faça o movimento devagar, sentindo o abdome trabalhar'],
            video: 'https://www.youtube.com/watch?v=apmprS8H1MY'
        },
        {
            nome: 'Prancha alternada com 2 apoios',
            tipo: 'tempo',
            treino: 'B',
            descricao: 'Abdome e core.',
            musculos: ['abdome', 'ombro', 'obliquos'],
            dicas: ['Corpo reto, da cabeça aos calcanhares', 'Alterne os apoios sem girar o quadril', 'Contraia o abdome e respire normalmente'],
            video: 'https://www.youtube.com/watch?v=HpIzO13LwZw'
        },
        {
            nome: 'V-sit',
            tipo: 'reps',
            treino: 'B',
            descricao: 'Abdome.',
            musculos: ['abdome', 'quadriceps'],
            dicas: ['Deite com os braços estendidos acima da cabeça', 'Suba o tronco e as pernas ao mesmo tempo, formando um V', 'Desça devagar, sem deixar as costas bater no chão'],
            video: 'https://www.youtube.com/watch?v=jizJpDKVR5o'
        },
        {
            nome: 'Agachamento no Hack inverso',
            tipo: 'peso',
            treino: 'C',
            descricao: 'Coxas e glúteos.',
            musculos: ['quadriceps', 'gluteos'],
            dicas: ['Apoie bem as costas e o quadril no encosto', 'Pés na largura dos ombros, com os joelhos alinhados aos pés', 'Desça controlando e suba sem travar os joelhos'],
            video: 'https://www.youtube.com/watch?v=IaJu0O-qTgc'
        },
        {
            nome: 'Leg press horizontal (180°)',
            tipo: 'peso',
            treino: 'C',
            descricao: 'Coxas e glúteos.',
            musculos: ['quadriceps', 'gluteos', 'posterior'],
            dicas: ['Costas e quadril bem apoiados no banco', 'Pés na largura dos ombros, empurrando com o corpo todo do pé', 'Não trave os joelhos ao estender as pernas'],
            video: 'https://www.youtube.com/watch?v=gTo0HfVcLxo'
        },
        {
            nome: 'Panturrilha no Leg Press (180°)',
            tipo: 'peso',
            treino: 'C',
            descricao: 'Panturrilhas.',
            musculos: ['panturrilha'],
            dicas: ['Apoie só a ponta dos pés na plataforma', 'Estenda os joelhos sem travar e suba na ponta dos pés', 'Desça devagar até alongar a panturrilha'],
            video: 'https://www.youtube.com/watch?v=Ua7jx6wKyMw'
        },
        {
            nome: 'Leg press inclinado',
            tipo: 'peso',
            treino: 'C',
            descricao: 'Coxas e glúteos.',
            musculos: ['quadriceps', 'gluteos'],
            dicas: ['Costas e quadril bem apoiados no banco', 'Desça até os joelhos dobrarem cerca de 90°, sem o quadril sair do banco', 'Empurre sem travar os joelhos no final'],
            video: 'https://www.youtube.com/watch?v=waAxlYvtCcI'
        },
        {
            nome: 'Banco adutor',
            tipo: 'peso',
            treino: 'C',
            descricao: 'Parte interna das coxas.',
            musculos: ['adutores'],
            dicas: ['Costas bem apoiadas e pernas abertas só até onde for confortável', 'Feche as pernas de forma controlada', 'Volte devagar, sem deixar a carga bater'],
            video: 'https://www.youtube.com/watch?v=goQVyEGMYMM'
        },
        {
            nome: 'Cadeira extensora',
            tipo: 'peso',
            treino: 'C',
            descricao: 'Parte da frente das coxas.',
            musculos: ['quadriceps'],
            dicas: ['Ajuste o encosto para o joelho ficar alinhado com o eixo da máquina', 'Estenda as pernas sem travar os joelhos', 'Desça devagar, sem soltar a carga'],
            video: 'https://www.youtube.com/watch?v=RHgqvYAed_8'
        },
        {
            nome: 'Afundo',
            tipo: 'peso',
            treino: 'C',
            descricao: 'Coxas e glúteos.',
            musculos: ['quadriceps', 'gluteos', 'posterior'],
            dicas: ['Dê um passo largo e mantenha o tronco reto', 'Desça até o joelho de trás quase encostar no chão', 'Joelho da frente alinhado com o pé, sem passar muito da ponta dele'],
            video: 'https://www.youtube.com/watch?v=xLaKue8vfGY'
        },
        {
            nome: 'Mesa flexora',
            tipo: 'peso',
            treino: 'C',
            descricao: 'Parte de trás das coxas.',
            musculos: ['posterior', 'panturrilha'],
            dicas: ['Deite com os joelhos alinhados ao eixo da máquina', 'Flexione as pernas sem tirar o quadril do banco', 'Volte devagar, controlando a carga'],
            video: 'https://www.youtube.com/watch?v=8Nat6GRiEoc'
        },
        {
            nome: 'Agachamento livre com barra',
            tipo: 'peso',
            treino: 'C',
            descricao: 'Coxas, glúteos e core.',
            musculos: ['quadriceps', 'gluteos', 'lombar'],
            dicas: ['Barra apoiada nas costas, pés na largura dos ombros', 'Desça com a coluna reta e o abdome firme', 'Suba empurrando o chão, sem deixar os joelhos caírem para dentro'],
            video: 'https://www.youtube.com/watch?v=rM6SDUdl9fs'
        },
        {
            nome: 'Abdominal remador',
            tipo: 'reps',
            treino: 'C',
            descricao: 'Abdome.',
            musculos: ['abdome', 'quadriceps'],
            dicas: ['Comece deitado, com os braços estendidos atrás da cabeça', 'Suba o tronco e leve os joelhos ao peito ao mesmo tempo', 'Volte devagar, sem deixar o corpo cair'],
            video: 'https://www.youtube.com/watch?v=pNRpcChQmq0'
        },
        {
            nome: 'Abdominal oblíquo',
            tipo: 'reps',
            treino: 'C',
            descricao: 'Oblíquos (lateral do abdome).',
            musculos: ['obliquos', 'abdome'],
            dicas: ['Deite com os joelhos dobrados e as mãos ao lado da cabeça', 'Leve o ombro em direção ao joelho oposto, sem puxar o pescoço', 'Faça o movimento devagar e alterne os lados'],
            video: 'https://www.youtube.com/watch?v=rzOLdinORbk'
        },
        {
            nome: 'Rosca Scott na Cross Over',
            tipo: 'peso',
            treino: 'D',
            descricao: 'Bíceps.',
            musculos: ['biceps', 'antebraco'],
            dicas: ['Apoie bem os braços no banco Scott', 'Dobre os cotovelos sem tirar os braços do apoio', 'Desça devagar até quase estender o braço'],
            video: 'https://www.youtube.com/watch?v=0GaGrjOQ4rY'
        },
        {
            nome: 'Rosca 21 na barra W',
            tipo: 'peso',
            treino: 'D',
            descricao: 'Bíceps e antebraço.',
            musculos: ['biceps', 'antebraco'],
            dicas: ['Faça 7 repetições da metade de baixo, 7 da metade de cima e 7 completas, sem descansar', 'Use uma carga mais leve que a da rosca normal', 'Mantenha os cotovelos junto ao corpo, sem balançar o tronco'],
            video: 'https://www.youtube.com/watch?v=6OBD6HT4b6E'
        },
        {
            nome: 'Rosca alternada inclinada',
            tipo: 'peso',
            treino: 'D',
            descricao: 'Bíceps.',
            musculos: ['biceps'],
            dicas: ['Costas apoiadas no banco inclinado e braços soltos ao lado do corpo', 'Dobre um braço de cada vez, sem mexer o ombro', 'Desça devagar até estender totalmente o braço'],
            video: 'https://www.youtube.com/watch?v=mUEDnCGrNP4'
        },
        {
            nome: 'Rosca inversa no Cross',
            tipo: 'peso',
            treino: 'D',
            descricao: 'Antebraço e bíceps.',
            musculos: ['antebraco', 'biceps'],
            dicas: ['Segure a barra com as palmas das mãos para baixo', 'Mantenha os cotovelos junto ao corpo', 'Suba sem balançar o tronco e desça devagar'],
            video: 'https://www.youtube.com/watch?v=poSV5Kvgu1U'
        },
        {
            nome: 'Tríceps inverso na polia',
            tipo: 'peso',
            treino: 'D',
            descricao: 'Tríceps.',
            musculos: ['triceps'],
            dicas: ['Segure a barra com as palmas das mãos para cima', 'Mantenha os cotovelos junto ao corpo', 'Estenda os braços para baixo e volte devagar'],
            video: 'https://www.youtube.com/watch?v=qWqq2RMKJsU'
        },
        {
            nome: 'Tríceps corda no Cross Over',
            tipo: 'peso',
            treino: 'D',
            descricao: 'Tríceps.',
            musculos: ['triceps'],
            dicas: ['Cotovelos junto ao corpo, sem se mexerem durante o movimento', 'Estenda os braços e abra a corda no final', 'Volte devagar, sem levantar os ombros'],
            video: 'https://www.youtube.com/watch?v=JGUVRBKT0j4'
        },
        {
            nome: 'Tríceps pulley na barra curva',
            tipo: 'peso',
            treino: 'D',
            descricao: 'Tríceps.',
            musculos: ['triceps'],
            dicas: ['Cotovelos junto ao corpo e tronco levemente inclinado', 'Empurre a barra para baixo até estender os braços', 'Suba devagar até a altura do peito'],
            video: 'https://www.youtube.com/watch?v=UJbJ95IyfhY'
        },
        {
            nome: 'Tríceps coice na polia',
            tipo: 'peso',
            treino: 'D',
            descricao: 'Tríceps.',
            musculos: ['triceps', 'ombro'],
            dicas: ['Incline o tronco à frente com a coluna reta', 'Mantenha o braço junto ao corpo e estenda o cotovelo para trás', 'Volte devagar, sem balançar o corpo'],
            video: 'https://www.youtube.com/watch?v=qkuOPCJcYtE'
        },
        {
            nome: 'Abdominal canivete',
            tipo: 'reps',
            treino: 'D',
            descricao: 'Abdome.',
            musculos: ['abdome', 'quadriceps'],
            dicas: ['Deite com os braços estendidos acima da cabeça', 'Suba o tronco e as pernas ao mesmo tempo, tentando tocar os pés', 'Desça devagar, sem deixar as costas bater no chão'],
            video: 'https://www.youtube.com/watch?v=cm6BadT-cLk'
        },
        {
            nome: 'Abdominal cruzado',
            tipo: 'reps',
            treino: 'D',
            descricao: 'Abdome e oblíquos.',
            musculos: ['abdome', 'obliquos'],
            dicas: ['Deite com os joelhos dobrados e as mãos atrás da cabeça', 'Leve um ombro em direção ao joelho oposto, sem puxar o pescoço', 'Alterne os lados com movimentos controlados'],
            video: 'https://www.youtube.com/watch?v=AK8ZavT9XI0'
        }
    ],

    calistenia: [
        {
            nome: 'Flexão de braço',
            tipo: 'reps',
            descricao: 'Peito, ombros e tríceps.',
            musculos: ['peito', 'ombro', 'triceps', 'abdome'],
            dicas: ['Mãos um pouco mais abertas que os ombros', 'Corpo reto, da cabeça aos calcanhares', 'Desça até o peito quase encostar no chão'],
            video: 'https://www.youtube.com/watch?v=RRi0-tvte6A'
        },
        {
            nome: 'Barra fixa',
            tipo: 'reps',
            descricao: 'Costas e bíceps.',
            musculos: ['dorsais', 'biceps', 'antebraco', 'trapezio'],
            dicas: ['Pegada um pouco mais aberta que os ombros', 'Puxe até o queixo passar da barra, sem balançar', 'Desça devagar até estender os braços'],
            video: 'https://www.youtube.com/watch?v=oH-NrOccUOg'
        },
        {
            nome: 'Agachamento sem peso',
            tipo: 'reps',
            descricao: 'Coxas e glúteos.',
            musculos: ['quadriceps', 'gluteos'],
            dicas: ['Pés na largura dos ombros, com os joelhos alinhados aos pés', 'Desça com a coluna reta, como se fosse sentar', 'Suba empurrando o chão com todo o pé'],
            video: 'https://www.youtube.com/watch?v=CaTbpJH49i4'
        },
        {
            nome: 'Prancha',
            tipo: 'tempo',
            descricao: 'Abdome e core.',
            musculos: ['abdome', 'ombro', 'lombar'],
            dicas: ['Cotovelos abaixo dos ombros', 'Corpo reto, sem deixar o quadril cair ou subir', 'Contraia o abdome e respire normalmente'],
            video: 'https://www.youtube.com/watch?v=9dn5Fb3cSoE'
        },
        {
            nome: 'Burpee',
            tipo: 'reps',
            descricao: 'Corpo todo.',
            musculos: ['peito', 'ombro', 'triceps', 'abdome', 'quadriceps', 'gluteos'],
            dicas: ['Faça o movimento em etapas: agachar, apoiar as mãos, esticar as pernas e voltar', 'Mantenha o abdome firme durante o movimento', 'Se precisar, faça sem o pulo no final'],
            video: 'https://www.youtube.com/watch?v=CrGAnJEfcmY'
        }
    ]
};