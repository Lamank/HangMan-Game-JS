'use strict';

const letterDiv = document.querySelector('.letter-div');
const hintButton = document.querySelector('.hint-btn');
const resetButton = document.querySelector('.reset-btn');
const hintDiv = document.querySelector('.hint-div');
const hintText = document.querySelector('.hint-txt');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');
const notif = document.querySelector('.notif');
const notifContent = document.querySelector('.notif-content');
const notifSpan = document.querySelector('.notif-span');
const playAgain = document.querySelector('.notif-btn');

let letters;
let lives = 10;

// secret words
const words = new Map([
  ['harry potter', 'a series of seven fantasy novels written by British author J. K. Rowling'],
  ['the lord of the rings', 'American animated fantasy film directed by Ralph Bakshi'],
  ['king arthur', ' historical adventure film directed by Antoine Fuqua and written by David Franzoni'],
  ['the hobbit', 'a film series consisting of three high fantasy adventure films directed by Peter Jackson'],
  ['the godfather', 'American epic crime film directed by Francis Ford Coppola'],
  ['avatar', 'American epic science fiction film directed, written, produced, and co-edited by James Cameron'],
  ['batman begins', 'As a young boy, Bruce Wayne watched in horror as his millionaire parents were slain in front of him'],
  ['the dark knight', 'superhero film directed, co-produced, and co-written by Christopher Nolan'],
  ['gladiator', 'epic historical drama film directed by Ridley Scott '],
  ['limitless', 'American science-fiction thriller film directed by Neil Burger'],
  ['the green mile', 'American fantasy drama film written and directed by Frank Darabont and based on Stephen Kings 1996 novel of the same name'],
  ['the matrix', ' science fiction action film written and directed by the Wachowskis.'],
  ['aquaman', 'American superhero film based on the DC Comics character of the same name'],
  ['the lion king', 'American animated musical drama film produced by Walt Disney Feature Animation'],
  ['alien', 'science fiction horror film directed by Ridley Scott and written by Dan Bannon'],
  ['the pianist','biographical war drama film produced and directed by Roman Polanski'],
  ['siren','an American fantasy drama television series that follows Ryn Fisher (played by Eline Powell)'],
  ['forrest gump', 'American comedy-drama film directed by Robert Zemeckis and written by Eric Roth.'],
  ['dolittle','American fantasy adventure film directed by Stephen Gaghan'],
  ['the lion woman',' Norwegian drama film directed by Vibeke Idsøe'],
  ['jumanji','American fantasy adventure comedy film directed by Jake Kasdan'],
  ['red notice','American action comedy film written, directed, and produced by Rawson Marshall Thurber.'],
  ['free guy','action comedy film directed and produced by Shawn Levy'],
  ['lucy','French science fiction action film written and directed by Luc Besson for his company EuropaCorp'],
  ['legend','biographical crime thriller film written and directed by American director Brian Helgeland'],
  ['merlin','a British fantasy-adventure drama television programme, loosely based on the Arthurian legends'],
  ['the maze runner','American dystopian science fiction film directed by Wes Ball, in his directorial debut, based on James Dashners 2009 novel of the same name'],
  ['now you see me','American heist thriller film directed by Louis Leterrier from a screenplay by Ed Solomon, Boaz Yakin, and Edward Ricourt and a story by Yakin and Ricourt'],
  ['the hunger games','film series is composed of science fiction dystopian adventure films'],
  ['venom','American superhero film featuring the Marvel Comics character of the same name'],
  ['five feet apart','The film was inspired by Claire Wineland, who suffered from cystic fibrosis.'],
  ['me before you','romantic drama film directed by Thea Sharrock in her directorial debut and adapted by English author Jojo Moyes'],
  ['spider-man','a superhero appearing in American comic books published by Marvel Comics'],
  ['joker','American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver.'],
  ['the witcher','a Polish-American fantasy drama streaming television series created by Lauren Schmidt Hissrich, based on the book series of the same name by Polish writer Andrzej Sapkowski'],
  ['cursed','an American fantasy drama streaming television series '],
  ['game of thrones','American fantasy drama television series created by David Benioff and D. B. Weiss for HBO'],
  ['the order', 'a horror drama streaming television series created by Dennis Heaton'],
  ['the legend of tarzan',' adventure film directed by David Yates.'],
  ['the chronicles of narnia','series of films is based on The Chronicles of Narnia, a series of novels by C. S. Lewis'],
  ['maleficient',' American dark fantasy adventure film directed by Robert Stromberg from a screenplay by Linda Woolverton'],
  ['beauty and the beast','American musical romantic fantasy film directed by Bill Condon from a screenplay by Stephen Chbosky and Evan Spiliotopoulos'],
  ['benjamin button','American fantasy romantic drama film directed by David Fincher'],
  ['pirates of the caribbean','a series of fantasy swashbuckler films produced by Jerry Bruckheimer and based on Walt Disneys theme park attraction of the same name'],
  ['titanic','American epic romance and disaster film directed, written, produced, and co-edited by James Cameron.'],
  ['a beautiful mind','a 2001 American biographical drama film based on the life of the American mathematician John Nash, a Nobel Laureate in Economics and Abel Prize winner'],
  ['sherlock holmes','a 2009 period mystery action film based on the character of the same name created by Sir Arthur Conan Doyle.'],
  ['the platform','a 2019 Spanish social science fiction-horror film directed by Galder Gaztelu-Urrutia.'],
  ['inception','2010 science fiction action film written and directed by Christopher Nolan, who also produced the film with Emma Thomas, his wife'],
  ['avengers','a series of American superhero films produced by Marvel Studios based on characters'],
  ['the pursuit of happyness','a 2006 American biographical drama film directed by Gabriele Muccino and starring Will Smith as Chris Gardner, a homeless salesman. '],
  ['life of pi','a 2012 adventure-drama film directed and produced by Ang Lee and written by David Magee.'],
  ['gravity','a 2013 science fiction thriller film directed by Alfonso Cuarón, who also co-wrote, co-edited, and produced the film.'],
  ['black panther','a 2018 American superhero film based on the Marvel Comics character of the same name. '],
  ['lady bird','a 2017 American coming-of-age comedy-drama film written and directed by Greta Gerwig in her solo directorial debut.'],
  ['chernobyl','a 2019 historical drama television miniseries that revolves around the disaster of 1986 and the cleanup efforts that followed.'],
  ['awake',' a 2007 American conspiracy thriller film written and directed by Joby Harold (in his directorial debut)'],
  ['the starling','a 2021 American comedy-drama film directed by Theodore Melfi and written by Matt Harris. '],

]);

const word_list = [...words.keys()];

const getRandomWord = (list) =>{
  return list[Math.floor(Math.random() * word_list.length)];
};

let select_word;

const gameStart = (state) => {
  wordDiv.innerHTML = '';
  if (state === 'start') {
    for (let i of 'abcdefghijklmnopqrstuvwxyz') {
      const html = `<button class="alpha">${i.toUpperCase()}</button>`;
      letterDiv.insertAdjacentHTML('beforeend', html);
    }
  } else if (state === 'reset') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notif.classList.add('hidden');
      lives = 10;
    });
  }
  select_word = getRandomWord(word_list);


  letters = document.querySelectorAll('.alpha');
  liveSpan.textContent = lives;

  let html = "";
  for (let i = 0; i < select_word.length; i++) {  
    if (select_word[i] === " ") {
         html = `<p class="word"> </p>`;
    }
    else if (select_word[i] === "-"){
        html = `<p class="word"> - </p>`;
    }
    else{
        html = `<p class="word">_</p>`;
    }
    wordDiv.insertAdjacentHTML('beforeend', html);
  }
}

gameStart('start');



const showNotif = (msg) => {
    notif.classList.remove('hidden');
    notifSpan.textContent = select_word;
    notifContent.textContent = `You ${msg}`;
}
const lostNotif = () =>{
  notif.style.backgroundColor = "brown";
  let gameOver = document.createElement("h2");
  gameOver.innerText = "Game Over!!";
  notif.replaceChild(gameOver, notif.childNodes[1]);
}
const decreaseLife = () => {
  lives--;
  console.log("lives: " + lives);
  liveSpan.textContent = lives;
  if (lives === 0) {
    lostNotif();
    showNotif("Lost!!");
  }
}

const getIndexes = (letter) => {
  let indexes = [];
  [...select_word].forEach((val, i) => {
    if (val === letter) {
      const index = i;
      indexes.push(index);
    }
  })
    console.log("index " + indexes);
  return indexes;
};

const checkWord = () => {
  let val = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '_') {
      val = false;
    }
  }
  return val;
}

const letterPress = function () {
  const letter = this.textContent.toLowerCase();

  if (select_word.includes(letter)) {
    const indexes_list = getIndexes(letter);
    indexes_list.forEach((val, i) => {
      wordDiv.children[val].textContent = this.textContent;
    });
    if (checkWord()) showNotif('won');
  } else {
    decreaseLife();
  }
  this.classList.add('disabled');
}

letters.forEach(btn => {
  btn.addEventListener('click', letterPress);
})

hintButton.addEventListener('click', function () {
  hintDiv.classList.remove('hidden');
  hintText.textContent = words.get(select_word);
})
console.log(words.get(select_word));
resetButton.addEventListener('click', function () {
  gameStart('reset');
})

playAgain.addEventListener('click', function () {
  gameStart('reset');
})
