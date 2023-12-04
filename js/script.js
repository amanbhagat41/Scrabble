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
// var scrabbleImg = ["Scrabble_Tile_A.jpg","Scrabble_Tile_B.jpg" ,"Scrabble_Tile_C.jpg", "Scrabble_Tile_D.jpg","Scrabble_Tile_E.jpg","Scrabble_Tile_F.jpg",
// "Scrabble_Tile_G.jpg","Scrabble_Tile_H.jpg","Scrabble_Tile_I.jpg", "Scrabble_Tile_J.jpg","Scrabble_Tile_K.jpg","Scrabble_Tile_L.jpg", "Scrabble_Tile_M.jpg",
// "Scrabble_Tile_N.jpg", "Scrabble_Tile_O.jpg","Scrabble_Tile_P.jpg","Scrabble_Tile_Q.jpg","Scrabble_Tile_R.jpg","Scrabble_Tile_S.jpg","Scrabble_Tile_T.jpg",
// "Scrabble_Tile_U.jpg","Scrabble_Tile_V.jpg","Scrabble_Tile_W.jpg","Scrabble_Tile_X.jpg","Scrabble_Tile_Y.jpg","Scrabble_Tile_Z.jpg","Scrabble_Tile_Blank.jpg"]
let totalScore = 0;
$(document).ready(function () {
  getHand();
});

function getHand() {
  let iter = 0;
  var offset = 1;
  while (iter < handSize) {
    var availableTiles = scrabbleTiles.pieces.filter(tile => canUseTile(tile.letter));
    if (availableTiles.length === 0) {
      break; // No available tiles left to draw
    }

    var num = Math.floor(Math.random() * availableTiles.length);
    let tile = availableTiles[num];
    let letter = tile.letter;
    let imgElement = $('<img class="zin" alt="leter" src="graphics_data/Scrabble_Tiles/' + tile.image + '">').attr('alt', letter);
    imgElement.appendTo(".tile" + offset);
    iter++;
    offset++;
    tile.amount--;
  }
}
// function getHand() {
//   let iter = 0;
//   var offset = 1;
//   while (true) {
//     if (iter < 7) {
//       var size = Object.keys(scrabbleTiles.pieces).length;
//       var num = Math.floor(Math.random() * size);
//       let tile = scrabbleTiles.pieces[num];
//       let letter = tile.letter
//       if (canUseTile(tile.letter)) {
//         let imgElement = $('<img class="zin" alt = "leter" src="graphics_data/Scrabble_Tiles/' +tile.image +'">').attr('alt', letter);
//         imgElement.appendTo(".tile" + offset);
//         // $("#word").append(tile.letter);
//         iter++;
//         offset++;
//         tile.amount--;
//       }
//       console.log(iter);
//     } else {
//       break;
//     }
//   }
// }

$("#submit").on("click", function () {
  $(".hand img").remove();
  // $( "#board li" ).remove();
  getHand();
});
// $(function() {
//   jQuery("#draggable").draggable({

// });
// });
$(".tile1, .tile2, .tile3,.tile4,.tile5,.tile6,.tile7").draggable({
  scope: "demoBox",
  revertDuration: 100,
  start: function (event, ui) {
    //Reset
    $(".tile1, .tile2, .tile3,.tile4,.tile5,.tile6,.tile7").draggable(
      "option",
      "revert",
      true
    );
  },
});
$( "#board1, #board2, #board3, #board4, #board5, #board6, #board7, .tiles").droppable({
  scope: "demoBox",
  drop: function (event, ui) {
    // Check if there's already a tile in the slot
    if ($(this).children().length === 0) {
      $("#word").append(scrabbleTiles.pieces.letter);
      // var area = $(this).find("#board").html();
      // var box = $(ui.draggable).html();
      $(".tile1, .tile2, .tile3,.tile4,.tile5,.tile6,.tile7").draggable(
        "option",
        "revert",
        false
      );

      //Realign item
      $(ui.draggable).detach().css({ top: -15, left: 2 }).appendTo(this);
    } else {
      // Handle if a tile is already present in the slot
      // You can show a message or perform other actions here
      console.log("Slot already filled!");
    }
  }
});
$( ".tiles").droppable({
  scope: "demoBox",
  drop: function (event, ui) {
    // Check if there's already a tile in the slot

      $("#word").append(scrabbleTiles.pieces.letter);
      // var area = $(this).find("#board").html();
      // var box = $(ui.draggable).html();
      $(".tile1, .tile2, .tile3,.tile4,.tile5,.tile6,.tile7").draggable(
        "option",
        "revert",
        false
      );

      //Realign item
      $(ui.draggable).detach().css({ top: -15, left: 2 }).appendTo(this);
    
  }
});
// $( "#board1, #board2, #board3, #board4, #board5, #board6, #board7, .tiles").droppable({
//   scope: "demoBox",
//   drop: function (event, ui) {
//     $("#word").append(scrabbleTiles.pieces.letter);
//     var area = $(this).find("#board").html();
//     var box = $(ui.draggable).html();
//     $(".tile1, .tile2, .tile3,.tile4,.tile5,.tile6,.tile7").draggable(
//       "option",
//       "revert",
//       false
//     );

//     //Realign item
//     $(ui.draggable).detach().css({ top: -15, left: 2 }).appendTo(this);
//   },
// });

function canUseTile(tileLetter) {
  var tile = scrabbleTiles.pieces.find((tile) => tile.letter === tileLetter);
  if (tile.amount > 0) {
    return true;
  }
  return false;
}
