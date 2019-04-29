$(document).ready(function(){
  $("#infobox").html("")
  
  var redAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
  var blueAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")
  var greenAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")
  var yellowAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
  
  var audios = {
    "red": redAudio,
    "blue": blueAudio,
    "green": greenAudio,
    "yellow": yellowAudio
  }
  
  // var btnList = ["red", "blue", "green", "yellow"]
  var btnList = []
  var turns = 1;
  var playerList = [];
  var colors = ["red", "blue", "green", "yellow"]
  
  var strict = false;
  if (strict) {
      $("#strict").css("background-color", "green")
    } else {
      $("#strict").css("background-color", "red")
  }
  
  function addBtn(){
    var rndButton = colors[Math.floor(4*Math.random())]
    btnList.push(rndButton)
  }
  
  function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
      return false;
    for(var i = arr1.length; i--;) {
      if(arr1[i] !== arr2[i])
        return false;
    }return true;
  }
  
  function playList(List){
    if (List.length>0){   
      var audioElement = audios[List[0]];
      audioElement.load()
      audioElement.play()
      setTimeout(function(){
        $("#"+List[0]).addClass("active")
      }, 100)
      setTimeout(function(){
        $("#"+List[0]).removeClass("active")
        playList(List.slice(1))
      }, 1000)
    }
  }
  
  function colorClicked(color){
    audios[color].load()
    audios[color].play()
    playerList.push(color)
    $("#infobox").html(playerList.length.toString()+" / "+btnList.length.toString());
    if (btnList.length == playerList.length){
      setTimeout(function(){
        if (arraysEqual(btnList, playerList)){
          if (turns === 20){
            $("#infobox").html("You win! Start new Game.")
            btnList = []
            playerList = []
            addBtn()
            playList(btnList)
            turns = 1
            $("#turns").html(turns.toString())
          } else {
            $("#infobox").html("")
            turns++
            addBtn()
            playList(btnList)
            playerList = []
            $("#turns").html(turns.toString())
          }
        } else {
          if (strict){
            btnList = []
            playerList = []
            turns = 1
            $("#turns").html(turns.toString())
            $("#infobox").html("Wrong Sequence! New Start.")
            addBtn()
            playList(btnList)
          } else{
            playList(btnList)
            playerList = []
            $("#turns").html(turns.toString())
            $("#infobox").html("Wrong Sequence!")
          }
        }
      }, 1500)
    }
  }
  
  $("#red").click(function(){
    colorClicked("red")
  })
  $("#blue").click(function(){
    colorClicked("blue")
  })
  $("#green").click(function(){
    colorClicked("green")
  })
  $("#yellow").click(function(){
    colorClicked("yellow")
  })

  $("#start").click(function(){
    turns = 1
    $("#turns").html(turns.toString())
    btnList = []
    playerList = []
    addBtn()
    console.log(btnList)
    playList(btnList)
    $("#infobox").html("")
  })
  
  $("#strict").click(function(){
    strict = !strict;
    if (strict) {
      $("#strict").css("background-color", "green")
    } else {
      $("#strict").css("background-color", "red")
    }
  })
  
  $("#turns").html(turns.toString())
})