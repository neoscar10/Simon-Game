var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickPattern = [];
var keypresses = [];
var level = 0;



function playSound(name){
    var sound = new Audio('sounds/' +name+ '.mp3');
    sound.play()
}

function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed')
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed')
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickPattern.length === gamePattern.length){
            console.log(222222);
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound('wrong');
        $('body').addClass('game-over')
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        startOver();
    }
}

function nextSequence(){
    userClickPattern = [];
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //select the random chosesn color and animate a flash, then play a sound assosiated to it
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level = level+1
    $('h1').text('Level '+level)
    $('#level-subtitle').text('');
    console.log(gamePattern);


}

function startOver(){
    $('h1').text('Game Over, Press a key to restart')
    $('#level-subtitle').text('You died at level '+ level);
    level = 0;
    gamePattern = [];
    keypresses = [];
}

$(document).keydown(function(event){
    //keeping track of first keypress by adding key to the array and only calling the nextsequence function when for the first kp
    keypresses.push(event.key);
    if (keypresses.length === 1){
        nextSequence();
        $('h1').text('Level '+level)
    }else{
        
    }
});



//add event listeners tobuttons
$('.btn').click(function(){
    userChosenColour = $(this).attr('id');
    userClickPattern.push(userChosenColour)
    console.log(userClickPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length-1);
});

