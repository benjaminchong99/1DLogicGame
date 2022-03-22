console.log("hello world!");

score = 0
table = [0,0,0,0,0,0,0,0,0];
namels = ["bl","bc","br","cl","cc","cr","tl","tc","tr"]
game = []
refcheck = []
testcases = [
    [1,0,1,0,1,0,1,0,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,0,1,0,0,1,0],
    [1,0,0,1,1,1,0,0,1],
    [0,1,0,1,1,1,0,1,0],
    [1,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,1],
    [0,0,0,1,1,0,1,0,0],
    [1,1,1,0,0,0,0,0,0],
    [1,1,0,1,0,0,0,0,0]
]
// 10 sets of different patterns

//[1,0,0,0,0,0,0,0,0] -- too hard
//[0,0,0,1,1,0,1,0,0] -- hard. add after a certain score?
// to randomise even more, add a function that turns it 90deg, 180deg or 270deg
// can store the test cases somewhere else, then import in.

function box(boxtype){
    // change the player's grid colours
    temp = table[boxtype]
    boxname = namels[boxtype]

    if (temp == 0){
        // turn black
        
        document.getElementById(boxname).style.backgroundColor = 'black';
        table[boxtype] = 1
    } else {
        document.getElementById(boxname).style.backgroundColor = 'white';
        table[boxtype] = 0

        // turn white
    }
    console.log(table)
    refcheck = table
}

function check(inp){
    // algorithm to check which square blocks are affected when one is pushed
    blocks = [inp]
    if (inp%3 ==0){
        // up down left right
        if (inp+3 <9){
            blocks.push(inp+3)
        }
        if (inp-3>=0){
            blocks.push(inp-3)
        }
        // if (inp-1>0){
            // blocks.add(inp-1)
        // }
        if (inp+1 <9){
            blocks.push(inp+1)
        
        return blocks
        }
    }

    if ((inp-1)%3 ==0){
        // up down left right
        if (inp+3 <9){
            blocks.push(inp+3)
        }
        if (inp-3>=0){
            blocks.push(inp-3)
        }
        if (inp-1>=0){
            blocks.push(inp-1)
        }
        if (inp+1 <9){
            blocks.push(inp+1)
        
        return blocks
        }
    }

    // last case on the right side
    if ((inp-2)%3 ==0){
        // up down left right
        if (inp+3 <9){
            blocks.push(inp+3)
        }
        if (inp-3>=0){
            blocks.push(inp-3)
        }
        if (inp-1>0){
            blocks.push(inp-1)
        }
        // if (inp+1 <9){
            // blocks.push(inp+1)
        // }
        
        return blocks
    }
}

function affect(inp){
    // calls check and box functions, then activecheck, executed when button is pressed
    blocks = check(inp)
    for (i=0; i<blocks.length; i++){
        box(blocks[i])
    }
    document.getElementById("record").innerHTML += inp + ", ";
    console.log("game: "+game)
    if (document.getElementById("counter").innerHTML == "TIMES UP!!!" || document.getElementById("counter").innerHTML == "Timer"){
        currentscore = score
        document.getElementById("score").innerHTML = "Score: "+currentscore
    }else{
        activecheck()
    }
}


function reset() {
    // clear player's grid 
    table = [1,1,1,1,1,1,1,1,1]
    for (i=0; i<table.length; i++){
        box(i)
    document.getElementById("record").innerHTML = "";
    }
}

function countdown(n) {
    // timer, countdown from 90 secs
    var counter = document.getElementById("counter");
    var seconds = n;
    referencebox()
    document.getElementById('timer').style.visibility = 'hidden';
    function tick() {
        seconds--;
        counter.innerHTML = String(seconds) + (" s");
        if (seconds > 0) {
            timerid = setTimeout(tick, 1000);
        } else {
            document.getElementById("counter").innerHTML = "TIMES UP!!!";
        }
    }
    tick();
}

function stopTimer() {
    // stop the timer
    clearTimeout(timerid);
    document.getElementById("counter").innerHTML = "Timer Stopped"
    delay(1000).then(() => document.getElementById("counter").innerHTML = "Timer")   
    document.getElementById('timer').style.visibility = 'visible';
    score = 0
    document.getElementById('score').innerHTML = "Score: " + score

}

function delay(time) {
    // transition added from "time's up" to "timer" 
    return new Promise(resolve => setTimeout(resolve, time));
  }

function referencebox(){
    // randomise pattern for the game. Shown in the reference grid
    game = testcases[Math.floor(testcases.length * Math.random())] // select one pattern randomly
    game = randomisepos(game)
    norepeat = true;
    for (j=0; j<refcheck.length; j++){
        if (refcheck[j] != game[j]){
            norepeat = false;
        }
    }
    if (norepeat == true){
        referencebox()
    } else{
        for (i = 0; i < game.length; i++){
            if (game[i] == 1){
                // turn black
                refno = "r"+ String(i)
                document.getElementById(refno).style.backgroundColor = 'black';
            }else{
                //turn white
                refno = "r"+ String(i)
                document.getElementById(refno).style.backgroundColor = 'white'
            }
        }
    }
}

function activecheck(){
    // actively checks if player has completed the pattern. if so, add one point to score and randomise another pattern
    indic = true;
    for (j=0; j<refcheck.length; j++){
        if (refcheck[j] != game[j]){
            indic = false;
        }
    }
    if (indic == true){
        referencebox()
        score +=1
        document.getElementById("score").innerHTML = "Score: "+score
    }
}

function randomisepos(instruction){
    // javascript's way of randomising
    // for i in range list, list[i] = newlist[i+sth], return list=newlist
    outer = [0,6,8,2]
    inner = [1,3,7,5]
    newlist = [0,0,0,0,0,0,0,0,0]
    choice = Math.floor(Math.random() * 3);
    for(i=0; i<outer.length; i++) {
        input_o = outer[i]
        input_i = inner[i]
        output_o = outer[(i+choice)%4]
        output_i = inner[(i+choice)%4]
        newlist[output_o] = instruction[input_o]
        newlist[output_i] = instruction[input_i]
    }
    newlist[4] = instruction[4]
    return newlist

}

// function insert_difficult_patterns(){
//     if (score >= 5){
//         // append medium level inside
//     }


//     if (score >=10){
//         //append hard level inside

//     }
// }