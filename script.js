fetch('palavras.json')
    .then(response => response.json())
    .then(data => {
        let palavras = data;
        let palavraAtual;
        let dificuldadeAtual;
        let erros = 0;

        let coracoes = [
            document.getElementById('coracao1'),
            document.getElementById('coracao2'),
            document.getElementById('coracao3'),
            document.getElementById('coracao4'),
            document.getElementById('coracao5')
        ];

        function atualizarCoracoes() {
            for (let i = 0; i < coracoes.length; i++) {
                if (i < erros) {
                    coracoes[i].src = "img/coracaovazio.png";
                } else {
                    coracoes[i].src = "img/coracao.png";
                }
            }
        }

        document.getElementById('play').addEventListener('click', function() {
            let botaoSelecionado = document.querySelector('input[name="dificuldade"]:checked');
            if (botaoSelecionado) {
                let dificuldade = botaoSelecionado.value;
                iniciarJogo(dificuldade, palavras);
                alert('Bom jogo!');
            } else {
                alert('Por favor, selecione uma dificuldade antes de começar o jogo.');
            }
        });

        document.getElementById('iconeDica').addEventListener('click', mostrarDica);

        document.getElementById('formPalavra').addEventListener('submit', function(event) {
            event.preventDefault();
            let palavraInserida = document.getElementById('palavra').value.toLowerCase();
            if (palavraInserida === palavraAtual.palavra.toLowerCase()) {
                alert("Parabéns, você acertou!");
                erros = 0;
                iniciarJogo(dificuldadeAtual, palavras);
            } else {
                erros++;
                if (erros >= 5) {
                    alert("GAME OVER, você errou. A palavra correta era: " + palavraAtual.palavra);
                    erros = 0;
                    iniciarJogo(dificuldadeAtual, palavras);
                } else {
                    alert("Desculpe, você errou.");
                }
                atualizarCoracoes(); // Atualiza os corações
            }
            document.getElementById('palavra').value = ''; // Limpa o campo de entrada
        });

        function iniciarJogo(dificuldade, palavras) {
            let palavrasDificuldade = palavras[dificuldade];
            palavraAtual = palavrasDificuldade[Math.floor(Math.random() * palavrasDificuldade.length)];
            dificuldadeAtual = dificuldade;
            document.getElementById('dica').style.display = 'none';
        }

        function getDica() {
            return palavraAtual.dica;
        }

        function mostrarDica() {
            let dica = getDica();
            if (dica) {
                document.getElementById('dica').style.display = 'inline';
                document.getElementById('dicaTexto').textContent = dica;
            } else {
                alert("Desculpe, não há dica disponível para esta palavra.");
            }
        }
    });