


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


  checkGameOver = function () {
    /*
    Board:
      tl  tc  tr
      ml  mc  mr
      bl  bc  br

    The game is either won or tied.  Tie = catspath

    GameWinning Conditions: (game is won if...)
      -...there's 3 of any given letter
        e.g.  (3m's or 3c's represent center row or column victory)
        (this handles all row & column victories)
      -x has captured opposing corners
    */

    /* MAKE A COLLECTION OF ALL THE SPACES OCCUPIED BY 'X' */
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


    /* CHECK DIAGONALS */
    //1st diagonal-
    if ((xMoves.indexOf('tl') !== -1) && (xMoves.indexOf('br') !== -1)) { aiWon(['tl','mc','br']); }
    //2nd diagonal-
    if ((xMoves.indexOf('bl') !== -1) && (xMoves.indexOf('tr') !== -1)) { aiWon(['bl','mc','tr']); }


    /* COUNT THE LETTERS AND CHECK IF ANY APPEAR 3 TIMES */
    // Convert to a new array of letters only:
    let xLetters = xMoves.reduce(function(letter1, letter2) {
      return letter1.concat(letter2);
    });

    // Make an object to store [] of {letter:count}
    let counts = {};

    // Check each letter in xLetters:
    for (let i = 0; i < xLetters.length ; ++i) {
      let ltr = xLetters.charAt(i);

      // Get the current letter count:
      let count = counts[ltr];

      // Update the letter count - (if it already exists), add 1 : else it's now 1
      counts[ltr] = (count) ? count + 1 : 1;
    }

    // Check the letter counts...
    for (ltr in counts) {
      // ...if there are ever 3, game over.
      if (counts[ltr] === 3) { aiWon(ltr); }
    }

    console.log("Didn't win, gameWon= " + gameWon);

    // See if all spaces have been played.
    let allPlayed = true;
    let squares = ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br'];
    for (square in squares) {
      if (isOpen(squares[square])) {
        console.log(isOpen(square));
        allPlayed = false;
      }
    }


    console.log('squares is ' + squares);

    console.log('allPlayed is ' + allPlayed);



    if (!gameWon && allPlayed) {

      $('#gameDone').empty()
          .removeClass('hidden');

      let gifTag = $('<img id="gif" src="" hidden="true"/>');
      let pTag = $('<p id="feedback" hidden="true"></p>');
      let catMsgTag = $("<p id='cat'>CAT'S GAME!</p>");

      gifTag.addClass('center');
      pTag.addClass('center');
      catMsgTag.addClass('center');

      $('#gameDone').append(gifTag);
      $('#gameDone').append(pTag);
      $('#gameDone').append(catMsgTag);
      fetchAndDisplayGif();

      // Show the "NewGame" button.
      $('#newgame').removeClass('hidden');













    }



  };


  // Game over, man!
  aiWon = function(winSet) {
    /*
    winSet passes in the winnin combination
      -it can be passed in as an array of 3 elements or a single letter
      -if it's passed in as a letter, we need to figure out what it is,
        then convert it to a 3-element array.
    */

    // The game has been won (not tied).
    gameWon = true;

    // Save the input.
    let trio = winSet;

    // If it's a letter, process it.
    if (!$.isArray(winSet)) {

      // Determines what characters have to be added, then .map()s the new array
      if (winSet === 't' || winSet === 'm' || winSet === 'b') {
        trio = ['l', 'c', 'r'];
        trio = trio.map(function (index) {
          return winSet.concat(index);
        });
      }
      else {
        trio = ['t', 'm', 'b'];
        trio = trio.map(function (index) {
          return index.concat(winSet);
        });
      }
    }

    // Outline the winning combination.
    $('td button').each(function() {
      let id = $(this).parent().attr('id');
      if (trio.indexOf(id) === -1) {
        if (isX(id)) {
          $(this).css('color', 'black');
        }
        else {
          $(this).css('color', 'grey');
        }
      }
    });

    // Disable all buttons.
    $('td button').prop('disabled', true);


    // Show a message.
    $('#gameDone').removeClass('hidden')
        .empty();
    let msg = $('<p>thing</p>');
    msg.html('COMPUTER WINS.');
    $('#gameDone').append(msg);
    console.log(msg);


    // Show the "NewGame" button.
    $('#newgame').removeClass('hidden');

  }


  // Carries out the tasks needed to update the board after the ai chooses its move.
  aiPlay = function(square) {
    $('#' + square + ' button')
    .prop('disabled', true)
    .css('color', 'blue')
    .html("X");
  };


  // The logic that determines what moves the ai makes.
  aiRespond = function(move, square) {
    switch (move) {

      case 1: // 1st ai move:
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


      case 2: // 2nd ai move:
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
        }

        else if (isO('bl') && isO('tl')) {
          aiPlay('ml');
        }

        else if (isO('br') && isO('tr')) {
          aiPlay('mr');
        }

        else if (isO('tl') && isO('tr')) {
          aiPlay('tc');
        }

        else if (isO('bl')) {
          aiPlay('tr');
        }

        else if (isO('tr')) {
          aiPlay('bl');
        }
        else { //nothing
        }
        break;

      // Next ai moves
      case 3:
      case 4:
      case 5:

      // Advanced logic used to play out the remainder of the game:
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


  /* ADVANCED LOGIC FUNCTIONS */
  // tryToWin()
  //      - priority #1:  if the computer has a winning move, take it
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

    // Single Paths - vertical center & horizontal middle
    else if (isX('tc') && isOpen('bc')) { aiPlay('bc'); return; }
    else if (isX('bc') && isOpen('tc')) { aiPlay('tc'); return; }
    else if (isX('ml') && isOpen('mr')) { aiPlay('mr'); return; }
    else if (isX('mr') && isOpen('ml')) { aiPlay('ml'); return; }

    else { return 'failed'}
  }


  // avoidLosing()
  //      - priority #2: if the ai is in danger of losing, block
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


  // anyPlay()
  //      - lowest priority - just make a semi-random move
  anyPlay = function() {
    console.log('begin anyPlay...')

    // If there's still a chance to win (2 open & middle or center spaces), try.
    if (isOpen('ml') && isOpen('mr')) {  // horizontal middle row can still win
      aiPlay('ml');
      return;
    }

    if (isOpen('tc') && isOpen('bc')) {  // vertical center column can still win
      aiPlay('tc');
      return;
    }

    // Otherwise, play the first open space.
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


  /* HELPER FUNCTIONS
    A collection of boolean functions that return information about
    the state of the game board.
  */

  // square belongs to 'X'
  isX = function(buttonId) {
    return isMySquare(buttonId, 'X');
  }

  // square belongs to 'O'
  isO = function(buttonId) {
    return isMySquare(buttonId, 'O')
  }

  // used by isX and isO to learn what character the square displays
  isMySquare = function(buttonId, player) {
    return $('#' + buttonId + ' button').html() == player;
  }

  // is this square open?
  isOpen = function(buttonId) {
    return !$('#' + buttonId + ' button').prop('disabled');
  }


  /* *** GAMEPLAY *** */

  // Start a move counter:
  let move = 1;

  // Set the game state:
  let gameWon = false;

  // Opening move:
  aiPlay("mc");

  // Displays an 'O' in the square if it's available:
  $('td button').mouseenter(function() {
    $(this).css('color','red')
        .html("O");
  });
  $('td button').mouseleave(function() {
    $(this).html("");
  });

  // When the user makes a move:
  $('td button').click(function() {
    $(this).html("O")
    .prop('disabled', true);
    let square = $(this).parent().attr('id');
    aiRespond(move, square);
    checkGameOver();
    move++;
  });

  $('#newgame button').click(function() {

    move = 1;
    gameWon = false;

    $('td button').each(function() {
      $(this).prop('disabled', false)
          .html("");
      $('#newgame').addClass('hidden');
      $('#gameDone').addClass('hidden');
      aiPlay('mc');
    });

  });

});


fetchAndDisplayGif = function() {

    // This prevents the form submission from doing what it normally does:
    //   send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a
    //   normal request and we definitely don't want the page to refresh.
    // event.preventDefault();

    // configure a few parameters to attach to our request
    var params = {
        api_key: "dc6zaTOxFJmzC",
        tag : "cute kitten christmas"
    };
    console.log('params.tag', params.tag);

    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random",
        data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.

            // jQuery passes us the `response` variable, a regular javascript
            //   object created from the JSON the server gave us
            console.log("we received a response!");
            console.log(response);
//            console.log(response.image_url);
            // TODO
            // 1. set the source attribute of our image to the image_url of the GIF
            $('#gif').attr('src', response.data.image_url);
            // 2. hide the feedback message and display the image
            $('#feedback').attr('hidden', 'true');
//            console.log('end of success', response.data.image_url)
            setGifLoadedStatus(true);
        },
        error: function() {
            // if something went wrong, the code in here will execute instead
            //   of the success function

            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });

    // give the user a "Loading..." message while they wait
    $('#feedback').attr('hidden', false);
    $('#feedback').text('Loading...');

}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}

//Errors :
//adjacent, then adjacent
