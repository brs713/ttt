


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
  let move = 0;
  let gameOver = 0;
  let catsPath;

  // gameOver = function(outcome) {
  //   if (outcome === 'win')
  //   gameOver = 1;
  // };

  checkGameOver = function () {
    if (gameOver === 'win') {
      console.log('Game Over, computer wins.')
      $('button').prop('disabled', true);

      //GameWinning
      // ul  uc  ur
      // ml  mc  mr
      // bl  bc  br

//      if there's 3 of any given letter, game is won
//      if mc & all letters different


//  "Oooohhh...I dunno about that one; I think you're in danger of losing here."

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
    case 0: //first move
      switch (square) {
        case 'll':
        case 'lm':    //imminent win
        case 'ml':    //imminent win
          aiPlay('ur');
          break;
        case 'mr':    //imminent win
        case 'um':    //imminent win
        case 'ur':
          aiPlay('ll');
          break;
        case 'lr':
          aiPlay('ul');
          break;
        case 'ul':
          aiPlay('lr');
          break;
      }
      break;

    case 1: //second move
      if (checkButton('lm') && checkButton('lr') || checkButton('ml') && checkButton('ul')) {
  			aiPlay('ll');
        gameOver = 'win';
  		}

      else if (checkButton('lm') && checkButton('lr') || checkButton('ml') && checkButton('ul')) {
  			aiPlay('ll');
        gameOver = 'win';
  		}

  		else if (checkButton('ll') && checkButton('lm') || checkButton('mr') && checkButton('ur')) {
  			aiPlay('lr');
        //imminent win
  		}

  		else if (checkButton('ll') && checkButton('ml') || checkButton('um') && checkButton('ur')) {
  			aiPlay('ul');
        //imminent win
  		}

  		else if (checkButton('lr') && checkButton('mr') || checkButton('ul') && checkButton('um')) {
  			aiPlay('ur');
        gameOver = 'win';
  		}

  		else if (checkButton('ll') && checkButton('lr')) {
  			aiPlay('lm');
  			catsPath = true;
  		}

  		else if (checkButton('ll') && checkButton('ul')) {
  			aiPlay('ml');
  			catsPath = true;
  		}

  		else if (checkButton('lr') && checkButton('ur')) {
  			aiPlay('mr');
  			catsPath = true;
  		}

  		else {//if (checkButton('ul') && checkButton('ur'))
  			aiPlay('um');
  			catsPath = true;
  		}
      break;

    case 2:
    if (catsPath) {

      if (whoseSquare('lm') == 'X' && square != 'um') {
        aiPlay('um')
        catsPath = false;
      }

      else if (whoseSquare('ml') == 'X' && square != 'mr') {
        aiPlay('mr');
        catsPath = false;
      }

      else if (whoseSquare('mr') == 'X' && square != 'ml') {
        aiPlay('ml');
        catsPath = false;
      }

      else if (whoseSquare('um') == 'X' && square != 'lm') {
        aiPlay('lm');
        catsPath = false;
      }


      // copied from PRIORITY RESPONSE

      else if (whoseSquare('ll') == 'O' && whoseSquare('lr') == 'O') {
        aiPlay('lm');
        catsPath = true;
      }

      else if (whoseSquare('ll') == 'O' && whoseSquare('ul') == 'O') {
        aiPlay('ml');
        catsPath = true;
      }

      else if (whoseSquare('lr') == 'O' && whoseSquare('ur') == 'O') {
        aiPlay('mr');
        catsPath = true;
      }

      else if (whoseSquare('ul') == 'O' && whoseSquare('ur') == 'O') {
        aiPlay('um');
        catsPath = true;
      }

      else {

        // determine response
        if (whoseSquare('lm') == 'O' && whoseSquare('ll') == 'O') {
          if (square != 'mr') {
            aiPlay('mr');
          }

          else {
            aiPlay('ul');
          }
        }

        else if (whoseSquare('ml') == 'O' && whoseSquare('ll') == 'O') {
          if (square != 'lr') {
            aiPlay('lr');
          }

          else {
            aiPlay('um');
          }
        }

        else if (whoseSquare('mr') == 'O' && whoseSquare('ur') == 'O') {
          if (square != 'ul') {
            aiPlay('ul');
          }

          else {
            aiPlay('lm');
          }
        }

        else { // (whoseSquare('um') == 'O' && whoseSquare('ur') == 'O')
          if (square != 'ml') {
            aiPlay('ml');
          }

          else {
            aiPlay('lr');
          }
        }
      }
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

aiPlay("mm");

$('button').mouseenter(function() {
  $(this).html("O");
});

$('button').mouseleave(function() {
  $(this).html("");
});

$('button').click(function() {
  $(this).html("O")
  .prop('disabled', true);
  let square = $(this).parent().attr('id');
  aiRespond(move, square);
  console.log("isX is " + isX(square));
  console.log("isO is " + isO(square));
  checkGameOver();
  move++;
});


});
