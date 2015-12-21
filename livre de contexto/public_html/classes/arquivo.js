var lerAquivo = function (){ 
    
    var gramatica = document.getElementById('gramatica').value;
    
    var producoes=[];
   
   
    producoes = gramatica.split('\n');//vetor com cada linha da gramatica, ou seja cada produção

    return producoes;
};


