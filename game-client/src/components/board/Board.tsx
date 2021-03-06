import React, { ReactElement } from 'react';

import { ChessBoard } from './style';

import Square from '../square/Square';
import Piece, { Coordinate, PieceColor } from '../../pieces/Piece';

interface Props {
    boardSize: number;
    squareSize: number;
    squares: (Piece | null)[][];
    highlightedSquares: Array<Coordinate>;
    hintSquares: Array<Coordinate>;
    playerSelectedColor: PieceColor;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
}

const Board = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const SQUARE_SIZE = props.boardSize / 8;

    let squares: Array<ReactElement> = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const isShade = (i + j) % 2 !== 0,
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

            const xLabel = [PieceColor.WHITE, PieceColor.RANDOM].includes(
                props.playerSelectedColor
            )
                ? String.fromCharCode(j + 97)
                : String.fromCharCode(104 - j);

            const yLabel = [PieceColor.WHITE, PieceColor.RANDOM].includes(
                props.playerSelectedColor
            )
                ? (8 - i).toString()
                : (i + 1).toString();

            squares.push(
                <Square
                    key={`${i}${j}`}
                    size={SQUARE_SIZE}
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
