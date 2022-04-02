

    //crée le tableau comprenant les mots du jeu

    let words =
    [
        'mauvais',
        'bourgeon',
        'conseils',
        'aigle',
        'chapelle',
        'fusillade',
        'surf',
        'femme',
        'vadrouille',
        'chair',
        'caissier',
        'ambassadeur',
        'oncle',
        'authentique',
        'cannibale',
        'force',
        'terminal',
        'mois',
        'intelligence',
        'formel',
    ]


let answer ='';
let maxWrong =4;
let mistakes = 0;
let fait =[];
let guessed = [];
let wordstatus = null;


function randomWord() {
  answer = words[Math.floor(Math.random() * words.length)];
}


//function pour créer les boutons auquels on attribue une class & id ------------------

function buttonLettre() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="buttons"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

//function pour masquer si la lettre n'est pas dans le mot
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    WordsFind();
    win();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    erreur();
    checkIfGameLost();
    UpdateHangmanImg();
  }
}

function UpdateHangmanImg() {
  document.getElementById('hangmanPic').src = '/assets/img/werewolf'+ mistakes + '.png';
}

function win() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function WordsFind() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function erreur() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = 'assets/img/Werewolf.png';

  randomWord();
  WordsFind();
  erreur();
  buttonLettre();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
buttonLettre();
WordsFind();