
// To find Bestspot for 4x4
function bestSPOT4(){
    return MiniMax4(origBoard1,0, ai).index+9;
  }

function heuristic(board){
    var availSpots = emptySquares4();
    let ans='';
    for (var i = 0; i < availSpots.length; i++) {
        if(board[availSpots[i]] == '')
        {
        ans = board[availSpots[i]];
        break;
        }
    }
    if(ans!=''){
    if(ans=='X'){
        return {score:10};
    }
    else if(ans=='O'){
        return {score:-10};
    }
    }else {
        return {score:0};
    }
 
}


// Minimax algorithm for 4x4
function MiniMax4(board,depth, player) {
      let availSpots = emptySquares4();
      let moves = [];
      if (checkEndgame4(board, human)) {
          return {score: -10};
      } 
      else if (checkEndgame4(board, ai)) {
          return {score: 10};
      } 
      else if (availSpots.length === 0) {
          return {score: 0};
      }
    else if(depth==4){
       return heuristic(board);
     }

      for (let i = 0; i < availSpots.length; i++) {
          let move = {};
          move.index = board[availSpots[i]];
          board[availSpots[i]] = player;
          if (player == ai) {
              let result = MiniMax4(board,depth+1, human);
              move.score = result.score;
          }
          else {
              let result = MiniMax4(board,depth+1,ai);
              move.score = result.score;
          }
          board[availSpots[i]] = move.index;
          moves.push(move);
      }
  
      let bestMove;
      if(player === ai) {
          let bestScore = -Infinity;
          for(let i = 0; i < moves.length; i++) {
              if (moves[i].score > bestScore) {
                  bestScore = moves[i].score;
                  bestMove = i;
              }
          }
      } 
      else {
          let bestScore = Infinity;
          for(let i = 0; i < moves.length; i++) {
              if (moves[i].score < bestScore) {
                  bestScore = moves[i].score;
                  bestMove = i;
              }
          }
      }
      return moves[bestMove];
  }
  