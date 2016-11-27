//player.js

//Creating the player Class
function Player() {
    this.score = 0;
    this.playerName = "";
    
    this.incrementScore = function() {
        this.score++;
    };
    
    this.askForPlayerName = function() {
        while (this.playerName === "" || this.playerName === null) {
            this.playerName = prompt("Please Enter your name:");
        }
    };
}