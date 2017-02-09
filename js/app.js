$(document).ready(function(){

    var settings = {
        boardSize: {
            large: 4899, 
            medium: 3599, 
            small: 2499
        }
    };

    var utils = {
        row: [], 

        fillRow: function () {
            for (let i = 0, len = 50; i < len; i++) {
                 
                if (Math.random() < 0.3) {
                    utils.row.push(1);
                } else {
                   utils.row.push(0);
                }
            }

            return utils.row; 
        }, 
        fillMasterArray: function () {
             
            for (let i = 0, len = 2; i < len; i++) {
                var newArray = utils.fillSlaveArray();
                console.log(newArray); 
                // utils.master.push(newArray);  
            }
            // console.log(utils.master); 
        }
    };
     

    var App = {
        init: function () {
            boardSize = settings.boardSize.small; 
            App.generateBoard(boardSize);
        }, 
        generateBoard: function (size) {
            var board = $('#board'); 
            var newCell = '<div class="cell"></div>';
            var i; 
            for (i=0; i<size; i++) {
                board.append(newCell);
            }
            $('div.cell').each(function(index){
                this.id = index; 
            }); 
        }
    };

    // App.init(); 
    var result = utils.fillRow(); 
    console.log(result); 
     

}); //doc ready

