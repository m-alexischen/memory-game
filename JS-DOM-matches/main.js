var cardsArray = [
    {    'name': 'Aquarius',    'img': 'https://github.com/alexis21o8/image/blob/main/aquarius.png?raw=true',  },
    {    'name': 'Aries',    'img': 'https://github.com/alexis21o8/image/blob/main/aries.png?raw=true',  },
    {    'name': 'Cancer',    'img': 'https://github.com/alexis21o8/image/blob/main/cancer.png?raw=true',  },
    {    'name': 'Capricorn',    'img': 'https://github.com/alexis21o8/image/blob/main/capricorn.png?raw=true',  },
    {    'name': 'Gemini',    'img': 'https://github.com/alexis21o8/image/blob/main/gemini.png?raw=true',  },
    {    'name': 'Leo',    'img': 'https://github.com/alexis21o8/image/blob/main/leo.png?raw=true',  },
    {    'name': 'Libra',    'img': 'https://github.com/alexis21o8/image/blob/main/libra.png?raw=true',  },
    {    'name': 'Pisces',    'img': 'https://github.com/alexis21o8/image/blob/main/pisces.png?raw=true',  },
    {    'name': 'Sagittarius',    'img': 'https://github.com/alexis21o8/image/blob/main/sagittarius.png?raw=true',  },
    {    'name': 'Scorpio',    'img': 'https://github.com/alexis21o8/image/blob/main/scorpio.png?raw=true',  },
    {    'name': 'Taurus',    'img': 'https://github.com/alexis21o8/image/blob/main/taurus.png?raw=true',  },
    {    'name': 'Virgo',    'img': 'https://github.com/alexis21o8/image/blob/main/virgo.png?raw=true',  },
  ];

// Duplicate cardsArray to create a match for each card
var gameGrid = cardsArray.concat(cardsArray);
// Randomize game grid on each load
gameGrid.sort(function(){
    return 0.5 - Math.random();
})
// Grab the div with an id of game-board and assign to a variable game
var game = document.getElementById('game-board');
// Create a section element and assign it to variable grid
var grid = document.createElement('section');
// Give section element a class of gird
grid.setAttribute('class', 'grid');
// Append the grid section to the game-board div
game.appendChild(grid);

// Loop through each item in our cards array
for (i = 0; i < gameGrid.length; i++){
    // create a div element and assign to variable card
    var card = document.createElement('div');
    // apply a card class to that div
    card.classList.add('card');
    // set the data-name attribute of the div to the cardsArray name
    card.dataset.name = gameGrid[i].name;
    
    // Create front of card
    var front = document.createElement('div');
    front.classList.add('front');

    // Create back of card
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    // Append card to grid
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

var firstGuess = '';
var secondGuess = '';
// Set count to 0
var count = 0;
var previousTarget = null;
var delay = 1200;

// add match CSS
var match = function(){
    var selected = document.querySelectorAll('.selected');
    // loop through the array like object containing `selected` class
    for (i = 0; i < selected.length; i++){
        selected[i].classList.add('match');
    }
};

// Reset guesses after two attempts
var resetGuesses = function(){
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++){
        selected[i].classList.remove('selected');
    }
}

// add evenlistener to grid
grid.addEventListener('click', function(event){
    // Declare variable to target our clicked item
    var clicked = event.target;
    // Do not allow the grid section itself to be selected;
    // only select divs inside the grid
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')){
        return;
    }
    // We only want to add `selected` class if the current count is less than 2
    if (count < 2){
        count++;
        if (count === 1){
            // Assign first guess
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');            
        }
        else {
            // Assign second guess
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        // If both guesses are not empty
        if (firstGuess !== '' && secondGuess !== ''){
            // And the firstGuess matches secondGuess
            if (firstGuess === secondGuess){
                // Run the match function
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            }
            else {
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget = clicked;
    }
})