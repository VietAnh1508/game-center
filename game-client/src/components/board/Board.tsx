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

    const drawSquares = () => {
        let squares: Array<ReactElement> = [];

        switch (props.playerSelectedColor) {
            case PieceColor.WHITE:
            case PieceColor.RANDOM:
                for (let i = 7; i >= 0; i--) {
                    drawColums(i, i, squares);
                }
                break;
            case PieceColor.BLACK:
                for (let i = 0, shadeIndex = 7; i < 8; i++, shadeIndex--) {
                    drawColums(i, shadeIndex, squares);
                }
                break;
        }

        return squares;
    };

    const drawColums = (
        row: number,
        shadeIndex: number,
        squares: Array<ReactElement>
    ) => {
        for (let j = 0; j < 8; j++) {
            const isShade = (shadeIndex + j) % 2 === 0, // the piece's position can be changed, but the board has to stay the same
                piece = props.squares[row][j];

            let isHighlight = false;
            for (let position of props.highlightedSquares) {
                if (position.x === j && position.y === row) {
                    isHighlight = true;
                    break;
                }
            }

            let isHint = false;
            for (let position of props.hintSquares) {
                if (position.x === j && position.y === row) {
                    isHint = true;
                    break;
                }
            }

            squares.push(
                <Square
                    key={`${row}${j}`}
                    size={SQUARE_SIZE}
                    isShade={isShade}
                    isHighlight={isHighlight}
                    isHint={isHint}
                    piece={piece}
                />
            );
        }
    };

    return (
        <ChessBoard
            ref={ref}
            boardSize={props.boardSize}
            squareSize={props.squareSize}
            onMouseDown={(e) => props.onMouseDown(e)}
            onMouseMove={(e) => props.onMouseMove(e)}
            onMouseUp={(e) => props.onMouseUp(e)}
        >
            {drawSquares()}
        </ChessBoard>
    );
});

export default Board;
