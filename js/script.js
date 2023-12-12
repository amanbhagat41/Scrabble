/*
File: script.js
GUI Assignment: 
Aman Bhagat, Umass Lowell Computer Science, aman_bhagat@student.uml.edu
Copyright (c) 2021 by Aman.  All rights reserved.  May be freely copied or 
excerpted for educational purposes with credit to the author. 
updated by AB on Nov 29 2:25 pm
*/
var scrabbleTiles = {
  pieces: [
    { letter: "A", value: 1, amount: 9, image: "Scrabble_Tile_A.jpg" },
    { letter: "B", value: 3, amount: 2, image: "Scrabble_Tile_B.jpg" },
    { letter: "C", value: 3, amount: 2, image: "Scrabble_Tile_C.jpg" },
    { letter: "D", value: 2, amount: 4, image: "Scrabble_Tile_D.jpg" },
    { letter: "E", value: 1, amount: 12, image: "Scrabble_Tile_E.jpg" },
    { letter: "F", value: 4, amount: 2, image: "Scrabble_Tile_F.jpg" },
    { letter: "G", value: 2, amount: 3, image: "Scrabble_Tile_G.jpg" },
    { letter: "H", value: 4, amount: 2, image: "Scrabble_Tile_H.jpg" },
    { letter: "I", value: 1, amount: 9, image: "Scrabble_Tile_I.jpg" },
    { letter: "J", value: 8, amount: 1, image: "Scrabble_Tile_J.jpg" },
    { letter: "K", value: 5, amount: 1, image: "Scrabble_Tile_K.jpg" },
    { letter: "L", value: 1, amount: 4, image: "Scrabble_Tile_L.jpg" },
    { letter: "M", value: 3, amount: 2, image: "Scrabble_Tile_M.jpg" },
    { letter: "N", value: 1, amount: 5, image: "Scrabble_Tile_N.jpg" },
    { letter: "O", value: 1, amount: 8, image: "Scrabble_Tile_O.jpg" },
    { letter: "P", value: 3, amount: 2, image: "Scrabble_Tile_P.jpg" },
    { letter: "Q", value: 10, amount: 1, image: "Scrabble_Tile_Q.jpg" },
    { letter: "R", value: 1, amount: 6, image: "Scrabble_Tile_R.jpg" },
    { letter: "S", value: 1, amount: 4, image: "Scrabble_Tile_S.jpg" },
    { letter: "T", value: 1, amount: 6, image: "Scrabble_Tile_T.jpg" },
    { letter: "U", value: 1, amount: 4, image: "Scrabble_Tile_U.jpg" },
    { letter: "V", value: 4, amount: 2, image: "Scrabble_Tile_V.jpg" },
    { letter: "W", value: 4, amount: 2, image: "Scrabble_Tile_W.jpg" },
    { letter: "X", value: 8, amount: 1, image: "Scrabble_Tile_X.jpg" },
    { letter: "Y", value: 4, amount: 2, image: "Scrabble_Tile_Y.jpg" },
    { letter: "Z", value: 10, amount: 1, image: "Scrabble_Tile_Z.jpg" },
    { letter: "_", value: 0, amount: 2, image: "Scrabble_Tile_Blank.jpg" },
  ],
  creator: "Ramon Meza",
};
let handSize = 7;
let totalScore = 0;
$(document).ready(function () {
  
  getHand();
});

function getHand() {
  let tilesNeeded = 0;
  while (tilesNeeded < handSize) {
    var availableTiles = scrabbleTiles.pieces.filter(tile => canUseTile(tile.letter));
    if (availableTiles.length === 0) {
      break; // No available tiles left to draw
    }

    var num = Math.floor(Math.random() * availableTiles.length);
    let tile = availableTiles[num];
    let letter = tile.letter;
    let imgElement = $('<img id="test"  src="graphics_data/Scrabble_Tiles/' + tile.image + '">').attr('class', letter);
    imgElement.appendTo(".tiles li:not(:has(img)):first");
    tilesNeeded++;
    tile.amount--;
  }
}


