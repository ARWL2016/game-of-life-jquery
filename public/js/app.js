var settings = {
    renderDelay: 25
}

var gameState = {
    currState: [], 
    nextState: [], 
    generation: 0, 
    state: "stopped", 

    createRandomState: function (size) {
        for (let i = 0; i <= size; i++) { 
            gameState.currState[i] = Math.random() < 0.15 ? 1 : 0; 
        }
    }, 
    getNextState: function () { 
        var width = 100, 
        liveNeighbours = 0, 
        max = 5000, 
        curr = gameState.currState, 
        next = gameState.nextState; 

        for (let i=0; i < max; i++) {
        let a = curr[i-51], b = curr[i-50], c = curr[i-49], d = curr[i-1], e = curr[i+1], f = curr[i+49], g = curr[i+50], h = curr[i+51];
        
            if (i === 0) {
                liveNeighbours = e + g + h; 
            } else if (i === width - 1 ) {
                liveNeighbours = d + f + g;
            } else if (i === max - width) {
                liveNeighbours = b + c + e; 
            } else if (i === max - 1) {
                liveNeighbours = a + b + d;
            } else if (i > 0 && i < (width - 1)) {
                liveNeighbours = d + e + f + g + h;
            } else if (i % 50 === 0) {
                liveNeighbours = b + c + e + g + h;
            } else if ((i + 1) % 50 === 0) {
                liveNeighbours = a + b + d + f + g;
            } else if (i > max - width && i < max - 1) {
                liveNeighbours = a + b + c + d + e;
            } else {
                liveNeighbours = a + b + c + d + e + f + g + h; 
            }

            if (curr[i] === 1 && (liveNeighbours === 2 || liveNeighbours === 3) || curr[i] === 0 && liveNeighbours === 3) {
                next[i] = 1; 
            } else {
                next[i] = 0; 
            }
        }
        gameState.nextState = next; 
        App.renderGame(); 
    }
};
 
var App = {
    init: function () { 
        gameState.state = "started"; 
        App.drawBoard(4999); 
        gameState.createRandomState(4999); 
        App.renderInitialGame(); 
        gameState.getNextState();
    },
    restartGame: function () {
        gameState.state = "started"; 
        gameState.generation = 0; 
        gameState.createRandomState(4999); 
        App.renderInitialGame(); 
        gameState.getNextState(); 
    }, 
    drawBoard: function (size) {
        var boardSize = size || 2499; 
        var board = $('#board'), 
        newCell = '<div class="cell"></div>';
        for (let i=0; i<boardSize; i++) { 
            board.append(newCell);
        }
        $('div.cell').each(function(index){
            this.id = index; 
        }); 
    }, 
    clearBoard: function () {
        gameState.state = "stopped"; 
        console.log('Clear button. Gamestate :' + gameState.state); 
        $('div.cell').each(function(){ 
            $(this).removeClass("cell-alive"); 
        }); 
        App.reset(); 
    },
    reset: function () {
        gameState.currState = []; 
        gameState.nextState = []; 
        gameState.generation = 0; 
        gameState.state = "stopped";
    },
    renderInitialGame: function () {
        $('div.cell').each(function(index){
            if (gameState.currState[index] === 1) {
                $(this).addClass("cell-alive");
            }
        });
    }, 
    renderGame: function() { 
        setTimeout(function(){
           if (gameState.state === "started") { 
                $('div.cell').each(function(index){  
                    if (gameState.nextState[index] === 0 &&  $(this).hasClass("cell-alive")) {
                        $(this).removeClass("cell-alive"); 
                    } else if (gameState.nextState[index] === 1 && !$(this).hasClass("cell-alive")) {
                        $(this).addClass("cell-alive");
                    }
                });
            App.tick();
            }
        }, settings.renderDelay);  
    }, 
    tick: function () {
        gameState.currState = gameState.nextState; 
        gameState.nextState = []; 

        gameState.generation += 1; 
        $('#counter').text(gameState.generation); 

        if (gameState.state === "started") {
            gameState.getNextState();  
        }
        return; 
    },
    handleUserEvents() { 
        $('#startBtn').on('click', function(){
            App.restartGame(); 
        });
        $('#pauseBtn').on('click', function() {
           if (gameState.state === "started") {
               gameState.state = "stopped"; 
           } else {
               gameState.state = "started"; 
               gameState.getNextState();
           }  
        });
        $('#clearBtn').on('click', function(){
            App.clearBoard(); 
        }); 
    }
};

$(document).ready(function(){
    App.init(); 
    App.handleUserEvents();      
}); 



