 var Fecho = function () {
    var variaveis;
    var producoes = [];

    this.setVariaveis = function (v) {
        variaveis = v;
    };
    this.getVariaveis = function () {
        return variaveis;
    };
    this.setProducoes = function (p) {
        producoes = p;
    };
    this.getProducoes = function () {
        return producoes;
    };
};

