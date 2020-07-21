/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying, oldDice, newDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {   // Non-reusable anonymous function

    if (gamePlaying) {

        //1.Random Number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2.Display Result
        var diceDOM1 = document.getElementById('dice-1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';

        var diceDOM2 = document.getElementById('dice-2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        //3.Update Score if it isnt 1

        if (dice1 !== 1 & dice2 !== 1) {
            //Add score
            roundScores += (dice1 + dice2);
            //here first we update the RS and then put them in the current class
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        }
        else {

            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {

        //Add a current score to a global score
        scores[activePlayer] += roundScores;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check whether the player won the game

        var input = document.querySelector('.Final-Score').value;
        var winningScore;
        // undefiend , 0 , null or " " are coerced to false
        //anything else is coerced to true
        if (input) {
            winningScore = input;
        }
        else {
            winningScore = 100;
        }

        // check whether the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove = 'active';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add = 'winner';

            gamePlaying = false; //to stop the game once the winner is declared

        }
        else {

            //Next player
            nextPlayer();

        }
    }
});

function nextPlayer() {

    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScores = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // document.querySelector('.player-0-panel').classList.remove('active') ;
    // document.querySelector('.player-1-panel').classList.add('active') ;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0, 0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    // getids are faster than querySelector
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove = 'winner';
    document.querySelector('.player-1-panel').classList.remove = 'winner';
    document.querySelector('.player-0-panel').classList.remove = 'active';
    document.querySelector('.player-1-panel').classList.remove = 'active';


    document.querySelector('.player-0-panel').classList.add = 'active';
    // console.log('clicked')


}

// document.querySelector('#current-' + activePlayer).textContent = dice;

// document.querySelector('current-' + activePlayer).innerHTML = '<em>' + dice + '</em>' ;(used for inserting html elements using string)

// var x = document.querySelector('#score-0').textContent;

// console.log(x)

//The textContent property sets or returns the text content of the specified node, and all its descendants.(getter).If you set the textContent property, any child nodes are removed and replaced by a single Text node containing the specified string.(setter)