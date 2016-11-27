//tictactoe.js

function Game() {
    this.gameBoard = document.getElementById("gameboard");
    
    let player1Name = document.getElementById("player1");
    let player2Name = document.getElementById("player2");
    
    let player1Obj = new Player();
    let player2Obj = new Player();
    
    let player1Turn = true;
    
    //Main game function - start the game
    this.startGame = function() {
        
        //Initializing the players
        player1Obj.score = 0;
        player1Obj.askForPlayerName();
        player1Name.textContent = player1Obj.playerName + ":";
        player1Name.nextElementSibling.textContent = player1Obj.score;
        
        player2Obj.score = 0;
        player2Obj.askForPlayerName();
        player2Name.textContent = player2Obj.playerName + ":";
        player2Name.nextElementSibling.textContent = player2Obj.score;
        
        //Initialize the game
        g.createGameBoard();
        
    };
    
    
    
    //Reset function that resets the buttons on the gameboard.
    this.resetGame = function () {
        
        let gameButtons = this.gameBoard.children;
        if (gameButtons.length > 0) {
            while (gameButtons.length > 0) {
                this.gameBoard.removeChild(gameButtons[gameButtons.length - 1]);
            }
        }
    };
    
    //Create the buttons for the game to run
    this.createGameBoard = function () {
      this.resetGame();
      for (let i = 0; i < 9; i++) {
          let btn = document.createElement("button");
          btn.className = "game-btn";
          this.gameBoard.appendChild(btn);
      }  
    };
    
    /*
        The function checks for the event target to be a button.
        than it checks for the player turn and put the mark according to the player.
        x for 1 o for 2.
    */
    this.putYourMark = function(e) {
        if (e.target.tagName === "BUTTON") {
            var btn = e.target;
            
            if (player1Turn) {
                let btnImg_x = document.createElement("img");
                btnImg_x.setAttribute("src", "img/x.jpg");
                btnImg_x.setAttribute("alt", "X Image");
                
                btn.appendChild(btnImg_x);
                btn.className = "game-btn x";
                btn.setAttribute("disabled", "disabled");
                
                player1Turn = false;
                g.checkForWin();
                
            } else {
                let btnImg_o = document.createElement("img");
                btnImg_o.setAttribute("src", "img/o.jpg");
                btnImg_o.setAttribute("alt", "O Image");
                
                btn.appendChild(btnImg_o);
                btn.className = "game-btn o";
                btn.setAttribute("disabled", "disabled");
                
                player1Turn = true;
                g.checkForWin();
            }
        }
        
    };
    
    this.checkFullBoard = function() {
        var buttons = this.gameBoard.children;
        let hasChild = 0;
        
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].children.length > 0) {
                hasChild++;
            }
        }
        
        
        if (hasChild === buttons.length) {
            return true;
        }
        
        return false;
    };
    
    this.checkForWin = function () {
        var buttons = this.gameBoard.children;
        
        for (var i = 0; i < buttons.length; i++) {
            if ((buttons[0].classList.contains("x") && buttons[1].classList.contains("x") && buttons[2].classList.contains("x")) || 
                 (buttons[3].classList.contains("x") && buttons[4].classList.contains("x") && buttons[5].classList.contains("x")) ||
                 (buttons[6].classList.contains("x") && buttons[7].classList.contains("x") && buttons[8].classList.contains("x")) ||
                 (buttons[0].classList.contains("x") && buttons[3].classList.contains("x") && buttons[6].classList.contains("x")) ||
                 (buttons[1].classList.contains("x") && buttons[4].classList.contains("x") && buttons[7].classList.contains("x")) ||
                 (buttons[2].classList.contains("x") && buttons[5].classList.contains("x") && buttons[8].classList.contains("x")) ||
                 (buttons[0].classList.contains("x") && buttons[4].classList.contains("x") && buttons[8].classList.contains("x")) ||
                 (buttons[2].classList.contains("x") && buttons[4].classList.contains("x") && buttons[6].classList.contains("x"))){
                     
                       alert("X wins!!");
                       player1Obj.incrementScore();
                       player1Name.nextElementSibling.textContent = player1Obj.score;
                       
                       if (confirm("Do you want to play again?")) {
                           g.playAgain();
                       } else {
                           g.finishGame();
                       }
                
            } else if ((buttons[0].classList.contains("o") && buttons[1].classList.contains("o") && buttons[2].classList.contains("o")) || 
                 (buttons[3].classList.contains("o") && buttons[4].classList.contains("o") && buttons[5].classList.contains("o")) ||
                 (buttons[6].classList.contains("o") && buttons[7].classList.contains("o") && buttons[8].classList.contains("o")) ||
                 (buttons[0].classList.contains("o") && buttons[3].classList.contains("o") && buttons[6].classList.contains("o")) ||
                 (buttons[1].classList.contains("o") && buttons[4].classList.contains("o") && buttons[7].classList.contains("o")) ||
                 (buttons[2].classList.contains("o") && buttons[5].classList.contains("o") && buttons[8].classList.contains("o")) ||
                 (buttons[0].classList.contains("o") && buttons[4].classList.contains("o") && buttons[8].classList.contains("o")) ||
                 (buttons[2].classList.contains("o") && buttons[4].classList.contains("o") && buttons[6].classList.contains("o"))) {
                     
                    alert("O wins!!");
                    player2Obj.incrementScore();
                    player2Name.nextElementSibling.textContent = player2Obj.score;
                    
                    
                    if (confirm("Do you want to play again?")) {
                       g.playAgain();
                   } else {
                       g.finishGame();
                   }
                 } else {
                     if (this.checkFullBoard()) {
                          alert("This is a tie!");
                          if (confirm("Do you want to play again?")) {
                           g.playAgain();
                       } else {
                           g.finishGame();
                       }
                     }
                 }
        }
    };
    
    this.playAgain = function() {
        this.createGameBoard();
    };
    
    this.finishGame = function() {
        let htmlStatus = "";
        let container = this.gameBoard.parentNode;
        let scoreDiv = this.gameBoard.nextElementSibling;
        container.removeChild(scoreDiv);
        
        if (player1Obj.score > player2Obj.score) {            
            htmlStatus = "<h2>Congratulations " + player1Obj.playerName + " for winning this game!</h2>";
            this.gameBoard.innerHTML = htmlStatus;
            
        } else if (player1Obj.score === player2Obj.score) {
            htmlStatus = "<h2>You finished in a tie!</h2>";
            this.gameBoard.innerHTML = htmlStatus;
        } else {
            htmlStatus = "<h2>Congratulations " + player2Obj.playerName + " for winning this game!</h2>";
            this.gameBoard.innerHTML = htmlStatus;
        }
    };
    
    this.gameBoard.addEventListener("click", this.putYourMark);
}


const startButton = document.getElementById("start");
let g = new Game();

startButton.addEventListener("click", function(e){
    e.preventDefault();
    
    //Start the game
    g.startGame();
});