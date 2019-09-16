var cellArray;
    var rows = 1000;
    var cellSize = 10;
    var columns = 100;
    var canvas;
    var context;
    var rule = [];
    var option = 'triangle';
    var stop = false;
    var selected = false;
    var saveSelectedRule = '0,1,1,1,0,1,1,0';
    var saveCustomRule = [1,1,1,1,1,1,1,1];
    rule.push(0)
    rule.push(1);
    rule.push(1);
    rule.push(1);
    rule.push(0);
    rule.push(1);
    rule.push(1);
    rule.push(0);      
    cellArray;
    time = 10

    
    //Slicer del tiempo
    var sliderTime = document.getElementById("timeRange");
    var timeSpan = document.getElementById("timeSpan");
    timeSpan.innerHTML = sliderTime.value;

    //Slicer del tamaño
    var sliderSize = document.getElementById("cellSize");
    var sizeSpan = document.getElementById("sizeSpan");
    sizeSpan.innerHTML = sliderSize.value;

    //Slicer de cantidad
    var sliderNumber = document.getElementById("cellNumber");
    var numberSpan = document.getElementById("numberSpan");
    numberSpan.innerHTML = sliderNumber.value;

    var triangleInput = document.getElementById('triangle-input');
    var randomInput = document.getElementById('random-input');
    var drawInput = document.getElementById('draw-input');
    var customInput = document.getElementById('custom-input');
    var radios = document.getElementsByClassName('radio-custom')
    for(var i=0; i<radios.length;i++){
      radios[i].disabled = !selected;
    }
    var goButton = document.getElementById('go-button');
    var stopButton = document.getElementById('stop-button');

    function stopRun(){
    	stop = true;
      goButton.innerHTML = 'Continuar'
      goButton.disabled = false;
      stopButton.disabled = true;
    }

    function changeRange(){
      rows = parseInt(sliderTime.value);
      timeSpan.innerHTML = rows;        
    }
    
    function changeSize(){
      cellSize = parseInt(sliderSize.value);
      sizeSpan.innerHTML = cellSize;
      var maximo = Math.floor(1000/cellSize);
      sliderNumber.max = maximo;
      columns = sliderNumber.value;
      numberSpan.innerHTML = sliderNumber.value
      drawBoard();
    }

    function changeNumber(){
      columns = parseInt(sliderNumber.value);
      numberSpan.innerHTML = columns;
      drawBoard();
    }

    function setOption(value){
      option = value;
    }

    function selectCustom(){
      selected = !selected;
      document.getElementById('custom-ctn').style.opacity = selected? 0.8 : 0.4;
      for(var i=0; i<radios.length;i++){
        radios[i].disabled = !selected;
      }
    }

    function customRule(value){
      if(saveCustomRule[value-1]==0){
        saveCustomRule[value-1] = 1
      }else{
        saveCustomRule[value-1] = 0
      }
      console.log(saveCustomRule)
    }
    function drawBoard(){

      cellArray = []
    //Se crea el arreglo de celulas
      for(var x=0; x<columns;x++){
        cellArray.push(0);
      }

      canvas = document.getElementById("canvas");
      context = canvas.getContext("2d");
      canvas.addEventListener('click', custom);
      context.canvas.height = cellSize + 1;
      context.canvas.width = columns*cellSize +1;
      context.fillStyle = "black";
      context.moveTo(0, 0.5);
      context.lineTo(cellSize*columns, 0.5);
      
      for(var y = 0 ; y<columns +1; y++){
        context.moveTo(0.5 + y*cellSize, 0);
        context.lineTo(0.5 + y*cellSize, cellSize);      
      }
      context.moveTo(0, 0.5 + cellSize);
      context.lineTo(cellSize*columns, 0.5 + cellSize);              
      context.strokeStyle = "gray";
      context.stroke();        
    }



    function paintCell(x ,y, color){
        if(color==0){
        context.fillStyle = "#eee";
      }else{
        context.fillStyle = "black";
      }
      context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);  
    }

    function setRule(transitionRule){
      var auxRule;
      var newImage = document.getElementById('imageRule');
      var newtext = document.getElementById('ruleName');

      newImage.src = 'images/rule'+ transitionRule +'.png';
      newtext.innerHTML = 'Regla ' + transitionRule;
      switch(transitionRule){
        case "30": auxRule = '0,1,1,1,1,0,0,0'; break;
        case "54": auxRule = '0,1,1,0,1,1,0,0'; break;
        case "60": auxRule = '0,0,1,1,1,1,0,0'; break;
        case "62": auxRule = '0,1,1,1,1,1,0,0'; break;
        case "90": auxRule = '0,1,0,1,1,0,1,0'; break;
        case "94": auxRule = '0,1,1,1,1,0,1,0'; break;
        case "110": auxRule = '0,1,1,1,0,1,1,0'; break;
        case "122": auxRule = '0,1,0,1,1,1,1,0'; break;
        case "126": auxRule = '0,1,1,1,1,1,1,0'; break;
        case "150": auxRule = '0,1,1,0,1,0,0,1'; break;
        case "158": auxRule = '0,1,1,1,1,0,0,1'; break;
        case "182": auxRule = '0,1,1,0,1,1,0,1'; break;
        case "188": auxRule = '0,0,1,1,1,1,0,1'; break;
        case "190": auxRule = '0,1,1,1,1,1,0,1'; break;
      }
      saveSelectedRule = auxRule;
      rule = [];
      var newRule = auxRule.split(",");
      for(var i=0;i<newRule.length;i++){
        rule.push(parseInt(newRule[i]));
      }    
      return false;
    }

    
    function clearBoard(){
      location.reload();
    }

  
    function cleanCellRow(){
      for(var i = 0; i<columns;i++){        
          cellArray[i]=0;
          paintCell(i, 0, 0);
        }
    }

    function triangle(){
      var medio = Math.floor(columns/2)
      cellArray[medio-1]=1;
      paintCell(medio-1, 0, 1);
    }

    function randomCell(){
      for(var i = 0; i<columns;i++){      
        var valor = Math.random()<0.5? 0 : 1;
        cellArray[i]=valor;
        paintCell(i, 0, valor);   
      }
    }

    function custom(e) {
      if(option=='custom'){
        paintCell(Math.floor(e.offsetX / cellSize), 0, 1);
        cellArray[Math.floor(e.offsetX / cellSize)] = 1;   
      }        
    }

    function automataRule(previous, current, next){
        if(cellArray[previous]==0 && cellArray[current]==0 && cellArray[next]==0){
          return rule[0];
        }else if(cellArray[previous]==0 && cellArray[current]==0 && cellArray[next]==1){
          return rule[1];
        }else if(cellArray[previous]==0 && cellArray[current]==1 && cellArray[next]==0){
          return rule[2];
        }else if(cellArray[previous]==0 && cellArray[current]==1 && cellArray[next]==1){
          return rule[3];
        }else if(cellArray[previous]==1 && cellArray[current]==0 && cellArray[next]==0){
          return rule[4];
        }else if(cellArray[previous]==1 && cellArray[current]==0 && cellArray[next]==1){
          return rule[5];
        }else if(cellArray[previous]==1 && cellArray[current]==1 && cellArray[next]==0){
          return rule[6];
        }else{
          return rule[7];
        }
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    function selectChange(){
      if(selected){
        for(var i=0;i<rule.length;i++){
        rule[i] = saveCustomRule[i];
        }        
      }else{
        var newRule = saveSelectedRule.split(",");
        for(var i=0;i<newRule.length;i++){
        rule[i] = parseInt(newRule[i]);
        } 
      }  
    }

    async function runAutomata(){
      goButton.disabled = true;
      stopButton.disabled = false;
      if(stop){
        stop=false;
      }else{
        if(option!='custom'){
        cleanCellRow();
        }
                
        if(option=='triangle'){
          triangle();
        }

        if(option=='random'){
          randomCell();
        }
      }

      sliderSize.disabled = true;
      sliderNumber.disabled = true;
      triangleInput.disabled = true;
      randomInput.disabled = true;
      drawInput.disabled = true;
      customInput.disabled = true;

      for(var i=0;i<rows;i++){
        if(stop){

        }else{
          selectChange()
          var rowCopy = []    
          var canvas = document.createElement('canvas');
          context = canvas.getContext("2d");
          context.canvas.height = cellSize;
          context.canvas.width = columns*cellSize +1;
          context.fillStyle = "black";
          console.log(columns)
          for(var j = 0 ; j<columns; j++){
            context.moveTo(0.5 + j*cellSize, 0);
            context.lineTo(0.5 + j*cellSize, cellSize);                          
          }
          
          context.moveTo(0, 0.5 + cellSize);
          context.lineTo(cellSize*columns, 0.5 + cellSize);                    
          context.strokeStyle = "gray";
          context.stroke(); 
          document.getElementById('more-canvas').appendChild(canvas) 

          var aux = automataRule(cellArray[cellArray.length-1], 0, 1)
          rowCopy.push(aux)
          paintCell(0, 0, aux)

          for(var j=1; j<columns-1;j++){
            aux = automataRule(j-1, j, j+1)
            rowCopy.push(aux)  
            paintCell(j, 0, aux)                
          }

          aux = automataRule(cellArray.length-2, cellArray.length-1, 0)
          rowCopy.push(aux)        
          paintCell(cellArray.length-1, 0, aux)

          cellArray = rowCopy
          rowCopy = [] 
          await sleep(time);
          window.scrollTo(0,document.body.scrollHeight);
        }
        
      }
      
    }
    drawBoard();
