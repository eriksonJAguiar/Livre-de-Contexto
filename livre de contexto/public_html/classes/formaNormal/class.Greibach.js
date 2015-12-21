var Greibach = function () {
    var passo1Greibach = function () {
        var vazio = producaoVazia2();
        var substituicaoVariaveis = substituicaoDeVariavel2(vazio);
        var simbolosdeInuteis = simbolosInuteis2(substituicaoVariaveis);

        return simbolosdeInuteis;
    };
    var passo1Greibach = function () {

        var gramatica = new Chomsky().passo3Chomsky();

        return gramatica;

    };

    var passo2Greibach = function () {

        var gramatica = passo1Greibach();

        var letra = pesquisaLetra(gramatica);

        var gramaticaAux = gramatica.split("\n");


        var cont = 1;
        for (var i = 0; i < gramaticaAux.length; i++) {
            var linhaGramatica = gramaticaAux[i];
            var novaProducao = letra + "_" + cont + ".";

            var antigaProducao;

            var tam = tamanhoDaStringN_alpha(linhaGramatica);

            if (temProducoesDoTipoN_alpha(linhaGramatica) === true)
                antigaProducao = linhaGramatica.slice(0, tam);
            else
                antigaProducao = linhaGramatica.charAt(0);

            linhaGramatica = linhaGramatica.replace(antigaProducao, novaProducao);
            cont++;

            gramaticaAux[i] = linhaGramatica;

            for (var j = 0; j < gramaticaAux.length; j++) {
                var linhaGramaticaAux = gramaticaAux[j];
                while (temProducoes(linhaGramaticaAux, antigaProducao) === true) {
                    linhaGramaticaAux = linhaGramaticaAux.replace(antigaProducao, novaProducao);
                }
                gramaticaAux[j] = linhaGramaticaAux;
            }

        }

        return gramaticaAux;

    };

    this.passo3Greibach = function () {

        var gramatica = passo2Greibach();

//        var gramatica = lerAquivo();

        var novaGramatica;

//        var gramaticaDividida = gramatica.split("\n");

        for (var i = 0; i < gramatica.length - 1; i++) {

            var producoes = gramatica[i].split(":");

            var producaoR = producoes[0];

            var producaoS = producoes[1].split("|");

            var producaoAux = gramatica[i];

            var numR = indentificaValorNumericoDaProducao(producaoR);

            var temNovas = false;

            var novasProducoes = new Array();

            for (var j = 0; j < producaoS.length; j++) {
                var numS = indentificaValorNumericoDaProducao(producaoS[j]);


                if (numR > numS && numS > 0) {
                    producaoAux = producoes[0] + ":";
                    var linha = procuraProducao(gramatica, producaoS[j]);
                    var alpha = contarProducoes(producaoS[j], null);
                    var beta = contarProducoes(null, producaoS[j]);

                    for (var l = 0; l < linha.length; l++) {
                        novasProducoes.push(linha[l] + alpha);
                    }
                    temNovas = true;
                }

            }

            if (temNovas === true) {
                for (var x = 0; x < novasProducoes.length; x++) {
                    if (x === 0)
                        producaoAux = producaoAux + novasProducoes[x];
                    else
                        producaoAux = producaoAux + "|" + novasProducoes[x];
                }
                for (var p = 0; p < producaoS.length; p++) {
                    beta = contarProducoes(null, producaoS[p]);
                    var pAux = producaoS[p];
                    var pAux2 = pAux.slice(0, 4);
                    if (pAux2 !== beta) {
                        producaoAux = producaoAux + "|" + pAux;
                    }
                }
            }

            var auxiliar = pesquisaLetra(gramatica);

            var novaProducao = passo4Greibach(producaoAux, auxiliar);

            if (novaProducao.length === 2) {
                if (i === 0) {
                    novaGramatica = novaProducao[0] + "\n";
                    novaGramatica = novaGramatica + novaProducao[1] + "\n";
                }
                else {
                    novaGramatica = novaGramatica + novaProducao[0] + "\n";
                    novaGramatica = novaGramatica + novaProducao[1] + "\n";
                }
            }
            else {
                if (i === 0)
                    novaGramatica = novaProducao + "\n";
                else
                    novaGramatica = novaGramatica + novaProducao + "\n";
            }
        }

        document.getElementById("RecursãoEsquerda").innerHTML = novaGramatica;

        return novaGramatica;

    };
    var passo4Greibach = function (linha, auxiliar) {

        var producao = linha.split(":");
        var producaoDividida = producao[1].split("|");

        var novaLinha;

        var novas = new Array();

        novaLinha = producao[0] + ":";

        var numR = indentificaValorNumericoDaProducao(producao[0]);

        for (var i = 0; i < producaoDividida.length; i++) {

            var prod;

            var numR2 = indentificaValorNumericoDaProducao(producaoDividida[i]);


            if (numR === numR2) {

                prod = producaoDividida[i];

                var aux = auxiliar;

                var linhaAux = aux + ":";

                var j = 0;
                var cont = 0;

                var iteracaoMaiorQue1 = false;

                while (j < producaoDividida.length) {

                    if (j !== i) {
                        if (j > 0 && iteracaoMaiorQue1 === true) {
                            novaLinha = novaLinha + "|" + producaoDividida[j];
                        }
                        else {
                            novaLinha = novaLinha + producaoDividida[j];
                        }
                        iteracaoMaiorQue1 = true;
                    }
                    j++;
                }
                j = 0;
                iteracaoMaiorQue1 = false;
                while (j < producaoDividida.length) {

                    if (j !== i) {
                        if (j > 0) {
                            novaLinha = novaLinha + "|" + producaoDividida[j] + aux;
                        }
                        else {
                            novaLinha = novaLinha + producaoDividida[j] + aux;
                        }
                        iteracaoMaiorQue1 = true;
                    }
                    j++;
                }

                if (temProducoesDoTipoN_alpha(producaoDividida[i]) === true)
                    prod = producaoDividida[i].slice(4);
                else
                    prod = producaoDividida[i].slice(1);

                linhaAux = linhaAux + prod;
                linhaAux = linhaAux + "|" + prod + aux;

                novas.push(novaLinha);
                novas.push(linhaAux);

                return novas;

            }
        }

        return linha;


    };
    this.passo5Greibach = function () {

      var gramatica = lerAquivo();

        var novaGramatica;

//        var gramatica = passo3Greibach();

        var variaveisInciais = new Array();
        var entrou1 = false;

        for (var i = 0; i < gramatica.length-1; i++) {
            var producao = gramatica[i];
            var pAux1 = producao.split(":");
            var pAux2 = pAux1[1].split("|");

            variaveisInciais.push(pAux1[0]);

            var novaProducao;

            var maiorProducao = maiorProducaoLinha(pAux2);
            var vetorProducoes = new Array();

            var entrou = false;

            for (var j = 0; j < gramatica.length; j++) {
                var prod = gramatica[j];
                var aux1 = prod.split(":");
                var aux2 = aux1[1].split("|");


                if (maiorProducao === aux1[0]) {
                    for (var y = 0; y < aux2.length; y++) {
                        if (aux2[y].charCodeAt(0) >= 91 && aux2[y].charCodeAt(0) <= 122) {
                            vetorProducoes.push(aux2[y] + maiorProducao);
                        }
                    }
                }
            }

            for (var j = 0; j < pAux2.length; j++) {

                var auxiliar;
                if (temProducoesDoTipoN_alpha(pAux2[j]) === true)
                    auxiliar = pAux2[j].substr(0, 4);
                else
                    auxiliar = pAux2[j];

                if (auxiliar !== maiorProducao)
                    vetorProducoes.push(pAux2[j]);
            }

            if (pAux1[0].charCodeAt(0) >= 65 && pAux1[0].charCodeAt(0) <= 90 && temProducoesDoTipoN_alpha(pAux1[0]) === false) {
                var tam = vetorProducoes.length;
                for (var v = 0; v < tam; v++) {
                    var recursao = vetorProducoes[v] + pAux1[0];

                    vetorProducoes.push(recursao);
                }

            }
            for (var cont = 0; cont < vetorProducoes.length; cont++) {
                if (entrou === true)
                    novaProducao = novaProducao + "|" + vetorProducoes[cont];
                else {
                    novaProducao = variaveisInciais[i] + ":" + vetorProducoes[cont];
                    entrou = true;
                }
            }

            if (entrou1 === true)
                novaGramatica = novaGramatica + novaProducao + "\n";
            else {
                novaGramatica = novaProducao + "\n";
                entrou1 = true;
            }
        }
        document.getElementById("Graybach").innerHTML = novaGramatica;

        return novaGramatica;
    };
    function pesquisaLetra(gramatica) {

        var achou = false;

        var aux = 0;
        while (achou !== true) {

            var num = (Math.random() * (90 - 65) + 65);
            var letra = String.fromCharCode(num);

            var producoes = new Array();
            for (var i = 0; i < gramatica.length; i++) {
                var variavel = gramatica[i].split(":");
                producoes.push(variavel[0]);
            }
            var aux = 0;
            achou = true;
            while (aux < producoes.length) {
                if (producoes[aux] === letra) {
                    achou = false;
                }
                aux++;
            }
        }
        return letra;

    }
    ;
    function temProducoes(linha, variavel) {
        var cont = 0;
        var temVariavel = false;
        while (cont < linha.length && temVariavel === false) {
            if (linha.charCodeAt(cont) >= 65 && linha.charCodeAt(cont) <= 90) {
                if (linha.charAt(cont + 1) === "_") {
                    if (linha.slice(cont, cont + 3) === variavel || linha.slice(cont, cont + 4) === variavel || linha.slice(cont, cont + 5) === variavel)
                        temVariavel = true;
                }
                else {
                    if (linha.charAt(cont) === variavel)
                        temVariavel = true;
                }

            }

            cont++;

        }

        return temVariavel;
    }
    function indentificaValorNumericoDaProducao(producao) {
        var num = 0;
        var i = 2;
        var achou = false;
        while (i < producao.length && achou !== true) {
            if (producao.charCodeAt(i) >= 40 && producao.charCodeAt(i) <= 57) {
                if (num > 0)
                    num = num + producao.charAt(i);
                else
                    num = producao.charAt(i);
            }
            else if (!(producao.charCodeAt(i) >= 40 && producao.charCodeAt(i) <= 57))
                achou = true;
            i++;
        }
        return parseInt(num);
    }
    function procuraProducao(gramatica, producao) {
        var p = producao.slice(0, 3);
        for (var cont = 0; cont < gramatica.length; cont++) {
            var linha = gramatica[cont];

            var pLinha = linha.slice(0, 3);

            if (pLinha === p) {
                var linhaAux = linha.split(":");
                var linhaAux2 = linhaAux[1].split("|");
                return linhaAux2;
            }
        }

        return null;
    }
    function contarProducoes(producaoAlfa, producaoBeta) {

        if (producaoAlfa !== null) {
            var cont = 1;
            while (cont < producaoAlfa.length) {
                if (!(producaoAlfa.charCodeAt(cont) >= 40 && producaoAlfa.charCodeAt(cont) <= 57))
                    return producaoAlfa.slice(cont + 3);

                cont++;
            }
        }
        else if (producaoBeta !== null) {
            var cont = 1;
            while (cont < producaoBeta.length) {
                if (!(producaoBeta.charCodeAt(cont) >= 40 && producaoBeta.charCodeAt(cont) <= 57))
                    return producaoBeta.slice(0, cont + 3);

                cont++;
            }
        }

        return null;

    }
    ;
    function temProducoesDoTipoN_alpha(linha) {
        if (linha[1] === "_")
            return true;

        return false;
    }
    ;
    function tamanhoDaStringN_alpha(linha) {
        var cont = 0;
        for (var i = 0; i < linha.length; i++) {
            if (linha[i] === ":") {
                return cont;
            }
            cont++;
        }
    }
    ;
    function maiorProducaoLinha(linha) {
        //maior producao
        var array = new Array();
        for (var x = 0; x < linha.length; x++) {

            var num = indentificaValorNumericoDaProducao(linha[x]);

            array.push(num);

        }

        array.sort(function sortfunction(a, b) {
            return (a - b);
        });

        var valProd = array[array.length - 1];

        for (var i = 0; i < linha.length; i++) {
            if (parseInt(linha[i].charAt(2)) === valProd)
                return linha[i].substr(0, 4);
        }

        return null;

    }
    ;

};


