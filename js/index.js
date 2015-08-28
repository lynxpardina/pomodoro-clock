$(document).ready(function() { 
  var layer1=$("#layer1")[0],
      ctx1 = layer1.getContext("2d"), 
      centerX = layer1.width / 2,
      centerY = layer1.height / 2, 
      layer2 = $("#layer2")[0],
      ctx2 = layer2.getContext("2d"),
      counting=false, 
      colorS ="lime",
      colorB = "OrangeRed";  // colors to use lime, OrangeRed

  if (sessionStorage.sessionSlice === undefined){
      sessionStorage.sessionSlice =25;
  }
  if (sessionStorage.breakSlice === undefined){
      sessionStorage.breakSlice =5;
  }
  if (sessionStorage.phase === undefined){
      sessionStorage.phase = "Session";
  }

  $("#sessionSlice").html(sessionStorage.sessionSlice);
  $("#breakSlice").html(sessionStorage.breakSlice);

  if (sessionStorage.phase ==="Session"){
    fillCircle(colorS,30)
    drawTime(sessionStorage.phase, sessionStorage.sessionSlice);
  }else{
    fillCircle(colorB,20);
    drawTime(sessionStorage.phase, sessionStorage.breakSlice)
  }
  
  fillCircle(colorB,20); 
    
  playSound ("https://dl.dropboxusercontent.com/u/49268757/notify");



  $("#ssm").click(function(){ 
    if (!counting && sessionStorage.sessionSlice > 0){
      sessionStorage.sessionSlice-=1;
      $("#sessionSlice").html(sessionStorage.sessionSlice);
      if (sessionStorage.phase==="Session") {drawTime(sessionStorage.phase, sessionStorage.sessionSlice)};
    }
  });
  $("#ssp").click(function(){
    if (!counting){
      sessionStorage.sessionSlice=eval(sessionStorage.sessionSlice)+1;
      $("#sessionSlice").html(sessionStorage.sessionSlice);
      if (sessionStorage.phase==="Session") {drawTime(sessionStorage.phase, sessionStorage.sessionSlice)};
    }
  });
  $("#bsm").click(function(){
    if (!counting && sessionStorage.breakSlice > 0){
      sessionStorage.breakSlice-=1;
      $("#breakSlice").html(sessionStorage.breakSlice);
      if (sessionStorage.phase==="Break") {drawTime(sessionStorage.phase, sessionStorage.breakSlice)};
    }
  });
  $("#bsp").click(function(){
    if (!counting){
      sessionStorage.breakSlice=eval(sessionStorage.breakSlice)+1;
      $("#breakSlice").html(sessionStorage.breakSlice);
      if (sessionStorage.phase==="Break") {drawTime(sessionStorage.phase, sessionStorage.breakSlice)};
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

  function countDown(phase ){
    //if (sessionStorage.phase="Session")
  }

  function drawTime(phase, hour){
    ctx2.clearRect(0, 0, layer1.width, layer1.height);
    
    ctx2.font = "45pt Abel";
    ctx2.fillStyle = "white";
    ctx2.textAlign = "center";
    ctx2.fillText(phase, centerX, centerY-40);

    ctx2.font = "60pt Abel";
    ctx2.fillText(hour, centerX, centerY+80);
  }


  function fillCircle(color, percentage){
                //percentage varies between 0 an 100
    ctx1.clearRect(0, 0, layer1.width, layer1.height);

    var radius = 148;
    ctx1.beginPath();
    ctx1.arc(centerX, centerY, radius, 0, 2*Math.PI, true);
    ctx1.lineWidth = 2;
    ctx1.strokeStyle = colorS;
    ctx1.stroke(); //draws the circle

    radius = 144,  
    x=percentage/100; //x varies between 0 and 1
    ctx1.beginPath();
    //console.log(x+" start: "+(0.5+x)+" end: "+ (0.5-x));
    ctx1.arc(centerX, centerY, radius, Math.PI*(0.5+x), Math.PI*(0.5-x), true);
    ctx1.fillStyle = color;
    ctx1.fill();
    ctx1.restore();
  }  

  function playSound (sonido){
    $("<audio autoplay>"+
      "<source src='"+sonido+".ogg' type='audio/ogg'>"+
      "<source src='"+sonido+".mp3' type='audio/mpeg'>"+
      "</audio>").appendTo('body');
  }         
  
});