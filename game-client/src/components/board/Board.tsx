import React, { ReactElement, useContext } from 'react';

import { ChessBoard } from './style';

import Square from '../square/Square';
import { PieceColor } from '../../pieces/Piece';
import { GameContext } from '../../context/game-context';

interface Props {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
}

const Board = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const [state] = useContext(GameContext);

    let squares: Array<ReactElement> = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const isShade = (i + j) % 2 !== 0,
                piece = state.squares[i][j];

            let isHighlight = false;

            for (let position of state.highlightedSquares) {
                if (position.x === j && position.y === i) {
                    isHighlight = true;
                    break;
                }
            }

            let isHint = false;
            for (let position of state.hintSquares) {
                if (position.x === j && position.y === i) {
                    isHint = true;
                    break;
                }
            }

            const xLabel =
                state.playerSelectedColor === PieceColor.WHITE
                    ? String.fromCharCode(j + 97)
                    : String.fromCharCode(104 - j);

            const yLabel =
                state.playerSelectedColor === PieceColor.WHITE
                    ? (8 - i).toString()
                    : (i + 1).toString();

            squares.push(
                <Square
                    key={`${i}${j}`}
                    size={state.squareSize}
                    isShade={isShade}
                    isHighlight={isHighlight}
                    isHint={isHint}
                    piece={piece}
                    xCoordinateLabel={i === 7 ? xLabel : null}
                    yCoordinateLabel={j === 0 ? yLabel : null}
                />
            );
        }
    }

    return (
        <ChessBoard
            data-testid='chess-board'
            ref={ref}
            boardSize={state.boardSize}
            squareSize={state.squareSize}
            onMouseDown={(e) => props.onMouseDown(e)}
            onMouseMove={(e) => props.onMouseMove(e)}
            onMouseUp={(e) => props.onMouseUp(e)}
        >
            {squares}
        </ChessBoard>
    );
});

export default Board;
