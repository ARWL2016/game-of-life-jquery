const Settings = {
  renderDelay: 100, 
  cyclesPerSecond: 10,
  width: 50, 
  totalCells: 2500,
  widthClass: 'small-width', 
  initialPopRatio: 0.2 // ratio of live to dead cells
};

const gameState = {
  // game state arrays are populated with 1s (live cells) or 0s (dead cells)
  currState: [],
  nextState: [],
  generation: 0,
  state: "stopped",

  createRandomState: function (totalCells) {
    // a 50 * 50 cell board is represented by 2500 length array
    for (let i = 0; i <= totalCells; i++) {
      gameState.currState[i] = Math.random() < Settings.initialPopRatio
        ? 1
        : 0;
    }
  },
  getNextState: function () {
    let width = Settings.width,
      liveNeighbours = 0, // min 0 max 8 
      curr = gameState.currState,
      next = gameState.nextState;

      // cell neighbours are referenced like this: 

      // a | b | c 
      // _________
      // d |   | e
      // _________ 
      // f | g | h
    
    for (let i = 0; i < Settings.totalCells; i++) {
      let a = curr[i - width - 1],
        b = curr[i - width],
        c = curr[i - width + 1],
        d = curr[i - 1],
        e = curr[i + 1],
        f = curr[i + width -1],
        g = curr[i + width],
        h = curr[i + width + 1];

      if (i === 0) {
        // top left corner 
        liveNeighbours = e + g + h;
      } else if (i === width - 1) {
        // top right
        liveNeighbours = d + f + g;
      } else if (i === Settings.totalCells - width) {
        // bottom left 
        liveNeighbours = b + c + e;
      } else if (i === Settings.totalCells - 1) {
        // bottom right (last cell)
        liveNeighbours = a + b + d;
      } else if (i > 0 && i < (width - 1)) {
        // top row 
        liveNeighbours = d + e + f + g + h;
      } else if (i % width === 0) {
        // left column 
        liveNeighbours = b + c + e + g + h;
      } else if ((i + 1) % width === 0) {
        // right column
        liveNeighbours = a + b + d + f + g;
      } else if (i > Settings.totalCells - width && i < Settings.totalCells - 1) {
        // bottom row
        liveNeighbours = a + b + c + d + e;
      } else {
        // inside cells
        liveNeighbours = a + b + c + d + e + f + g + h;
      }

      // live cells with 2 or 3 live neighbours live; dead cells with 3 live neighbours become live
      if (curr[i] === 1 && (liveNeighbours === 2 || liveNeighbours === 3) || curr[i] === 0 && liveNeighbours === 3) {
        next[i] = 1;
      } else {
        next[i] = 0;
      }
    }
    gameState.nextState = next;
    if (gameState.state === "started") {
      App.renderGame();
    }
  }, 
  tick: function () {
    // prepare data for next iteration; move next state to current and empty next state array
    gameState.currState = gameState.nextState;
    gameState.nextState = [];

    gameState.generation += 1;
    $('.counter').text('Generation : ' + gameState.generation);

    if (gameState.state === "started") {
      gameState.getNextState();
    }
    return;
  }
};

const App = {
  init: function () {
    console.log('init');
    
    gameState.state = "started";
    App.drawBoard(Settings.totalCells);
    gameState.createRandomState(Settings.totalCells);
    App.renderInitialGame();
    gameState.getNextState();
  },
  restartGame: function () {
    gameState.state = "started";
    gameState.generation = 0;
    gameState.createRandomState(Settings.totalCells);
    App.renderInitialGame();
    gameState.getNextState();
  },
  drawBoard: function (totalCells) {
    const board = $('#board'),
      newCell = '<div class="cell"></div>';
      board.addClass(Settings.widthClass);

    for (let i = 0; i < Settings.totalCells -1; i++) {
      board.append(newCell);
    }
    $('div.cell')
      .each(function (index) {
        this.id = index;
      });
  },
  clearBoard: function () {
    gameState.state = "stopped";
    console.log('Clear button. Gamestate :' + gameState.state);
    $('div.cell').each(function () {
      $(this).removeClass("cell-alive");
    });
    App.reset();
  },
  reset: function () {
    gameState.state = "stopped";
    gameState.currState = [];
    gameState.nextState = [];
    gameState.generation = 0;
  },
  renderInitialGame: function () {
    $('div.cell')
      .each(function (index) {
        if (gameState.currState[index] === 1) {
          $(this).addClass("cell-alive");
        }
      });
  },
  renderGame: function () {
    setTimeout(function () {
      if (gameState.state === "started") {
        $('div.cell')
          .each(function (index) {
            // remove class from dying cells 
            if (gameState.nextState[index] === 0 && $(this).hasClass("cell-alive")) {
              $(this).removeClass("cell-alive");
            } else if (gameState.nextState[index] === 1 && !$(this).hasClass("cell-alive")) {
              // add class to reborn cells 
              $(this).addClass("cell-alive");
            }
          });
          if (gameState.state === "started") {
            gameState.tick();
          }
      }
    }, Settings.renderDelay);
  },

  handleUserEvents() {
    $('#startBtn')
      .on('click', function () {
        App.clearBoard();
        $('#pauseBtn').html('Pause');
        App.restartGame(); 
      });

    $('#pauseBtn').on('click', function () {
      if (gameState.state === "started") {
        gameState.state = "stopped";
        $('#pauseBtn').html('Start');
      } else {
        gameState.state = "started";
        gameState.getNextState();
        $('#pauseBtn').html('Pause');
      }
    });

    $('#clearBtn').on('click', function () {
      App.clearBoard();
    });

    $('#fastBtn').on('click', function () {
      if (Settings.cyclesPerSecond < 50) {
        Settings.cyclesPerSecond += 2;
        Settings.renderDelay = 1000 / Settings.cyclesPerSecond;
        $('.speed').html('Cycles per Second : ' + Settings.cyclesPerSecond);
      }
    });

    $('#slowBtn').on('click', function () {
      if (Settings.cyclesPerSecond > 4) {
        Settings.cyclesPerSecond -=2; 
        Settings.renderDelay = 1000 / Settings.cyclesPerSecond;
        $('.speed').html('Cycles per Second : ' + Settings.cyclesPerSecond);
      }
    });

    $('.cell').on('click', function(e) {
      if (gameState.state = "started") {
        $('#pauseBtn').click();
      }
      let id = e.target.id;
      if (e.target.classList.length === 1) {
        $(this).addClass('cell-alive');
        gameState.currState[id] = 1;
      } else {
        $(this).removeClass('cell-alive');
        gameState.currState[id] = 0;
      }
    });
  }
};

$(document).ready(function () {
  App.init();
  App.handleUserEvents();
});
