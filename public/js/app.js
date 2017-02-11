var utils = {
    currentState: [], 
    nextState: [], 
    generation: 0, 

    getInitialState: function (length) {
        for (let i = 0; i <= length; i++) { 
            utils.currentState[i] = Math.random() < 0.3 ? 1 : 0; 
        }
    }, 
    getNextState: function () {
        var width = 50, 
        liveNeighbours = 0, 
        max = 2500, 
        current = utils.currentState, 
        next = utils.nextState; 
    
        for (let i=0; i < max; i++) {
        let a = current[i-51], b = current[i-50], c = current[i-49], d = current[i-1], e = current[i+1], f = current[i+49], g = current[i+50], h = current[i+51];
        
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

            if (current[i] === 1 && (liveNeighbours === 2 || liveNeighbours === 3) || current[i] === 0 && liveNeighbours === 3) {
                next[i] = 1; 
            } else {
                next[i] = 0; 
            }
        }

        App.renderGame(next); 
    }
};
    
var App = {
    init: function () { 
        var size = 2499;
        utils.getInitialState(size); 
        App.createGame(size);
        App.addIdAndClass(); 
        setTimeout(function(){
            utils.getNextState(); 
        }, 500);         
    }, 
    createGame: function (size) {
        var board = $('#board'), 
        newCell = '<div class="cell"></div>';
        for (let i=0; i<size; i++) {
            board.append(newCell);
        }
    }, 
    addIdAndClass: function () {
        $('div.cell').each(function(index){
            this.id = index;
            if (utils.currentState[index] === 1) {
                $(this).addClass("cell-alive");
            }
        });
    }, 
    renderGame: function(arrayToRender) {
        debugger; 
        setTimeout(function(){
            $('div.cell').each(function(index){  
                if (arrayToRender[index] === 0 &&  $(this).hasClass("cell-alive")) {
                    $(this).removeClass("cell-alive"); 
                } else if (arrayToRender[index] === 1 && !$(this).hasClass("cell-alive")) {
                    $(this).addClass("cell-alive");
                }
            });

            utils.currentState = arrayToRender; 
            utils.nextState = []; 
            utils.generation += 1; 

            if (utils.generation < 1200) {
                utils.getNextState(); 
            }
            $('#generationCounter').text(utils.generation); 

        }, 15);
        
    }
};

$(document).ready(function(){
    App.init();  
}); 