$("#submitWord").on("click", function () {
  let wordScore = 0;
  
  $(".onTheboard img").each(function () {
    const tileLetter = $(this).attr('class'); // Get the letter of the current tile
    const tile = scrabbleTiles.pieces.find(tile => tile.letter === tileLetter);

    let tileValue = tile.value;
    if(doubleLetter){
      
    }
    wordScore += tileValue;
    if(doubleWord){
      wordScore*=2;
    }
  });

  totalScore += wordScore; // Update the total score
  document.getElementById("wordScore").innerHTML = "Word Score: " + wordScore;
  document.getElementById("totalScore").innerHTML = "Total Score: " + totalScore;
  $( ".onTheboard" ).empty();
  tilesPlaces = []; 
});


$("#fillHand").on("click", function () { 
  let currentHandSize = $(".tiles li img").filter(function() {
    return !$(this).children().length; // Count the number of empty slots in the hand
  }).length;
  console.log(currentHandSize)
  if (currentHandSize < 7) {
    let tilesNeeded = 7 - currentHandSize;

    for (let i = 0; i < tilesNeeded; i++) {
      let availableTiles = scrabbleTiles.pieces.filter(tile => canUseTile(tile.letter));

      if (availableTiles.length === 0) {
        break; // No available tiles left to draw
      }

      let randomIndex = Math.floor(Math.random() * availableTiles.length);
      let tile = availableTiles[randomIndex];

      let letter = tile.letter;
      let imgElement = $('<img id="test" src="graphics_data/Scrabble_Tiles/' + tile.image + '">').attr('class', letter);
      imgElement.appendTo(".tiles li:not(:has(img)):first");
      tile.amount--;
    }
  }
});
$("#restartGame").on("click", function () {
  location.reload();
});

$(".tile").draggable({
  scope: "demoBox",
  revertDuration: 100,
  start: function (event, ui) {
    
    //Reset
    $(".tile").draggable(
      "option",
      "revert",
      true
    );
  },
});

let doubleLetter = false
let doubleWord =false
tilesPlaces = []
let currentIndex = 0;
$( "#board1, #board2, #board3, #board4, #board5, #board6, #board7, .tiles").droppable({
  scope: "demoBox",
  over: function(event, ui) {
    $(this).addClass('highlight-droppable'); // Apply a CSS class to highlight the drop area
  },
  out: function(event, ui) {
    $(this).removeClass('highlight-droppable'); // Remove the highlighting CSS class when draggable leaves the drop area
  },
  drop: function (event, ui) {
    $(this).addClass('onTheboard');
    currentIndex = parseInt(this.id.slice(5), 10);
    if(currentIndex === 6){
      doubleLetter =true;
    }
    if(currentIndex === 2){
      doubleWord =true;
    }
    console.log(doubleWord)
    // console.log(currentIndex)
    if (tilesPlaces.length === 0) {
      $(".tile").draggable("option", "revert", false);
      ui.draggable.detach().css({ top: -15, left: 2 }).appendTo($(this));
      tilesPlaces.push(currentIndex);
    } else {
      let adjacent = false;
      for (let i = 0; i < tilesPlaces.length; i++) {
        if (Math.abs(tilesPlaces[i] - currentIndex) === 1) {
          adjacent = true;
          break;
        }
      }
      if (adjacent) {
        $(".tile").draggable("option", "revert", false);
        ui.draggable.detach().css({ top: -15, left: 2 }).appendTo($(this));
        tilesPlaces.push(currentIndex);
      }
    }
  }
});




$( ".tiles").droppable({
  scope: "demoBox",
  over: function(event, ui) {
    $(this).addClass('highlight-droppable'); // Apply a CSS class to highlight the drop area
  },
  out: function(event, ui) {
    $(this).removeClass('highlight-droppable'); // Remove the highlighting CSS class when draggable leaves the drop area
  },
  drop: function (event, ui) {
    $(this).removeClass('onTheboard');
    // Check if there's already a tile in the slot
      $("#word").append(scrabbleTiles.pieces.letter);
      // var area = $(this).find("#board").html();
      // var box = $(ui.draggable).html();
      $(".tile").draggable(
        "option",
        "revert",
        false
      );

      //Realign item
      $(ui.draggable).detach().css({ top: -15, left: 2 }).appendTo(this);
    
  }
});

function canUseTile(tileLetter) {
  var tile = scrabbleTiles.pieces.find((tile) => tile.letter === tileLetter);
  if (tile.amount > 0) {
    return true;
  }
  return false;
}
