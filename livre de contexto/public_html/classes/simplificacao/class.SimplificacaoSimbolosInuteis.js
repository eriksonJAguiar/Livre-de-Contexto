﻿var SimplificacaoSimbolosInuteis = function (gramatica) {

    var passo1SimbolosInuteis = function () {//separa as producoes com terminais


        var producoes = gramatica;
        var conjuntoDeProducoesInuteis = [];
        var conjuntoDeProducoesInuteisMesmo = [];
        var producoesUteis = [];
        var producoesUteisAposVerificacao = [];

        var terminalDiretamente = false;
        var terminalIndiretamente = false;
        var vetorProducoes = [];
        var terminaisUteis = [];

        for (var n = 0; n < producoes.length; n++) {
            if ((producoes[n].charCodeAt(0) >= 65 && producoes[n].charCodeAt(0) <= 90)) {
                conjuntoDeProducoesInuteisMesmo.push(producoes[n].substr(0, 1));
            }
        }
        do {
            var tamanhoDosSimbolos = conjuntoDeProducoesInuteis.length;
            if (terminalDiretamente !== true) {
                for (var i = 0; i < producoes.length; i++) { // produções que tem Terminais Diretamente
                    var p = producoes[i];
                    var pos = -1;
                    var aux = [];
                    var auxiliar = producoes[i].split(":"); //separar as poduções em um vetor
                    var producoesAux = auxiliar[1];
                    var vetorProducoes = producoesAux.split("|");

                    for (var j = 0; j < vetorProducoes.length; j++) {
                        if ((vetorProducoes[j].charCodeAt(0) >= 97 && vetorProducoes[j].charCodeAt(0) <= 122) && (vetorProducoes[j].length === 1)) {
                            aux.push(vetorProducoes[j]);
                            terminaisUteis.push(vetorProducoes[j]);
                            terminalDiretamente = true;
                        }
                    }

                    for (var k = 0; k < aux.length; k++) {
                        p.search(aux[k]);
                        if (pos === -1) {
                            conjuntoDeProducoesInuteis.push(p.substr(0, 1));
                            producoesUteis.push(p);
                        }
                    }
                }
            }

            if (terminalIndiretamente !== true) {
                for (var j = 0; j < 4; j++) { // produções que vão para variavel com terminal indiretamente 
                    for (var t = 0; t < producoes.length; t++) {

                        p = producoes[t];

                        tamanhoDosSimbolos = conjuntoDeProducoesInuteis.length;

                        var contVazio = conjuntoDeProducoesInuteis.length;

                        var cont = 0;

                        var achou = false;
                        var cont2 = 0;

                        while (cont2 < conjuntoDeProducoesInuteis.length && achou !== true) {
                            if (p.substr(0, 1) === conjuntoDeProducoesInuteis[cont2]) {
                                cont++;
                                achou = true;
                            }
                            cont2++;
                        }
                        if (achou !== true) {
                            for (cont = 0; cont < conjuntoDeProducoesInuteis.length; cont++) {
                                var pos2 = -1;
                                var aux2 = false;
                                pos2 = p.search(conjuntoDeProducoesInuteis[cont]);
                                if (pos === 0) {
                                    aux2 = true;
                                }
                                if (pos2 !== -1 && aux2 === false) {
                                    conjuntoDeProducoesInuteis.push(p.substr(0, 1));
                                    producoesUteis.push(p);
                                    cont = conjuntoDeProducoesInuteis.length;
                                    cont++;
                                    terminalIndiretamente = true;
                                }
                            }
                        }
                    }
                }
            }
        } while (conjuntoDeProducoesInuteis.length !== tamanhoDosSimbolos);

        for (var index = 0; index < producoesUteis.length; index++) { //exclui as produçoes inuteis
            var p = producoesUteis[index];
            var auxiliar1 = producoesUteis[index].split(":");
            var producoesAux1 = auxiliar1[1];
            var vetorProducoes1 = producoesAux1.split("|");
            producoesUteisAposVerificacao.push(auxiliar1[0] + ":");
            for (var i = 0; i < vetorProducoes1.length; i++) {
                var p1 = vetorProducoes1[i];
                var pipe = false;
                var pos = -1;
                var pos2 = -1;
                var pas3 = -1;
                var aux = [];
                for (var k = 0; k < conjuntoDeProducoesInuteis.length; k++) {
                    pipe = false;
                    pos = p1.search(conjuntoDeProducoesInuteis[k]);
                    for (var q = 0; q < conjuntoDeProducoesInuteisMesmo.length; q++) {
                        if (pipe === false) {
                            pas3 = p1.search(conjuntoDeProducoesInuteisMesmo[q]);
                            if (pos !== -1 && pas3 !== -1) {
                                var c = p1;
                                producoesUteisAposVerificacao[index] = producoesUteisAposVerificacao[index] + c;
                                pipe = true;
                                q = conjuntoDeProducoesInuteisMesmo.length;
                                k = conjuntoDeProducoesInuteis.length;
                            }
                            else if (pos === -1 && pas3 !== -1) {
                            }
                            if ((pipe === true) && (vetorProducoes1[i + 1] === null)) {
                            }
                            else if ((pipe === true) && vetorProducoes1[i + 1] != null) {
                                producoesUteisAposVerificacao[index] = producoesUteisAposVerificacao[index] + "|";
                                q = conjuntoDeProducoesInuteisMesmo.length;
                                k = conjuntoDeProducoesInuteis.length;
                            }
                        }
                        else {
                        }
                        ;
                    }
                }
                for (var m = 0; m < terminaisUteis.length; m++) {
                    pipe = false;
                    if (p1.length === 1) {
                        pos2 = p1.search(terminaisUteis[m]);
                    }
                    if (pos2 !== -1) {
                        var d = p1;
                        producoesUteisAposVerificacao[index] = producoesUteisAposVerificacao[index] + d;
                        pipe = true;
                    }
                    if ((pipe === true) && (vetorProducoes1[i + 1] === null)) {
                    }
                    else if ((pipe === true) && vetorProducoes1[i + 1] != null) {
                        producoesUteisAposVerificacao[index] = producoesUteisAposVerificacao[index] + "|";
                    }
                }
            }
            //exclui producoes q nao seram usadas
        }
        if (terminalDiretamente === true && terminalIndiretamente === true) {
            return producoesUteisAposVerificacao;
        }
        else {
            return producoes;
        }
        ;
    };//comcluido


    this.passo2SimbolosInuteis = function () {

        var conjuntoSimbolos = passo1SimbolosInuteis();

        var producoes = gramatica;
        var vetordebuscaS = [];
        var vetordeBuscaVariaviesS = [];
        var vetorVariaviesdeS = [];
        var vetordeBuscaVariaveisAlemDeS = [];
        var vetorVariaveisAlemdeS = [];
        var vetorBuscadeVariaveisAlemAlemdeS = []
        var vetorProducoesAlemAlemdeS = [];
        var vetorProducoesFinais = [];
        var vetorVariaveisIniciais = [];
        var vetorTerminaisIniciais = [];
        var producaoFinal = [];
        var auxinici = [];
        var vetorVariaveisdoFim = [];
        for (var n = 0; n < conjuntoSimbolos.length; n++) {
            if ((conjuntoSimbolos[n].charCodeAt(0) >= 65 && conjuntoSimbolos[n].charCodeAt(0) <= 90)) {
                vetorVariaveisIniciais.push(conjuntoSimbolos[n].substr(0, 1));
            }
        }

        for (var i = 0; i < conjuntoSimbolos.length; i++) { // produções que tem Terminais Diretamente
            var p = conjuntoSimbolos[i];
            var aux = [];
            var auxiliar = conjuntoSimbolos[i].split(":"); //separar as poduções em um vetor
            var producoesAux = auxiliar[1];
            var vetorProducoes = producoesAux.split("|");

            for (var j = 0; j < vetorProducoes.length; j++) {
                if ((vetorProducoes[j].charCodeAt(0) >= 97 && vetorProducoes[j].charCodeAt(0) <= 122) && (vetorProducoes[j].length === 1)) {
                    vetorTerminaisIniciais.push(vetorProducoes[j]);
                }
            }
        }
        if ((producoes[0].charCodeAt(0) >= 65 && producoes[0].charCodeAt(0) <= 90)) {
            auxinici.push(producoes[0].substr(0, 1));
        }
        for (var i = 0; i < conjuntoSimbolos.length; i++) { // pegar derivaçoes do inicial
            var p2 = conjuntoSimbolos[i];
            var pos = -1;
            var aux = [];
            pos = p2.search(auxinici);
            if (pos === 0) {
                vetordebuscaS.push(p2);
            }
        }


        //achar forma de retirar as variaveis de S
        for (var index = 0; index < vetordebuscaS.length; index++) {
            var auxiliar2 = vetordebuscaS[index].split(":"); //separar as produções de S em um vetor
            var producoesAux2 = auxiliar2[1];
            var vetorProducoes2 = producoesAux2.split("|");

            for (var i = 0; i < vetordebuscaS.length; i++) {
                for (var j = 0; j < vetorProducoes2.length; j++) {//retira as variaveis de S
                    for (var k = 0; k < vetorProducoes2.length; k++) {
                        var fast = "";
                        var n = 0;
                        if ((vetorProducoes2[j].charCodeAt(k) >= 65 && vetorProducoes2[j].charCodeAt(k) <= 90)) {
                            var acho = false;
                            n = vetorProducoes2[j].charCodeAt(k);
                            fast = String.fromCharCode(n);
                            for (var corre = 0; corre < vetorVariaviesdeS.length; corre++) {
                                if (fast === vetorVariaviesdeS[corre]) {
                                    acho = true;
                                }
                            }
                            if (acho === false) {
                                vetorVariaviesdeS.push(fast);
                                vetorVariaveisdoFim.push(fast);
                            }
                            else if (acho === true) {
                            }
                        }
                    }
                }
            }
        }

        for (var i = 0; i < conjuntoSimbolos.length; i++) { // pegar derivaçoes alem de S
            var p = conjuntoSimbolos[i];
            var pos = -1;
            var aux = [];
            for (var j = 0; j < vetorVariaviesdeS.length; j++) {
                pos = p.search(vetorVariaviesdeS[j]);
                if (pos === 0) {
                    vetordeBuscaVariaviesS.push(p);
                }
            }
        }

        for (var l = 0; l < vetordeBuscaVariaviesS.length; l++) {
            var auxiliar3 = vetordeBuscaVariaviesS[l].split(":"); //separar as produções descendentes de S em um vetor
            var producoesAux3 = auxiliar3[1];
            var vetorProducoes3 = producoesAux3.split("|");


            for (var j = 0; j < vetorProducoes3.length; j++) {//retira as variaveis descendetes de S
                for (var k = 0; k < vetorProducoes3[j].length; k++) {
                    var fast = "";
                    var n = 0;
                    if ((vetorProducoes3[j].charCodeAt(k) >= 65 && vetorProducoes3[j].charCodeAt(k) <= 90)) {
                        var acho2 = false;
                        var acho3 = false;
                        n = vetorProducoes3[j].charCodeAt(k);
                        fast = String.fromCharCode(n);
                        for (var corre2 = 0; corre2 < vetorVariaviesdeS.length; corre2++) {
                            if (fast === vetorVariaviesdeS[corre2]) {
                                acho2 = true;
                            }
                        }
                        if (acho2 === false) {
                            vetordeBuscaVariaveisAlemDeS.push(fast);
                            for (var corre3 = 0; corre3 < vetorVariaveisdoFim.length; corre3++) {
                                if (fast === vetorVariaveisdoFim[corre3]) {
                                    acho3 = true;
                                }
                            }
                            if (acho3 === false) {
                                vetorVariaveisdoFim.push(fast);
                            }
                            else {
                            }
                        }
                        else if (acho2 === true) {
                        }
                    }
                }
            }
        }

        for (var i = 0; i < conjuntoSimbolos.length; i++) { // pegar derivaçoes Alem Alem de S
            var p = conjuntoSimbolos[i];
            var pos = -1;
            var aux = [];
            for (var j = 0; j < vetordeBuscaVariaveisAlemDeS.length; j++) {
                pos = p.search(vetordeBuscaVariaveisAlemDeS[j]);
                if (pos === 0) {
                    vetorProducoesAlemAlemdeS.push(p);
                }
            }
        }


        for (var l = 0; l < vetorProducoesAlemAlemdeS.length; l++) {
            var auxiliar4 = vetorProducoesAlemAlemdeS[l].split(":"); //separar as produções descendentes de S em um vetor
            var producoesAux4 = auxiliar4[1];
            var vetorProducoes4 = producoesAux4.split("|");


            for (var j = 0; j < vetorProducoes4.length; j++) {//retira as variaveis descendetes de S
                for (var k = 0; k < vetorProducoes4[j].length; k++) {
                    var fast = "";
                    var n = 0;
                    if ((vetorProducoes4[j].charCodeAt(k) >= 65 && vetorProducoes4[j].charCodeAt(k) <= 90)) {
                        var acho2 = false;
                        var acho3 = false;
                        n = vetorProducoes4[j].charCodeAt(k);
                        fast = String.fromCharCode(n);
                        for (var corre2 = 0; corre2 < vetordeBuscaVariaveisAlemDeS.length; corre2++) {
                            if (fast === vetordeBuscaVariaveisAlemDeS[corre2]) {
                                acho2 = true;
                            }
                        }
                        if (acho2 === false) {
                            vetorBuscadeVariaveisAlemAlemdeS.push(fast);
                            for (var corre3 = 0; corre3 < vetorVariaveisdoFim.length; corre3++) {
                                if (fast === vetorVariaveisdoFim[corre3]) {
                                    acho3 = true;
                                }
                            }
                            if (acho3 === false) {
                                vetorVariaveisdoFim.push(fast);
                            }
                            else {
                            }
                        }
                        else if (acho2 === true) {
                        }
                    }
                }
            }
        }



        for (var w = 0; w < conjuntoSimbolos.length; w++) {//insere o inicial no começo do produçoes finais
            pos = -1;
            p2 = conjuntoSimbolos[w];
            pos = p2.search(auxinici);
            if (pos === 0) {
                vetorProducoesFinais.push(p2);
            }
        }

        for (var i = 0; i < conjuntoSimbolos.length; i++) { // pegar derivaçoes alem de S
            var p2 = conjuntoSimbolos[i];
            var pos = -1;
            var aux = [];


            for (var j = 0; j < vetorVariaveisdoFim.length; j++) {
                pos = -1;
                pos = p2.search(vetorVariaveisdoFim[j]);
                if (vetorVariaveisdoFim[j] != auxinici) {
                    if (pos === 0) {
                        vetorProducoesFinais.push(p2);
                    }
                }
                else if (vetorVariaveisdoFim[j] === auxinici) {
                    j++;
                }
            }
        }


        return vetorProducoesFinais;
    };
};

