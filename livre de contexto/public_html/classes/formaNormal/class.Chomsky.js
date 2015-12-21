var Chomsky = function () {
    var passo1Chomsky = function () {
        var vazio = producaoVazia2();
        var substituicaoVariaveis = substituicaoDeVariavel2(vazio);
        var simbolosdeInuteis = simbolosInuteis2(substituicaoVariaveis);

        return simbolosdeInuteis;
    };
    var passo2Chomsky = function () {

        var gramatica = passo1Chomsky();

        // var gramatica = lerAquivo();

        var novaGramaticaLinha;
        var novaGramatica;

        var aux = pesquisaLetra(gramatica);

        var novasPoducoes = new Array();

        for (var i = 0; i < gramatica.length; i++) {

            var gramaticaAux1 = gramatica[i].split(":");
            var gramaticaAux2 = gramaticaAux1[1].split("|");

            var cont = 0;

            while (cont < gramaticaAux2.length) {
                if (gramaticaAux2[cont].length >= 2) {
                    var gram = gramaticaAux2[cont];
                    var j = 0;
                    while (j < gram.length) {
                        if (gram.charCodeAt(j) >= 97 && gram.charCodeAt(j) <= 122) {

                            var aux2 = aux + "_" + gram.charAt(j);

                            if (valoreDuplicadosArrayNovasProd(novasPoducoes, aux2 + ":" + gram.charAt(j)) === true)
                                novasPoducoes.push(aux2.concat(":", gram.charAt(j)));

                            gramaticaAux2[cont] = gramaticaAux2[cont].replace(gram.charAt(j), aux2);
                        }
                        j++;
                    }

                }
                cont++;
            }
            novaGramaticaLinha = gramaticaAux1[0] + ":" + gramaticaAux2[0];
            for (var k = 1; k < gramaticaAux2.length; k++) {
                novaGramaticaLinha = novaGramaticaLinha + "|" + gramaticaAux2[k];
            }
            if (i > 0)
                novaGramatica = novaGramatica + "\n" + novaGramaticaLinha;
            else
                novaGramatica = novaGramaticaLinha;
        }

        novaGramatica = novaGramatica + "\n" + novasPoducoes[0];
        for (var cont = 1; cont < novasPoducoes.length; cont++) {
            novaGramatica = novaGramatica + "\n"
                    + novasPoducoes[cont];
        }

        return novaGramatica;
    };
    this.passo3Chomsky = function () {
        var gramatica = passo2Chomsky();

        var novaGramaticaLinha;
        var novaGramatica;

        var aux = pesquisaLetra(gramatica);

        var novasPoducoes = new Array();

        var gramaticaAux1 = gramatica.split("\n");

        var k = 1;

        for (var i = 0; i < gramaticaAux1.length; i++) {

            var gramaticaAux2 = gramaticaAux1[i].split(":");
            var gramaticaAux3 = gramaticaAux2[1].split("|");


            novaGramaticaLinha = gramaticaAux2[0] + ":";

            var cont = 0;


            while (cont < gramaticaAux3.length) {
                var tam = gramaticaAux3[cont].length;
                if (TemproducoesDotipoN_apha(gramaticaAux3[cont]) === true)
                    tam = tam - (2 * numeroProducoesDotipoN_apha(gramaticaAux3[cont]));
                var gram = gramaticaAux3[cont];
                if (tam >= 3) {
                    var j = tam;
                    var gramAux;
                    var gramAux2;

                    if (TemproducoesDotipoN_aphaInicio(gram) === true)
                        gramAux2 = gram.slice(3);
                    else
                        gramAux2 = gram.slice(1);

                    var aux2 = aux + "_" + k;


                    gram = gram.replace(gramAux2, aux2);

                    j--;
                    k++;



                    while (j > 2) {

                        aux2 = aux + "_" + k;

                        if (TemproducoesDotipoN_aphaInicio(gramAux2) === true)
                            gramAux = gramAux2.slice(3);
                        else
                            gramAux = gramAux2.slice(1);


                        aux2 = aux + "_" + k;

                        var novaP = gramAux2.replace(gramAux, aux2);

                        if (valoreDuplicadosArrayNovasProd(novasPoducoes, aux2 + ":" + novaP) === true) {
                            novasPoducoes.push(aux.concat("_", k - 1, (":").concat(novaP)));
                            k++;
                            gramAux2 = gramAux;
                        }

                        j--;

                    }
                    if (j === 2) {
                        if ((valoreDuplicadosArrayNovasProd(novasPoducoes, (aux.concat("_", k - 1, ":") + gramAux2))) === true) {
                            novasPoducoes.push(aux.concat("_", k - 1, ":") + gramAux2);

                        }


                    }
                }
                if (cont > 0)
                    novaGramaticaLinha = novaGramaticaLinha + "|" + gram;
                else
                    novaGramaticaLinha = novaGramaticaLinha + gram;

                cont++;
            }
            if (i > 0)
                novaGramatica = novaGramatica + novaGramaticaLinha + "\n";
            else
                novaGramatica = novaGramaticaLinha + "\n";
        }
        for (var j = 0; j < novasPoducoes.length; j++) {
            novaGramatica = novaGramatica + novasPoducoes[j] + "\n";
        }


        document.getElementById("Chowsky").innerHTML = novaGramatica;

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
    function valoreDuplicadosArrayNovasProd(novasPoducoes, novoValor) {
        if (novasPoducoes.length === 0)
            return true;
        for (var i = 0; i < novasPoducoes.length; i++) {
            if (novasPoducoes[i] === novoValor)
                return false;
        }

        return true;

    }
    ;
    function TemproducoesDotipoN_apha(producao) {
        for (var cont = 0; cont < producao.length; cont++) {
            if (producao[cont] === "_")
                return true;
        }

        return false;
    }
    function TemproducoesDotipoN_aphaInicio(producao) {
        for (var cont = 0; cont < 2; cont++) {
            if (producao[cont] === "_")
                return true;
        }

        return false;
    }
    function numeroProducoesDotipoN_apha(producao) {
        var num = 0;
        for (var cont = 0; cont < producao.length; cont++) {
            if (producao[cont] === "_")
                num++;
        }

        return num;
    }

};


