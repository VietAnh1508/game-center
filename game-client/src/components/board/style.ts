import styled from 'styled-components';

interface ChessBoardProps {
    boardSize: number;
    squareSize: number;
}

export const ChessBoard = styled.div<ChessBoardProps>`
    grid-column-start: 1;
    justify-self: center;
    display: grid;
    grid-template-columns: repeat(8, ${(p) => p.squareSize}px);
    grid-template-rows: repeat(8, ${(p) => p.squareSize}px);
    width: ${(p) => p.boardSize}px;
    height: ${(p) => p.boardSize}px;
`;
