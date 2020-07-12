let origBoard;
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]


let colorX = "#FF9933";
let colorO = "#50BFE6";
let symb_color;

let turn = "X"
const cells = document.querySelectorAll('.cell');

let playtype;
let human="X";
let ai="O";
let blocksPressed=0;
let player1,player2,tie;
let gameWon;
let guided=0;
let timelineMode = 0;
let highlightNo;
let gameEnd=false;

//ViewTimeline3x3 variables..............................................................................
let playerMoves;
let timer;
let k;
let symbol='X';

//viewTimeline3x3 function.................................................................................
function viewTimeline3x3(){
  symb_color = colorX;
  timelineMode = 1;//switching on timelineMode so the scores are not upated
  k=0;
  symbol='X';
  document.getElementById("pve3x3").style.backgroundColor="aquamarine";
  document.getElementById("timeline3").style.backgroundColor="#FF0000";
  document.getElementById("pvp3x3").style.backgroundColor="aquamarine";
  for(let i=0;i < cells.length;i++){
    cells[i].innerText='';
    cells[i].style.removeProperty('background-color');
    
   }
   timer = setInterval(showMoves3x3, 500);
   console.log(playerMoves);
   
}

function showMoves3x3(){
    cells[playerMoves[k]].style.color = symb_color;
    cells[playerMoves[k]].innerHTML=symbol;
    if(symbol=='X'){
        symbol='O';
        symb_color = colorO;
    }else{
        symbol='X';
        symb_color = colorX;
    }
    k++;
    if(k==playerMoves.length)
    {
        console.log("Gameover");
        completes();
        if(checkTie()){
            console.log("You ended up in Tie");
        }
        else{
            for(let index of winCombos[gameWon.index]){
                document.getElementById(index).style.backgroundColor="#9C2542";
            }
            console.log("Won");
        }
        document.getElementById("timeline3").style.backgroundColor="aquamarine";
        return;
    }
}

function completes(){
    clearInterval(timer);
    timer = null;
}

//P v P guided function...............................................................................
let guidep1=0;
let guidep2=0;
function guidedp1(){
  guidep1 = 1;
  document.getElementById("guidedp1").innerText= "Guided (P1) : ON";
  document.getElementById("guidedp1").style.backgroundColor="#3AA655";
  console.log(guidep1);
}
function guidedp2(){
  guidep2 = 1;
  document.getElementById("guidedp2").innerText= "Guided (P2) : ON";
  document.getElementById("guidedp2").style.backgroundColor="#3AA655";
  console.log(guidep2);
}

//guidedOnClick function...............................................................................
function guided3x3(){
  guided = 1;
  document.getElementById("guided3x3").innerText= "Guided : ON";
  document.getElementById("guided3x3").style.backgroundColor="#3AA655";
  console.log("Guided ON");
}

//updateScore function.................................................................................
function updateScore(){
  if(playtype == 2)
    document.getElementById("score3").innerHTML="Player1: "+player1+"    Tie: "+tie+"  Player2: "+player2;
  else
    document.getElementById("score3").innerHTML="Player1: "+player1+"    Tie: "+tie+"  Computer: "+player2;
}

//twoPlayer3x3 function.................................................................................
function twoPlayers3x3(){
  playtype=2;
  depthLimit = Infinity;
  document.getElementById("guided3x3").style.display="none";
  document.getElementById("guidedp1").style.display="block";
  document.getElementById("guidedp2").style.display="block";
  document.getElementById("pve3x3").style.backgroundColor="aquamarine";
  document.getElementById("pvp3x3").style.backgroundColor="#FF0000";
  document.getElementById("timeline3").style.backgroundColor="aquamarine";
  document.getElementById("depth").style.display="none";
  document.getElementById("d1").style.backgroundColor="aquamarine";
	document.getElementById("d2").style.backgroundColor="aquamarine";
	document.getElementById("d3").style.backgroundColor="aquamarine";
	document.getElementById("d4").style.backgroundColor="aquamarine";
  document.getElementById("unlimited").style.backgroundColor="#FF0000";
  document.getElementById("row9").style.height="0px";
  document.getElementById("pvp3x3").innerHTML = "Reset Scores";
  document.getElementById("pve3x3").innerHTML = "P v E";
  player1=0;
  player2=0;
  tie=0;
  updateScore();
  startGame3();
}

//aiPlayer3x3 function.................................................................................
function aiPlayer3x3(){
  playtype=1;
  document.getElementById("guided3x3").style.display="initial";
  document.getElementById("guidedp1").style.display="none";
  document.getElementById("guidedp2").style.display="none";
  document.getElementById("pvp3x3").style.backgroundColor="aquamarine";
  document.getElementById("pve3x3").style.backgroundColor="#FF0000";
  document.getElementById("timeline3").style.backgroundColor="aquamarine";
  document.getElementById("depth").style.display="block";
  document.getElementById("row9").style.height="100px";
  document.getElementById("pve3x3").innerHTML = "Reset Scores";
  document.getElementById("pvp3x3").innerHTML = "P v P";
  player1=0;
  player2=0;
  tie=0;
  updateScore();
  startGame3();
}

