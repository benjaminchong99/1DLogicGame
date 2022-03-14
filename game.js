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
    [1,0,0,0,0,0,0,0,0]
]
// to randomise even more, add a function that turns it 90deg, 180deg or 270deg
// can store the test cases somewhere else, then import in.

function box(boxtype){
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
    table = [1,1,1,1,1,1,1,1,1]
    for (i=0; i<table.length; i++){
        box(i)
    document.getElementById("record").innerHTML = "";
    }
}

function countdown(n) {
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
    clearTimeout(timerid);
    document.getElementById("counter").innerHTML = "Timer Stopped"
    delay(1000).then(() => document.getElementById("counter").innerHTML = "Timer")   
    document.getElementById('timer').style.visibility = 'visible';
    score = 0
    document.getElementById('score').innerHTML = "Score: " + score

}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

function referencebox(){
    game = testcases[Math.floor(testcases.length * Math.random())] // select one pattern randomly
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