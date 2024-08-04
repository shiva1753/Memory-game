let buttonColours = ["red" , "blue" , "green" , "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false ;
let level = 0;
let highest_score = 0;
function getHighestScore() {
    highest_score = localStorage.getItem('highestScore') || 0; // Get or set to 0
    $(".Highest").text(highest_score);
  }
  
  // Function to update and save highest score in localStorage
  function updateHighestScore(newScore) {
    highest_score = Math.max(highest_score, newScore); // Compare and update
    localStorage.setItem('highestScore', highest_score); // Save to localStorage
    $(".Highest").text(highest_score);
  }
  
  $(document).ready(function() { // Runs when the document is ready
    getHighestScore(); // Get the highest score on page load
  });
  
function nextSequence(){
    if (level >= highest_score) {
        updateHighestScore(level); // Update and save if new high score
      }
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio('sounds/' + randomChosenColour +'.mp3');
    audio.play();
}
$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio('sounds/' + name +'.mp3');
    audio.play();
}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
      }, 100); 
}
$(document).keypress(function()
{
    if(!started){

        $("#level-title").text("level " + level);
        nextSequence();
        started = true ;
    }
    
})

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length == gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{

        console.log("Wrong");

        playSound("Wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){

    level = 0 ; 
    gamePattern = [];
    started = false ;
}




