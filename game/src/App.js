import './App.css';
import Player from './TicTacToe/Player';
import GameBorard from './TicTacToe/GameBoard';
import Log from './TicTacToe/Log';
import GameOver from './TicTacToe/GameOver';
import { WINNING_COMBINATIONS } from './Winning_Combinations';
import { useState } from 'react';

const initalGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;

  // 作用：轮流判断当前是 X 还是 O 落子。
  // 逻辑：只要上一回合是 X，这回合就轮到 O，反之亦然。
}

function App() {

  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  })
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initalGameBoard.map(array => [...array])];
  // initalGameBoard.map(array => [...array])
  // 用 map 遍历每一行（每一行是一个子数组）
  // 用 [...array] 克隆每一行，生成一个新的数组
  // 结果是：新的二维数组，行数组也是新的
  // ✔ [...]
  // 最外层的 [...] 是为了将这些新行组合成一个新的 gameBoard 数组

  for(const turn of gameTurns)
  {
      const { square, player } = turn; // 解构每一项 turn 中的两个字段：square：包含 row 和 col。player：当前落子的玩家（'X' 或 'O'）
      const { row, col } = square; // 进一步解构出坐标值，例如：row = 1, col = 2

      gameBoard[row][col] = player;
      // 更新棋盘对应位置的值
      // 例：gameBoard[1][2] = 'X'，表示在第 2 行第 3 列落下了 X
  }
  // gameBoard状态构建
  // 根据历史落子记录（gameTurns）重建当前棋盘 gameBoard 的状态。

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) 
    {
      winner = players[firstSquareSymbol];
    }

    // WINNING_COMBINATIONS 这是一个 二维数组，用于存储所有赢棋的“位置组合”。每一项是一个包含 3 个格子的数组，而每个格子是一个对象 { row, column }。
    // for loop 把所有有棋的位置都和WINNING_COMBINATIONS每一个赢的组合核对一遍，如果和WINNING_COMBINATIONS的其中一个组合对上了，就赢了

    // 你写的判断逻辑 不关心是哪种组合（行、列、对角），它只是：
    // 取出任意一组三连格子的位置
    // 然后判断这三格是否由同一玩家占据
    // 只要你提供了所有可能的三连组合，它就能检查任何赢法！
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns((prevTurns) => {
      
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex}, player: currentPlayer}, 
        ...prevTurns,
      ];

      return updatedTurns;
    });
    // 是在构造一个新的数组 updatedTurns，记录每一步游戏的操作。
    // {
    //   square: {
    //     row: 0,    // 落子的行号
    //     col: 2     // 落子的列号
    //   },
    //   player: 'X' // 当前落子玩家
    // }
    // ...prevTurns 这是展开运算符，它会把之前的所有操作（历史记录）展开成一个数组的一部分。
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers =>{
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className='highlight-player'>
          <Player 
          initalName="Player 1" 
          symbol="X" 
          isActive={activePlayer === 'X'} 
          onChangeName={handlePlayerNameChange}
          />
          <Player initalName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}

        <GameBorard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
