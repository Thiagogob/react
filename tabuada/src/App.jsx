import React from 'react';

function App(){

  
  function multiplyBy(){

    var i = 1;
    var list = "";
    var table = +document.getElementById("firstNumber").value;
    var length = +document.getElementById("secondNumber").value;
    var result = document.getElementById("result");

    if(table == "0")
    {
      table = document.getElementById("firstNumber").defaultValue = 1;      
    }

    if(length == "0")
    {
      length = document.getElementById("secondNumber").defaultValue = 5;      
    }
    
    for(i=1; i <= length; i++)
    {
      list += ("<br>"+table+" x "+i+" = " +"<b>"+(table * i)+"</b>");  
    }



    list += "";
    result.innerHTML = list;
    
  }

  return (

    // In react always the return in this file should be enclose by one html tag.
    <div class="container">
      <br></br>
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Tabuada</h3>
          <h5 >Pegue a Tabuada que quiser</h5> 

          <form id = "final">
                <div class="form-group">
                    <label>Digite o número</label>
                    <input type="text" class="form-control" id="firstNumber" placeholder="Tabuada" 
                      onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}/>
                    <small class="form-text text-muted">Exemplo - Para ver a tabuada do 3, digite 3</small>
                </div>
                
                <div class="form-group">
                  <label for="exampleInputEmail1">Digite o intervalo</label>
                  <input type="text" class="form-control" id="secondNumber" placeholder="Intervalo" 
                    onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}/>
                    <small class="form-text text-muted">Exemplo - Para ver 10 resultados, digite 10</small>
                </div>
                
                <button type="button" class="btn btn-primary" onClick={multiplyBy} id = "submit">Enviar</button>
                <button class = "btn btn-primary" id = "clear">Apagar</button>
              
                <p id = "result">
                
                </p>
              
            </form>  

        </div>
      </div>
  </div>
  );
}

export default App;