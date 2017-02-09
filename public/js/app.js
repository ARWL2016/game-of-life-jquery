$(document).ready(function(){

    var settings = {
        boardSize: {
            large: 4900, 
            medium: 3600, 
            small: 2500
        }
    };
     
    var App = {
        init: function () {
            console.log('app.js loaded');
            console.log('Board size: ' + settings.boardSize.small);
            App.generateBoard(settings.boardSize.small);
        }, 
        generateBoard: function (size) {
            var numberOfCells = size -1; 
            console.log(numberOfCells);
            var board = $('#board'); 
            var newCell = '<div class="cell"></div>';
            newCell.title = "title";
            for (var i=0; i<numberOfCells; i++) {
                board.append(newCell);
            }
            $('div.cell').each(function(i){
                this.id = i; 
            }); 
            
        }
    };

    App.init(); 
     

}); //doc ready

