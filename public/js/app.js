$(document).ready(function(){
     
    var App = {
        init: function () {
            console.log('app.js loaded');
            App.generateBoard();
        }, 
        generateBoard: function () {
            var board = $('#board'); 
            var newCell = '<div class="cell"></div>'; 
            for (var i=0; i<2499; i++) {
                board.append(newCell); 
            }
            
        }




    }

    App.init(); 
     

}); //doc ready