//startGame3 function.................................................................................
function startGame3(){
  symb_color = colorX;
  gameEnd = false;
  timelineMode = 0;
  blocksPressed = 0;
  turn="X";
  playerMoves=[];
  document.getElementById("timeline3").style.display = "none"; //hidding view timeline
  guided = 0;
  guidep1=0;
  guidep2=0;
  document.getElementById("guided3x3").style.backgroundColor="red";
  document.getElementById("guided3x3").innerText= "Guided : OFF";
  console.log("Guided OFF");
  document.getElementById("guidedp1").innerText= "Guided(P1) : OFF";
  document.getElementById("guidedp1").style.backgroundColor="aquamarine";
  document.getElementById("guidedp2").innerText= "Guided(P2) : OFF";
  document.getElementById("guidedp2").style.backgroundColor="aquamarine";

  origBoard = Array.from(Array(9).keys());
  for(let i=0;i < cells.length;i++){
      cells[i].innerText='';
      cells[i].style.removeProperty('background-color');
      cells[i].addEventListener('click',turnClick,false);
  }
}

//highlight function.................................................................................
function highlight(squareID,move){
  let color = "#5DADEC";
  if(move == "X")
    color = "#FF7A00";
  highlightNo = squareID;
  console.log("Highlighted : "+ squareID);
  document.getElementById(squareID).style.backgroundColor=color;
}

function dehighlight(){
  document.getElementById(highlightNo).style.backgroundColor=null;
}

//turnClick function.................................................................................
function turnClick(square){
  if(blocksPressed>0 && (guided == 1 || guidep2==1))
    dehighlight();
  else if(blocksPressed>1 && guidep1==1)
    dehighlight();
  console.log(origBoard);

  if(playtype==2){
    click(square.target.id,turn);
    checkTie();
    if(turn == 'X') {
        turn="O";
        symb_color = colorO;
        if(!gameEnd){
          if(guidep2 == 1){
            highlight(bestSPOT3("O"),turn);}
        }
    }
    else{
        turn="X";
        symb_color = colorX;
        if(!gameEnd){
          if(guidep1 == 1 && blocksPressed>1){
            highlight(bestSPOT3("X"),turn);}
        }
    }
   
  }

  else{
    symb_color = colorX;
    click(square.target.id,human);
    checkTie();
    if(!gameEnd){
      symb_color = colorO;
      click(bestSPOT3("O"),ai);
    }
    if(!gameEnd){
      if(guided == 1)
        highlight(bestSPOT3("X"),turn);
    }
  }
}

//click function.................................................................................
function click(squareID,player){
    blocksPressed++;
    console.log(player+" pressed "+squareID);
    origBoard[squareID] = player;
    playerMoves.push(squareID);     //adding into playerMoves array
    document.getElementById(squareID).style.color = symb_color;
    document.getElementById(squareID).innerText = player;
    document.getElementById(squareID).cursor= "not-allowed";
    cells[squareID].removeEventListener('click',turnClick,false);
    gameWon = checkEndgame(origBoard,player);
    if(gameWon) gameOver(gameWon);
}

//checkEndgame function.................................................................................
function checkEndgame(board, player){
    let plays = board.reduce((a,e,i) => (e == player) ? a.concat(i) : a,[]);
    let gameWon = null;
    for(let [index,win] of winCombos.entries()){
        if(win.every(elem => plays.indexOf(elem)>-1)){
            gameWon = {index:index ,player:player};
            break;
        }
    }
    return gameWon;
}

//gameOver function.................................................................................
function gameOver(gameWon){
  for(let index of winCombos[gameWon.index]){
      document.getElementById(index).style.backgroundColor="#9C2542";
  }
  console.log(gameWon.player+" Won the game");
  for( let i=0;i<cells.length;i++ ){
      cells[i].removeEventListener('click',turnClick,false);
  }
  if(timelineMode == 0){
    if(gameWon.player == "X")
      player1++;
    else
      player2++;
    updateScore();
  }
  gameEnd = true;
  document.getElementById("timeline3").style.display = "block";// displaying view timeline
  blocksPressed = -1;
}

//emptySquares function.................................................................................
function emptySquares(){
  return origBoard.filter(s => typeof s=='number');
}

//checkTie function.................................................................................
function checkTie(){
  console.log("Tie Check = "+ (blocksPressed > 8));
  if((blocksPressed > 8)){
    for( let i=0;i<cells.length;i++ ){
      document.getElementById(i).style.backgroundColor="#00755E";
    }
    if(timelineMode == 0){
      tie++;
      updateScore();
    }
    document.getElementById("timeline3").style.display = "block";// displaying view timeline
    gameEnd = true;
  }
  return (blocksPressed > 8);
}