document.addEventListener('DOMContentLoaded', startGame)

function reloadGame(){
  initialize()
  startGame()
  return board
}

// Define your `board` object here!
function makeColumnArray(boardSide){
  var n=0
  var columnArray = []
  do {
    for (i=0; i<boardSide; i++){
      columnArray.push(i)
    }
    n++
  }
  while (n < boardSide)
  //console.log(columnArray)
  return columnArray
}

function makeRowArray(boardSide){
  var rowArray = makeColumnArray(boardSide).sort(function(a, b){return a-b})
  //console.log(rowArray)
  return rowArray
}


function makeBoard(boardSide){
  var anyBoard = {cells:[]}
  var columnArray = makeColumnArray(boardSide)
  var rowArray = makeRowArray(boardSide)
  for (i=0; i<(Math.pow(boardSide, 2)); i++){
      anyBoard.cells.push({
      col : columnArray[i],
      row : rowArray[i],
      isMarked : false,
      isMine : false,
      hidden : true
    })  
  }  
  console.log('this is the board ' + anyBoard)
  return anyBoard
}


//console.log('this is the length of board ' + board.length)


function makeIndexArray(anyBoard){
  var i = 0
  var indexArray = []
  //console.log("this is the length of board " + anyBoard.cells.length)
  do{
    indexArray.push(i)
    i++
  } while (i<anyBoard.cells.length)
  //console.log("this is index array " + indexArray)
  return indexArray
}

function addMines(anyBoard, numOfMines){
  var cellsIndexArray = makeIndexArray(anyBoard)
  i = 0
  do{
    randomMineIndex = Math.floor(Math.random() * (cellsIndexArray.length - i))
    mineIndex = (cellsIndexArray.splice(randomMineIndex, 1))
    anyBoard.cells[mineIndex].isMine = true
    i++
  }
  while (i < numOfMines)
  console.log("These are the remaining cells without mines " + cellsIndexArray)
}
var board;
function initialize(){
  board = makeBoard(6)
  addMines(board, 2)
}

function startGame () {
  console.log('starting game')
  initialize()
  board.cells.forEach(cell => cell.surroundingMines = countSurroundingMines(cell))
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
  document.getElementById('myButton').addEventListener('click', reloadGame)
  //document.getElementById('myButton').addEventListener('click', function(){document.location.reload(true)})
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function showButton(){
  document.getElementById('myButton').style.display = 'block'
}
//document.getElementById('myButton').addEventListener('click', startGame())
// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin (){
  if (board.cells.some(cell => cell.isMine === true && cell.isMarked !== true)){
    console.log('some mines are not marked')
    return
  }
  else if (board.cells.some(cell => cell.isMine === false && cell.hidden === true)){
    console.log('some cells without mines are still hidden')
    return
  }
  else {
    console.log("Winning!")
    lib.displayMessage('You win!')
    showButton()
  }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var surroundingCellsArray = lib.getSurroundingCells(cell.row, cell.col);
  var countMines = 0
  for (let i=0; i<surroundingCellsArray.length; i++){
    if (surroundingCellsArray[i].isMine == true){
      countMines ++
    }
    else {
      countMines = countMines
    }
  }
  return countMines
}
