var SimplicacaoSubstituicaoVariaveis = function (gramatica) {

    var passo1SubstituicaoDeVariavel = function () {

        var possivel = verificaSeProducaoVaziaSeraNecessaria(gramatica);

        if (possivel === false)
            return null;

        var producoes = gramatica;


        var cf = new Array();

        for (var i = 0; i < producoes.length; i++) {
            var fecho = new Fecho();

            var producaoSemNaoTerminal = producoes[i].split(":");
            var vetorProducoes = producaoSemNaoTerminal[1].split("|");

            fecho.setVariaveis(producaoSemNaoTerminal[0]);

            for (var j = 0; j < vetorProducoes.length; j++) {
                if ((vetorProducoes[j].charCodeAt(0) >= 65 && vetorProducoes[j].charCodeAt(0) <= 90) && (vetorProducoes[j].length === 1)) {
                    fecho.setProducoes(vetorProducoes[j]);
                }
            }

            cf.push(fecho);


        }

        return cf;
    };

    this.passo2SubstituicaoDeVariavel = function () {

        var producoes = gramatica;

        if (passo1SubstituicaoDeVariavel() === null)
            return null;

        var conjuntof = passo1SubstituicaoDeVariavel();

        //var conjuntoDeFechos = passo1SubstituicaoDeVariavel();

        var novaProducao = [];
        var cont = 0;
        //1º eliminar produções do tipo A-> B
        while (cont < producoes.length) {

            var novaProducaoAux;
            var novaProducaoAux2;

            var novaProducaoLinha;

            novaProducaoAux = producoes[cont].split(":");
            novaProducaoAux2 = novaProducaoAux[1].split("|");
            novaProducaoLinha = novaProducaoAux[0] + ":";

            for (var i = 0; i < novaProducaoAux2.length; i++) {
                if (!((novaProducaoAux2[i].charCodeAt(0) >= 65 && novaProducaoAux2[i].charCodeAt(0) <= 90)
                        && (novaProducaoAux2[i].length === 1))) {
                    if (novaProducaoLinha.charAt(2) === "" || i === novaProducaoAux2.length) {
                        novaProducaoLinha = novaProducaoLinha + novaProducaoAux2[i];
                    }
                    else {
                        novaProducaoLinha = novaProducaoLinha + "|" + novaProducaoAux2[i];
                    }
                }
            }
            novaProducao.push(novaProducaoLinha);
            cont++;
        }

        var contador = 0;
        while (contador < novaProducao.length) {

            var pNovaAux = novaProducao[contador].split(":");

            var simboloFecho = new Fecho();
            var cont = 0;
            var producaoParaConcatenar;
            do {
                simboloFecho = conjuntof[cont];
                cont++;
            } while (simboloFecho.getVariaveis() !== pNovaAux[0] && cont < conjuntof.length);

            if (simboloFecho.getVariaveis() === pNovaAux[0]) {
                for (var i = 0; i < novaProducao.length; i++) {
                    for (var j = 0; j < simboloFecho.getProducoes().length; j++) {
                        var aux = simboloFecho.getProducoes();
                        if (novaProducao[i].charAt(0) === aux[j]) {
                            var producaoDescomposta = novaProducao[i].split(":");
                            novaProducao[contador] = novaProducao[contador] + "|" + producaoDescomposta[1];
                        }
                    }
                }
            }

            contador++;
        }


        return novaProducao;

    };
    var verificaSeProducaoVaziaSeraNecessaria = function (grammar) {

        var gram = grammar;

        for (var i = 0; i < gram.length; i++) {
            var producoes = gram[i].split(":");
            var vetorProducoes = producoes[1].split("|");
            for (var j = 0; j < vetorProducoes.length; j++) {
                if ((vetorProducoes[j].charCodeAt(0) >= 65 && vetorProducoes[j].charCodeAt(0) <= 90) && (vetorProducoes[j].length === 1)) {
                    return true;
                }
            }
        }

        return false;

    };

};







