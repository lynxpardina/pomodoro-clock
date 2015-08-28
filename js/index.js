$(document).ready(function() { 
  var myCanvas=$("#myCanvas")[0],
      ctx = myCanvas.getContext("2d"), 
      centerX = myCanvas.width / 2,
      centerY = myCanvas.height / 2, 
      counting=false, 
      colorS ="lime",
      color = colorS, 
      colorB = "OrangeRed";  // colors to use lime, OrangeRed

  if (sessionStorage.phase === undefined){
      sessionStorage.sessionSlice =25;
      sessionStorage.breakSlice =5;
      sessionStorage.phase = "Session";
      sessionStorage.seconds=60*sessionStorage.sessionSlice;
  }

  $("#sessionSlice").html(sessionStorage.sessionSlice);
  $("#breakSlice").html(sessionStorage.breakSlice);

  sessionStorage.phase ==="Session"? color=colorS: color=colorB;

  draw(color, sessionStorage.seconds, sessionStorage.phase, sessionStorage.breakSlice);
  

  function countDown(){
    sessionStorage.seconds-=1;

    if (sessionStorage.seconds < 0){
      playSound ("https://dl.dropboxusercontent.com/u/49268757/notify");    
      if (sessionStorage.phase === "Session"){
        sessionStorage.phase="Break";
        color=colorB;
        sessionStorage.seconds=60*sessionStorage.breakSlice;
      }else{
        sessionStorage.phase="Session";
        color=colorS;
        sessionStorage.seconds=60*sessionStorage.sessionSlice;
      }
    } else {
      var h = Math.floor(sessionStorage.seconds / 3600);
      var m = Math.floor(sessionStorage.seconds % 3600 / 60);
      var s = Math.floor(sessionStorage.seconds % 3600 % 60);
      //h > 0? h+":"+(m < 10? "0":""):"")+ m +":"+(s < 10? "0":"")+s; 
      var hora = "";
      h > 0? hora+=h +":"+(m<10?"0":""):"";
      m < 0? hora+="0" +m+":":hora+=m +":";
      s < 10? hora+="0" +s: hora+=s;
      
      var percentage= sessionStorage.phase === "Session"? sessionStorage.seconds/(60*sessionStorage.sessionSlice)*100:sessionStorage.seconds/(60*sessionStorage.breakSlice)*100;

      //console.log(color+" "+ percentage+" "+ sessionStorage.phase+" "+hora);

      draw(color, percentage, sessionStorage.phase, hora);
    
    }


  }


  $("#ssm").click(function(){ 
    if (!counting && sessionStorage.sessionSlice > 0){
      sessionStorage.sessionSlice-=1;
      $("#sessionSlice").html(sessionStorage.sessionSlice);
      if (sessionStorage.phase==="Session") {
        draw(colorS, 30, sessionStorage.phase, sessionStorage.sessionSlice);
        sessionStorage.seconds=60*sessionStorage.sessionSlice;
      };
    }
  });
  $("#ssp").click(function(){
    if (!counting){
      sessionStorage.sessionSlice=eval(sessionStorage.sessionSlice)+1;
      $("#sessionSlice").html(sessionStorage.sessionSlice);
      if (sessionStorage.phase==="Session") {
        draw(colorS, 30, sessionStorage.phase, sessionStorage.sessionSlice);
        sessionStorage.seconds=60*sessionStorage.sessionSlice;
      };
    }
  });
  $("#bsm").click(function(){
    if (!counting && sessionStorage.breakSlice > 0){
      sessionStorage.breakSlice-=1;
      $("#breakSlice").html(sessionStorage.breakSlice);
      if (sessionStorage.phase==="Break") {
        draw(colorB, 30, sessionStorage.phase, sessionStorage.breakSlice);
        sessionStorage.seconds=60*sessionStorage.breakSlice;
      };
    }
  });
  $("#bsp").click(function(){
    if (!counting){
      sessionStorage.breakSlice=eval(sessionStorage.breakSlice)+1;
      $("#breakSlice").html(sessionStorage.breakSlice);
      if (sessionStorage.phase==="Break") {
        draw(colorB, 30, sessionStorage.phase, sessionStorage.breakSlice);
        sessionStorage.seconds=60*sessionStorage.breakSlice;
      };
    }
  });

  $("#myCanvas").click(function(){
    if (!counting){
      counting=true;
      count=setInterval(countDown, 1000)
    } else {
      clearInterval(count); 
      counting=false;
    }
  });

  function draw (color, percentage, phase, hour){
    // percentage is the fill value, varies from 0 to 100
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    var radius = 148;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2*Math.PI, true);
    ctx.lineWidth = 2;
    ctx.strokeStyle = colorS;
    ctx.stroke(); //draws the circle

    radius = 144,  
    x=1-(percentage/100); //x varies between 0 and 1
    ctx.beginPath();
    //console.log(x+" start: "+(0.5+x)+" end: "+ (0.5-x));
    ctx.arc(centerX, centerY, radius, Math.PI*(0.5+x), Math.PI*(0.5-x), true);
    ctx.fillStyle = color;
    ctx.fill();
    
    ctx.font = "45pt Abel";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(phase, centerX, centerY-40);

    ctx.font = "60pt Abel";
    ctx.fillText(hour, centerX, centerY+80);
  }


  function playSound (sonido){
    $("<audio autoplay>"+
      "<source src='"+sonido+".ogg' type='audio/ogg'>"+
      "<source src='"+sonido+".mp3' type='audio/mpeg'>"+
      "</audio>").appendTo('body');
  }         
  
});