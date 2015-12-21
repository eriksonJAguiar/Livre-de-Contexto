var SimplificacaoProducaoVazia = function () {

    var passo1ProducaoVazia = function () {

        var producoes = lerAquivo();

        var conjuntoVazio = [];

        var vazioDiretamente = false;
        var vazioIndiretamente = false;

        do {
            var tamanhoDoVazio = conjuntoVazio.length;

            if (vazioDiretamente !== true) {
                for (var i = 0; i < producoes.length; i++) { // produções que vão para o vazio diretamente 
                    var p = producoes[i];
                    var pos = -1;
                    pos = p.search("&");
                    if (pos !== -1) {
                        conjuntoVazio.push(p.substr(0, 1));
                    }

                }
                vazioDiretamente = true;
            }
            if (vazioIndiretamente !== true) {
                for (var j = 0; j < producoes.length; j++) { // produções que vão para o vazio indiretamente 


                    p = producoes[j];

                    tamanhoDoVazio = conjuntoVazio.length;

                    var contVazio = conjuntoVazio.length;

                    var cont = 0;

                    var achou = false;
                    var cont2 = 0;

                    while (cont2 < conjuntoVazio.length && achou !== true) {
                        if (p.substr(0, 1) === conjuntoVazio[cont2]) {
                            cont++;
                            achou = true;
                        }
                        cont2++;
                    }
                    if (achou !== true) {
                        var pos2 = -1;
                        pos2 = p.search(conjuntoVazio[cont]);

                        if (pos2 !== -1) {
                            conjuntoVazio.push(p.substr(0, 1));
                        }
                        cont++;
                    }
                }
                vazioIndiretamente = true;
            }
        } while (conjuntoVazio.length !== tamanhoDoVazio);

        return conjuntoVazio;
    };

    this.passo2ProducaoVazia = function () {

        var conjuntoVazio = passo1ProducaoVazia();

        var producoes = lerAquivo();

        //eliminar o & da produção
        for (var i = 0; i < producoes.length; i++) {
            var p = producoes[i];
            var pos = -1;
            pos = p.search("&");
            if (pos !== -1) {
                var contador = 0;
                var aux;
                while (contador < p.length) {
                    if (contador === 0) {
                        aux = p.charAt(contador);
                        contador++;
                    }
                    else if (contador === 2) {
                        contador += 2;
                    }
                    else if (contador === pos - 1) {
                        contador += 2;
                    }
                    aux = aux + p.charAt(contador);
                    contador++;
                }
                producoes[i] = aux;
            }
        }

        var novasProducoes = [];
        for (var index = 0; index < producoes.length; index++) {

            var auxiliar = producoes[index].split(":"); //1º separar as poduções em um vetor
            var producoesAux = auxiliar[1];
            var vetorProducoes = producoesAux.split("|");

            var novasProducoesAux = []; // 2º campara o conjunto vazio com as produções para assim formar novas produções
            for (var i = 0; i < vetorProducoes.length; i++) {
                var cont = 0;
                var caracterAux;
                var entrouAux = false;
                while (cont < vetorProducoes[i].length) {
                    var caracter = vetorProducoes[i].charAt(cont);
                    var pertenceAoVazio = false;
                    var cont2 = 0;
                    while (cont2 < conjuntoVazio.length) {
                        if (caracter === conjuntoVazio[cont2])
                            pertenceAoVazio = true;
                        cont2++;
                    }
                    if (pertenceAoVazio === false) {
                        if (cont > 0 && entrouAux === true) {
                            caracterAux = caracterAux + caracter;
                        }
                        else {
                            caracterAux = caracter;
                            entrouAux = true;
                        }
                    }
                    cont++;
                }
                for (var k = -1; k < novasProducoesAux.length; k++) {
                    if (k === -1) {
                        k++;
                    }
                    var p2 = novasProducoesAux[k];
                    var achou = -1;
                    if (novasProducoesAux.length === 0) {
                    }
                    else {
                        achou = p2.search(caracterAux);
                    }
                    if (caracterAux !== undefined && achou === -1) {
                        novasProducoesAux.push(caracterAux);
                        k++;
                    }
                    else {
                    }
                }
            }

            //3º verifica se alguma das novas produções já existe e elimina se existir 
            for (var i = 0; i < novasProducoesAux.length; i++) {
                for (var j = 0; j < producoes.length; j++) {
                    if (producoes[j] === novasProducoesAux[i]) {
                        novasProducoesAux[i] = null;
                    }
                }
            }

            //4º concatena as novas produções com as antigas
            var pAux = "";
            for (var x = 0; x < novasProducoesAux.length; x++) {
                pAux = pAux + "|" + novasProducoesAux[x];
            }
            novasProducoes[index] = producoes[index] + pAux;
        }


        return novasProducoes;
    };
// faz simplificacao producoa vazia

};



