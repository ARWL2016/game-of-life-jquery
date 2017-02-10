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
            var i=51; 
            var width = 50; 
            var liveNeighbours = 0; 
            var max = 2500; 
            var cells = utils.currentState; 
            console.log('cell:' + cells); 
            
            var a = cells[i-51], b = cells[i-50], c = cells[i-49], d = cells[i-1], e = cells[i+1], f = cells[i+49], g = cells[i+50], h = cells[i+51];
            
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
                console.log('all');
                liveNeighbours = a + b + c + d + e + f + g + h; 
            }

            // console.log("liveNeighbours: " + liveNeighbours);
            // console.log(a, b, c);
            // console.log(d, e);
            // console.log(f, g, h);
            



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



