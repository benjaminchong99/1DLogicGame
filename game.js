console.log("hello world!");

table = [0,0,0,0,0,0,0,0,0];
namels = ["bl","bc","br","cl","cc","cr","tl","tc","tr"]

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
}


function reset() {
    table = [1,1,1,1,1,1,1,1,1]
    for (i=0; i<table.length; i++){
        box(i)
    }
}

function countdown(n) {
    var counter = document.getElementById("counter");
    var seconds = n;
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
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }