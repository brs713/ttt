


$(document).ready(function() {


  //Draw the board.

  //Receive opponent's move & redraw.

  //Response1 & redraw;

  //Opponent2 & redraw;

  //Response2, check for victory & redraw;

  //Opponent3

  //Response3, check for victory & redraw;

  //OpponentFinal

  //ResponseFinal, check for victory & redraw.

  //get gif

  //hide gameboard div

  //display gif div

  //change "I give up button" to new game button
  let move = 1;
  let gameOver = 0;
  let catsPath;

  checkGameOver = function () {

    //GameWinning
    // ul  uc  ur
    // ml  mc  mr
    // bl  bc  br

    // if there's 3 of any given letter, game is won
    // if mc & all letters different

    // create an empty string
    let xMoves = [];

    // parse all squares
    $('td button').each(function() {

      // if it's an x
      if ($(this).html() == 'X') {

        // add the id to the array
        xMoves.push($(this).parent().attr('id'));
      }
    });

    // check diagonals
    //1st diag:
    if ((xMoves.indexOf('tl') !== -1) && (xMoves.indexOf('br') !== -1)) { aiWon(); }
    //2nd diag:
    if ((xMoves.indexOf('bl') !== -1) && (xMoves.indexOf('tr') !== -1)) { aiWon(); }

    //process to convert to a new array of letters only
    let xLetters = xMoves.reduce(function(letter1, letter2) {
      return letter1.concat(letter2);
    });

    // make an object to store [] of {letter:count}
    let counts = {};

    // check each letter in xLetters.
    for (let i = 0; i < xLetters.length ; ++i) {
      let ltr = xLetters.charAt(i);

      // get the current letter count
      let count = counts[ltr];

      // update the letter count - (if it already exists), add 1 : else it's now 1
      counts[ltr] = (count) ? count + 1 : 1;

    }

    for (ltr in counts) {
      // if there are ever 3, game over.
      if (counts[ltr] === 3) { aiWon(); }
    }
  };

  aiPlay = function(square) {
    $('#' + square + ' button')
    .prop('disabled', true)
    .css('color', 'blue')
    .html("X");
  };

  aiRespond = function(move, square) {
    switch (move) {

      case 1:
      // 1st computer response
      if (isO('bc') || isO('ml') || isO('bl')) {
        aiPlay('tr');
      }

      if (isO('mr') || isO('tc') || isO('tr')) {
        aiPlay('bl');
      }

      if (isO('br')) {
        aiPlay('tl');
      }

      if (isO('tl')) {
        aiPlay('br');
      }
      break;


      case 2:
      // determine computer's 2nd response
      // PRIORITY RESPONSE - computer is in a potentially losing scenario
      //		- computer only has 1 option for a successful block
      if ((isO('bc') && isO('br')) || (isO('ml') && isO('tl')) || (isO('tl') && isO('mr')) || (isO('br') && isO('tc'))) {
        aiPlay('bl');
      }

      else if ((isO('bl') && isO('bc')) || (isO('mr') && isO('tr')) || (isO('tr') && isO('ml')) || (isO('bl') && isO('tc'))) {
        aiPlay('br');
      }

      else if ((isO('bl') && isO('ml')) || (isO('tc') && isO('tr')) || (isO('bl') && isO('mr')) || (isO('tr') && isO('bc'))) {
        aiPlay('tl');
      }

      else if ((isO('br') && isO('mr')) || (isO('tl') && isO('tc')) || (isO('br') && isO('ml')) || (isO('tl') && isO('bc'))) {
        aiPlay('tr');
      }

      else if (isO('bl') && isO('br')) {
        aiPlay('bc');
        catsPath = true;
      }

      else if (isO('bl') && isO('tl')) {
        aiPlay('ml');
        catsPath = true;
      }

      else if (isO('br') && isO('tr')) {
        aiPlay('mr');
        catsPath = true;
      }

      else if (isO('tl') && isO('tr')) {
        aiPlay('tc');
        catsPath = true;
      } // end PRIORITY RESPONSES

      else if (isO('bl')) {
        aiPlay('tr');
        gameOver = true;
      }

      else if (isO('tr')) {
        aiPlay('bl');
        gameOver = true;
      }
      else {//nothing
      }
      break;


      case 3:

      case 4:

      case 5:


      if (tryToWin() === 'failed') {
        // console.log("tryToWin failed.")
        if (avoidLosing() === 'failed') {
          // console.log("avoidLosing failed.")
          anyPlay();
        }
      }
      break;
    }
  }

  tryToWin = function() {
    console.log("begin tryToWin...");
    // Corners
    if (isX('bl') && isX('br')) {
      if (isOpen('bc')) { aiPlay('bc'); }
      else if (isOpen('tl')) { aiPlay('tl'); }
      else if (isOpen('tr')) { aiPlay('tr'); }
      else { return 'failed'; }
      return;
    }

    else if (isX('tl') && isX('tr')) {
      if (isOpen('tc')) { aiPlay('tc'); }
      else if (isOpen('bl')) { aiPlay('bl'); }
      else if (isOpen('br')) { aiPlay('br'); }
      else { return 'failed'; }
      return;
    }

    else if (isX('tl') && isX('bl')) {
      if (isOpen('ml')) { aiPlay('ml'); }
      else if (isOpen('tr')) { aiPlay('tr'); }
      else if (isOpen('br')) { aiPlay('br'); }
      else { return 'failed'; }
      return;
    }

    else if (isX('tr') && isX('br')) {
      if (isOpen('mr')) { aiPlay('mr'); }
      else if (isOpen('tl')) { aiPlay('tl'); }
      else if (isOpen('bl')) { aiPlay('bl'); }
      else { return 'failed'; }
      return;
    }

    // Corner & Adjacent
    else if (isX('tl') && isX('tc')) {
      if (isOpen('tr')) { aiPlay('tr'); }
      else if (isOpen('br')) { aiPlay('br'); }
      else if (isOpen('bc')) { aiPlay('bc'); }
      else { return 'failed'; }
      return;
    }

    else if (isX('tr') && isX('tc')) {
      if (isOpen('tl')) { aiPlay('tl'); }
      else if (isOpen('bl')) { aiPlay('bl'); }
      else if (isOpen('bc')) { aiPlay('bc'); }
      else { return 'failed'; }
      return;
    }

    else if (isX('bl') && isX('bc')) {
      if (isOpen('br')) { aiPlay('br'); }
      else if (isOpen('tr')) { aiPlay('tr'); }
      else if (isOpen('tc')) { aiPlay('tc'); }
      else { return 'failed'; }
      return;
    }

    else if (isX('br') && isX('bc')) {
      if (isOpen('bl')) { aiPlay('bl'); }
      else if (isOpen('tl')) { aiPlay('tl'); }
      else if (isOpen('tc')) { aiPlay('tc'); }
      else { return 'failed'; }
      return;
    }

    else if (isX('tl') && isX('ml')) {
      if (isOpen('bl')) { aiPlay('bl'); }
      else if (isOpen('br')) { aiPlay('br'); }
      else if (isOpen('mr')) { aiPlay('mr'); }
      else { return 'failed'; }
      return;
    }

    else if (isX('bl') && isX('ml')) {
      if (isOpen('tl')) { aiPlay('tl'); }
      else if (isOpen('tr')) { aiPlay('tr'); }
      else if (isOpen('mr')) { aiPlay('mr'); }
      else { return 'failed'; }
      return;
    }

    else if (isX('tr') && isX('mr')) {
      if (isOpen('br')) { aiPlay('br'); }
      else if (isOpen('bl')) { aiPlay('bl'); }
      else if (isOpen('ml')) { aiPlay('bl'); }
      else { return 'failed'; }
      return;
    }

    else if (isX('br') && isX('mr')) {
      if (isOpen('tr')) { aiPlay('tr'); }
      else if (isOpen('tl')) { aiPlay('tl'); }
      else if (isOpen('ml')) { aiPlay('ml'); }
      else { return 'failed'; }
      return;
    }

    // Single Paths
    if (isX('tc') && isOpen('bc')) { aiPlay('bc'); return; }
    if (isX('bc') && isOpen('tc')) { aiPlay('tc'); return; }
    if (isX('ml') && isOpen('mr')) { aiPlay('mr'); return; }
    if (isX('mr') && isOpen('ml')) { aiPlay('ml'); return; }
    // if (isX('') && isOpen('')) { aiPlay(''); }


    else { return 'failed'}
  }

  avoidLosing = function() {
    console.log("begin avoidLosing...")
    // Corners
    if (isO('bl') && isO('br')) {
      if (isOpen('bc')) { aiPlay('bc'); }
      else { return 'failed'; }
      return;
    }

    else if (isO('tl') && isO('tr')) {
      if (isOpen('tc')) { aiPlay('tc'); }
      else { return 'failed'; }
      return;
    }

    else if (isO('tl') && isO('bl')) {
      if (isOpen('ml')) { aiPlay('ml'); }
      else { return 'failed'; }
      return;
    }

    else if (isO('tr') && isO('br')) {
      if (isOpen('mr')) { aiPlay('mr'); }
      else { return 'failed'; }
      return;
    }


    // Corner & Adjacent
    else if (isO('tl') && isO('tm')) {
      if (isOpen('tr')) { aiPlay('tr'); }
      else { return 'failed'; }
      return;
    }

    else if (isO('tr') && isO('tm')) {
      if (isOpen('tl')) { aiPlay('tl'); }
      else { return 'failed'; }
      return;
    }

    else if (isO('bl') && isO('bm')) {
      if (isOpen('br')) { aiPlay('br'); }
      else { return 'failed'; }
      return;
    }

    else if (isO('br') && isO('bm')) {
      if (isOpen('bl')) { aiPlay('bl'); }
      else { return 'failed'; }
      return;
    }

    else if (isO('tl') && isO('ml')) {
      if (isOpen('bl')) { aiPlay('bl'); }
      else { return 'failed'; }
      return;
    }

    else if (isO('bl') && isO('ml')) {
      if (isOpen('tl')) { aiPlay('tl'); }
      else { return 'failed'; }
      return;
    }

    else if (isO('tr') && isO('mr')) {
      if (isOpen('br')) { aiPlay('br'); }
      else { return 'failed'; }
      return;
    }

    else if (isO('br') && isO('mr')) {
      if (isOpen('tr')) { aiPlay('tr'); }
      else { return 'failed'; }
      return;
    }

    else { return 'failed'; }
  }

  anyPlay = function() {
    console.log('begin anyPlay...')

    // if there's still a chance to win (2 open & middle or center spaces), try.
    // horizontal middle row can still win
    if (isOpen('ml') && isOpen('mr')) {
      aiPlay('ml');
      return;
    }
    // vertical center column can still win
    if (isOpen('tc') && isOpen('bc')) {
      aiPlay('tc');
      return;
    }

    // otherwise, play the first open space.
    let squares = [];
    $('td button').each(function() {
      let square = $(this).parent().attr('id');
      return squares.push(square);
    });

    for (square in squares) {
      if (isOpen(squares[square])) {
        aiPlay(squares[square]);
        return;
      }
    }
  }

  checkButton = function(buttonId) {
    console.log(buttonId + ' button is ' + $('#' + buttonId + ' button').prop('disabled'));
    return $('#' + buttonId + ' button').prop('disabled');
  }

  isX = function(buttonId) {
    return isMySquare(buttonId, 'X');
  }

  isO = function(buttonId) {
    return isMySquare(buttonId, 'O')
  }

  isMySquare = function(buttonId, player) {
    return $('#' + buttonId + ' button').html() == player;
  }

  isOpen = function(buttonId) {
    return !$('#' + buttonId + ' button').prop('disabled');
  }

  // Opening move:
  aiPlay("mc");

  $('button').mouseenter(function() {
    $(this).html("O");
  });

  $('button').mouseleave(function() {
    $(this).html("");
  });

  // Whenever a button is clicked:
  $('button').click(function() {
    $(this).html("O")
    .prop('disabled', true);
    let square = $(this).parent().attr('id');
    aiRespond(move, square);
    checkGameOver();
    move++;
  });

  aiWon = function() {
    $('td button').prop('disabled', true);
  }

});
