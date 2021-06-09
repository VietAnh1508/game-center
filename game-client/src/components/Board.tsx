import React from 'react';
import styled from 'styled-components';

import Square from './Square';
import Piece from '../pieces/Piece';

interface ChessBoardProps {
    boardSize: number;
    squareSize: number;
}

const ChessBoard = styled.div<ChessBoardProps>`
    display: grid;
    grid-template-columns: repeat(8, ${(p) => p.squareSize}px);
    grid-template-rows: repeat(8, ${(p) => p.squareSize}px);
    width: ${(p) => p.boardSize}px;
    height: ${(p) => p.boardSize}px;
`;

interface Props {
    boardSize: number;
    squareSize: number;
    squares: (Piece | null)[][];
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
}

const Board = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const SQUARE_SIZE = props.boardSize / 8;

    let squares = [];

    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < 8; j++) {
            const squareColor = (i + j) % 2 === 0 ? 'dark' : 'light',
                piece = props.squares[i][j];

            squares.push(
                <Square
                    key={`${i}${j}`}
                    size={SQUARE_SIZE}
                    color={squareColor}
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
