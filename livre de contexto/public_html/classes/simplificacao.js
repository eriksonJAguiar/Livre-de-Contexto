this.producaoVazia = function () {
   
    var pVazio = new SimplificacaoProducaoVazia();
    var novaProducaocomN = [];
   
       for(var contn=0;contn < pVazio.passo2ProducaoVazia().length;contn++){
        novaProducaocomN.push(pVazio.passo2ProducaoVazia()[contn] + "\n");
    }
 
    
    document.getElementById("producaoVazia").innerHTML = novaProducaocomN;

    
    return pVazio.passo2ProducaoVazia();    
    
};
 this.substituicaoDeVariavel = function (gramatica) {
     
    var SubVar = new SimplicacaoSubstituicaoVariaveis(gramatica);
    
    var simplificada = SubVar.passo2SubstituicaoDeVariavel();
    
    if(simplificada === null){
        simplificada = producaoVazia();
        
    }
     var novaProducaocomN = [];
        
        for(var contn=0;contn < SubVar.passo2SubstituicaoDeVariavel().length;contn++){
        novaProducaocomN.push(SubVar.passo2SubstituicaoDeVariavel()[contn] + "\n");
        }

    
        document.getElementById("substituicaoDeVariaveis").innerHTML = novaProducaocomN;
     
     return simplificada;
};
this.simbolosInuteis =  function  (gramatica) {
     
    var SimIn = new SimplificacaoSimbolosInuteis(gramatica);
    
     var vetorProducoesFinaiscomN = [];
    for(var contn=0;contn < SimIn.passo2SimbolosInuteis().length;contn++){
        vetorProducoesFinaiscomN.push(SimIn.passo2SimbolosInuteis()[contn] + "\n");
    }
     document.getElementById("simbolosInuteis").innerHTML = vetorProducoesFinaiscomN;
     
     return SimIn.passo2SimbolosInuteis();
}; 

this.producaoVazia2 = function () {
   
    var pVazio = new SimplificacaoProducaoVazia();

      return pVazio.passo2ProducaoVazia();    
    
};

 this.substituicaoDeVariavel2 = function (gramatica) {
     
    var SubVar = new SimplicacaoSubstituicaoVariaveis(gramatica);
    var simplificada = SubVar.passo2SubstituicaoDeVariavel();
    
    if(simplificada === null)
        simplificada = producaoVazia();

     
     return simplificada;
};
this.simbolosInuteis2 =  function  (gramatica) {
     
    var SimIn = new SimplificacaoSimbolosInuteis(gramatica);
         
     return SimIn.passo2SimbolosInuteis();
}; 