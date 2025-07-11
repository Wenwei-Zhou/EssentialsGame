// import { useState } from "react"

// const initalGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
// ]

export default function GameBorard({ onSelectSquare, board }) {    // activePlayerSymbol = activeplayer,轮到哪个玩家，X或者O

    // let gameBoard = initalGameBoard;

    // for(const turn of turns)
    // {
    //     const { square, player } = turn;
    //     const { row, col } = square;

    //     gameBoard[row][col] = player;
    // }
    // const [gameBorard, setGameBoard] = useState(initalGameBoard);

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prev) => {
    //         const updatedBoard = [...prev.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();

    //     // prev 是 gameBoard 的旧状态（一个 3x3 的二维数组）
    //     // 你想更新其中一个格子：updatedBoard[rowIndex][colIndex] = activePlayerSymbol
    //     // 但你不能直接修改原始 prev，因为 React 的状态必须是不可变的

    //     // 外层 map()：遍历整个棋盘（每一行）
    //     // 每一行是一个数组（innerArray）
    //     // 用 [...] 克隆这一行，生成新的数组
    // }

    return (
        <ol id="game-board">
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => 
                    (<li key={colIndex}>
                        <button 
                            onClick={() => onSelectSquare(rowIndex, colIndex)}
                            disabled={ playerSymbol !== null }
                            >
                            {playerSymbol}
                        </button>
                    </li>)
                )}
            </ol>
            </li>
        )}
        {/* initalGameBoard.map(...)	遍历每一行（row） */}
        {/* row.map(...)	遍历每一列（单元格） */}
        {/* <li key={rowIndex}>	外层 <li> 表示一整行，必须带 key */}
        {/* <button>{playerSymbol}</button>	每个格子里的按钮，显示当前的玩家符号 */}
        </ol>
    )
}