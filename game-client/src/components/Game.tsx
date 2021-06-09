import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { initialiseChessBoard } from '../helpers/helper';
import Piece from '../pieces/Piece';
import Board from './Board';

export interface Coordinate {
    x: number;
    y: number;
}

const Container = styled.div`
    display: grid;
    place-content: center;
    height: 100vh;
    background-color: #51504d;
`;

interface Props {}

const Game: React.FunctionComponent<Props> = () => {
    const [boardSize] = useState<number>(560);
    const [squareSize] = useState<number>(boardSize / 8);
    const [squares, setSquares] =
        useState<(Piece | null)[][]>(initialiseChessBoard);
    const [activePieceCoordinate, setActivePieceCoordinate] =
        useState<Coordinate | null>(null);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    let chessBoardEl = useRef<HTMLDivElement>(null);

    const grabPiece = (e: React.MouseEvent): void => {
        const element = e.target as HTMLElement;
        const chessBoard = chessBoardEl.current;

        if (element.classList.contains('chess-piece') && chessBoard) {
            const mousePosition: Coordinate = {
                x: e.clientX,
                y: e.clientY
            };

            updateSelectedPieceCoordinate(mousePosition, chessBoard);

            element.style.position = 'absolute';

            element.style.left = `${mousePosition.x - squareSize / 2}px`;
            element.style.top = `${mousePosition.y - squareSize / 2}px`;

            setActivePiece(element);
        }
    };

    const updateSelectedPieceCoordinate = (
        mousePosition: Coordinate,
        chessBoard: HTMLDivElement
    ) => {
        let coordinateX = Math.floor(
            (mousePosition.x - chessBoard.offsetLeft) / squareSize
        );
        let coordinateY = Math.abs(
            Math.ceil(
                (mousePosition.y - chessBoard.offsetTop - boardSize) /
                    squareSize
            )
        );

        setActivePieceCoordinate({
            x: coordinateX,
            y: coordinateY
        });
    };

    const movePiece = (e: React.MouseEvent) => {
        const chessBoard = chessBoardEl.current;

        if (activePiece && chessBoard) {
            const minX = chessBoard.offsetLeft,
                maxX = minX + chessBoard.clientWidth - squareSize,
                minY = chessBoard.offsetTop,
                maxY = minY + chessBoard.clientHeight - squareSize,
                x = e.clientX,
                y = e.clientY;

            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            } else {
                activePiece.style.left = `${x - squareSize / 2}px`;
            }

            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            } else {
                activePiece.style.top = `${y - squareSize / 2}px`;
            }
        }
    };

    const dropPiece = (e: React.MouseEvent) => {
        const chessBoard = chessBoardEl.current;
        if (activePiece && activePieceCoordinate && chessBoard) {
            let col = Math.floor(
                (e.clientX - chessBoard.offsetLeft) / squareSize
            );
            let row = Math.abs(
                Math.ceil(
                    (e.clientY - chessBoard.offsetTop - boardSize) / squareSize
                )
            );

            const squaresCopy = squares.slice();

            squaresCopy[row][col] =
                squaresCopy[activePieceCoordinate.y][activePieceCoordinate.x];
            squaresCopy[activePieceCoordinate.y][activePieceCoordinate.x] =
                null;

            setSquares(squaresCopy);

            setActivePieceCoordinate(null);
            setActivePiece(null);
        }
    };

    return (
        <Container>
            <Board
                ref={chessBoardEl}
                boardSize={boardSize}
                squareSize={squareSize}
                squares={squares}
                onMouseDown={(e) => grabPiece(e)}
                onMouseMove={(e) => movePiece(e)}
                onMouseUp={(e) => dropPiece(e)}
            />
        </Container>
    );
};

export default Game;
