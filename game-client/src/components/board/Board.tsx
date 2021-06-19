import React from 'react';

import { ChessBoard } from './style';

import Square from '../square/Square';
import Piece, { Coordinate } from '../../pieces/Piece';

interface Props {
    boardSize: number;
    squareSize: number;
    squares: (Piece | null)[][];
    highlightedSquares: Array<Coordinate>;
    hintSquares: Array<Coordinate>;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
}

const Board = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const SQUARE_SIZE = props.boardSize / 8;

    let squares = [];

    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < 8; j++) {
            const isShade = (i + j) % 2 === 0,
                piece = props.squares[i][j];

            let isHighlight = false;
            for (let position of props.highlightedSquares) {
                if (position.x === j && position.y === i) {
                    isHighlight = true;
                    break;
                }
            }

            let isHint = false;
            for (let position of props.hintSquares) {
                if (position.x === j && position.y === i) {
                    isHint = true;
                    break;
                }
            }

            squares.push(
                <Square
                    key={`${i}${j}`}
                    size={SQUARE_SIZE}
                    isShade={isShade}
                    isHighlight={isHighlight}
                    isHint={isHint}
                    piece={piece}
                />
            );
        }
    }

    return (
        <ChessBoard
            ref={ref}
            boardSize={props.boardSize}
            squareSize={props.squareSize}
            onMouseDown={(e) => props.onMouseDown(e)}
            onMouseMove={(e) => props.onMouseMove(e)}
            onMouseUp={(e) => props.onMouseUp(e)}
        >
            {squares}
        </ChessBoard>
    );
});

export default Board;
