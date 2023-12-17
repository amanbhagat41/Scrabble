/*
File: script.js
GUI Assignment: HW5: Scrabble
Create a scrabble game with one board line using jquery
Aman Bhagat, Umass Lowell Computer Science, aman_bhagat@student.uml.edu
Copyright (c) 2023 by Aman.  All rights reserved.  May be freely copied or 
excerpted for educational purposes with credit to the author. 
updated by AB on Nov 29 2:25 pm
*/
var scrabbleTiles = { //Gets all the pieces and there values amounts and the images of the tiles
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

function getHand() { //starts the game with 7 random tiles 
  let tilesNeeded = 0;
  while (tilesNeeded < handSize) {
    var availableTiles = scrabbleTiles.pieces.filter((tile) =>
      canUseTile(tile.letter)
    );
    if (availableTiles.length === 0) {
      break; // breaks when there are no more tiles to use
    }

    var num = Math.floor(Math.random() * availableTiles.length);
    let tile = availableTiles[num];
    let letter = tile.letter;
    let imgElement = $(
      '<img id="test"  src="graphics_data/Scrabble_Tiles/' + tile.image + '">' //https://stackoverflow.com/questions/58550701/how-do-i-display-a-random-image-using-jquery-and-javascript used this to help implement
    ).attr("class", letter);
    imgElement.appendTo(".tiles li:not(:has(img)):first");
    tilesNeeded++;
    tile.amount--; //removes the amount of the tiles so that eventually tiles run out
  }
}

$("#submitWord").on("click", function () { //submit the word
  let wordScore = 0;

  $(".onTheboard img").each(function () {
    const tileLetter = $(this).attr("class"); // Get the letter of the current tile
    const tile = scrabbleTiles.pieces.find( //finds what tile is what
      (tile) => tile.letter === tileLetter
    );

    let tileValue = tile.value; //gets the value of the tile
    if (doubleLetter) { //if the tile is on doubleletter
      tileValue *= 2;
    }
    wordScore += tileValue; //add the tilevalue to the wordscore
  });
  if (doubleWord) { //if title on doubleword it doubles the wordscore
    wordScore = wordScore + wordScore;
  }

  totalScore += wordScore; // Update the total score
  document.getElementById("wordScore").innerHTML = "Word Score: " + wordScore;
  document.getElementById("totalScore").innerHTML =
    "Total Score: " + totalScore;
  $(".onTheboard").empty();
  tilesPlaces = [];
  let currentHandSize = $(".tiles li img").filter(function () {
    return !$(this).children().length; // Count the number of empty slots in the hand
  }).length;
  // console.log(currentHandSize)
  if (currentHandSize < 7) { //if the hand size is smaller than 7 pick up for tiles
    let tilesNeeded = 7 - currentHandSize;

    for (let i = 0; i < tilesNeeded; i++) {
      let availableTiles = scrabbleTiles.pieces.filter((tile) =>
        canUseTile(tile.letter)
      );

      if (availableTiles.length === 0) {
        break; // breaks when there are no more tiles to use
      }

      let num = Math.floor(Math.random() * availableTiles.length); //gets a random number
      let tile = availableTiles[num];

      let letter = tile.letter;
      let imgElement = $(
        '<img id="test" src="graphics_data/Scrabble_Tiles/' + tile.image + '">'
      ).attr("class", letter); //makes the tile
      imgElement.appendTo(".tiles li:not(:has(img)):first"); //inserts the tile into the first li without a image
      tile.amount--;
    }
  }
});

// $("#fillHand").on("click", function () {
//   let currentHandSize = $(".tiles li img").filter(function() {
//     return !$(this).children().length; // Count the number of empty slots in the hand
//   }).length;
//   console.log(currentHandSize)
//   if (currentHandSize < 7) {
//     let tilesNeeded = 7 - currentHandSize;

//     for (let i = 0; i < tilesNeeded; i++) {
//       let availableTiles = scrabbleTiles.pieces.filter(tile => canUseTile(tile.letter));

//       if (availableTiles.length === 0) {
//         break; // No available tiles left to draw
//       }

//       let num = Math.floor(Math.random() * availableTiles.length);
//       let tile = availableTiles[num];

//       let letter = tile.letter;
//       let imgElement = $('<img id="test" src="graphics_data/Scrabble_Tiles/' + tile.image + '">').attr('class', letter);
//       imgElement.appendTo(".tiles li:not(:has(img)):first");
//       tile.amount--;
//     }
//   }
// });
$("#restartGame").on("click", function () { //restarts the game
  location.reload();
});

$(".tile").draggable({ //makes the tiles draggable
  scope: "demoBox",
  revertDuration: 100,
  start: function (event, ui) {
    currentIndex = parseInt(this.id.slice(5), 10);
    // console.log(currentIndex)
    //Reset
    $(".tile").draggable("option", "revert", true);
  },
});

let doubleLetter = false;
let doubleWord = false;
tilesPlaces = [];
let currentIndex = 0;
//for droppable and draggable i used this to help implement https://codepen.io/jyloo/pen/GjbmLm
$(
  "#board1, #board2, #board3, #board4, #board5, #board6, #board7, .tiles"
).droppable({ //makes the tiles dropabble onto the board and back to the rack
  scope: "demoBox",
  over: function (event, ui) {
    $(this).addClass("highlight-droppable"); 
  },
  out: function (event, ui) {
    $(this).removeClass("highlight-droppable"); 
  },
  drop: function (event, ui) {
    $(this).addClass("onTheboard");
    currentIndex = parseInt(this.id.slice(5), 10); //finds where the tile is on the board
    if (currentIndex === 6) { //if tile is on board number 6 doubleLetter
      doubleLetter = true;
    }
    if (currentIndex === 2) {//if tile is on board number 2 doubleWord
      doubleWord = true;
    }
    // console.log(doubleWord)
    // console.log(currentIndex)
    if (tilesPlaces.length === 0) { //titles can be placed onto eachother
      $(".tile").draggable("option", "revert", false);
      ui.draggable.detach().css({ top: -15, left: 2 }).appendTo($(this));
      tilesPlaces.push(currentIndex);
    } else {
      let nextTo = false; 
      for (let i = 0; i < tilesPlaces.length; i++) {
        if (Math.abs(tilesPlaces[i] - currentIndex) === 1) {
          nextTo = true;
          break;
        }
      }
      if (nextTo) { //if tiles are next to each other they can be placed
        $(".tile").draggable("option", "revert", false);
        ui.draggable.detach().css({ top: -15, left: 2 }).appendTo($(this));
        tilesPlaces.push(currentIndex);
      }
    }
  },
});

$(".tiles").droppable({ //makes the rack droppable
  scope: "demoBox",
  over: function (event, ui) {
    $(this).addClass("highlight-droppable");
  },
  out: function (event, ui) {
    $(this).removeClass("highlight-droppable");
  },
  drop: function (event, ui) {
    $(this).removeClass("onTheboard");
    // Check if there's already a tile in the slot
    $("#word").append(scrabbleTiles.pieces.letter);
    // var area = $(this).find("#board").html();
    // var box = $(ui.draggable).html();
    $(".tile").draggable("option", "revert", false);

    //Realign item
    $(ui.draggable).detach().css({ top: -130, left: 100 }).appendTo(this);
  },
});

function canUseTile(tileLetter) { //finds out how many tiles are left from that amount
  var tile = scrabbleTiles.pieces.find((tile) => tile.letter === tileLetter);
  if (tile.amount > 0) {
    return true;
  }
  return false;
}
