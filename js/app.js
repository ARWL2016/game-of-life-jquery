$(document).ready(function(){

    var settings = {
        boardSize: {
            large: 4899, 
            medium: 3599, 
            small: 2499
        }
    };

    var utils = {
        state: [], 

        getInitialState: function (length) {
            for (let i = 0; i < length; i++) {    
                Math.random() < 0.3 ? utils.state.push(1) : utils.state.push(0);
            }
            console.log(utils.state) ; 
        }, 
        
    };
     

    var App = {
        init: function () { 
            var size = 2499;
            utils.getInitialState(size); 
            App.renderGame(size);
        }, 
        renderGame: function (size) {
            var board = $('#board'); 
            var newCell = '<div class="cell"></div>';
            var i; 
            for (i=0; i<size; i++) {
                board.append(newCell);
            }
            $('div.cell').each(function(index){
                this.id = index;
                if (utils.state[index] === 1) {
                    $(this).addClass("cell-alive") 
                } else {
                    $(this).addClass("cell-dead") 
                }
                ; 
            }); 
        }
    };

    App.init(); 
    
     
}); //doc ready

