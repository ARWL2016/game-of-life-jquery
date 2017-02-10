$(document).ready(function(){

    var settings = {
        boardSize: {
            large: 4899, 
            medium: 3599, 
            small: 2499
        }
    };

    var utils = {
        currentState: [], 
        nextState: [], 

        getInitialState: function (length) {
            for (let i = 0; i <= length; i++) {    
                Math.random() < 0.2 ? utils.currentState.push(1) : utils.currentState.push(0);
            }
            // console.log(utils.currentState) ; 
        }, 
        getNextState: function () {
            var i=0; 
            var width = 50; 
            var liveNeighbours = 0; 
            var max = 2500; 
            var current = utils.currentState; 
            var next = utils.nextState; 
     
            for (i=0; i < max; i++) {

            let a = current[i-51], b = current[i-50], c = current[i-49], d = current[i-1], e = current[i+1], f = current[i+49], g = current[i+50], h = current[i+51];
            
                if (i === 0) {
                    //topleft
                    liveNeighbours = e + g + h; 
                    console.log('topleft');
                } else if (i === width - 1 ) {
                    //topright
                    console.log('topright');
                    liveNeighbours = d + f + g;
                } else if (i === max - width) {
                    // bottomleft
                    console.log('bottomleft');
                    liveNeighbours = b + c + e; 
                } else if (i === max - 1) {
                    //bottomright
                    console.log('bottomright'); 
                    liveNeighbours = a + b + d;
                } else if (i > 0 && i < (width - 1)) {
                    //top
                    console.log('top');
                    liveNeighbours = d + e + f + g + h;
                } else if (i % 50 === 0) {
                    //left
                    console.log('left');
                    liveNeighbours = b + c + e + g + h;
                } else if ((i + 1) % 50 === 0) {
                    //right
                    console.log('right');
                    liveNeighbours = a + b + d + f + g;
                } else if (i > max - width && i < max - 1) {
                    //bottom 
                    console.log('bottom');
                    liveNeighbours = a + b + c + d + e;
                } else {
                    //middle 
                    // console.log('all');
                    liveNeighbours = a + b + c + d + e + f + g + h; 
                }
                // console.log('-----------------' + i + '-------------------');
                
                // console.log(a, b, c);
                // console.log(d, e);
                // console.log(f, g, h);
                // console.log("liveNeighbours: " + liveNeighbours);
                // console.log('alive?: ' + current[i]);

                if (current[i] === 1 && liveNeighbours === (2 || 3) || current[i] === 0 && liveNeighbours === 3) {
                    // console.log('lives'); 
                    next[i] = 1; 
                } else {
                    // console.log('dies');
                    next[i] = 0; 
                }
                
            
            }//for 
            console.log('next state: ' + next);
            



        }//getNextState
        
    };
     

    var App = {
        init: function () { 
            var size = 2499;
            utils.getInitialState(size); 
            App.createGame(size);
            App.addIdAndClass(); 
            utils.getNextState(); 
        }, 
        createGame: function (size) {
            var board = $('#board'); 
            var newCell = '<div class="cell"></div>';
            var i; 
            for (i=0; i<size; i++) {
                board.append(newCell);
            }
        }, 
        addIdAndClass: function () {
            $('div.cell').each(function(index){
                this.id = index;
                utils.currentState[index] === 1 ? $(this).addClass("cell-alive") : $(this).addClass("cell-dead"); 
            });
        }
    }; //App

    App.init(); 
    
     
}); //doc ready



