import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { initialiseChessBoard } from '../helpers/helper';
import Piece, { Coordinate, PieceColor } from '../pieces/Piece';
import Board from './Board';
import Clock from './Clock';
import GameInfo from './GameInfo';
import PlayerInfo from './PlayerInfo';

const Container = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 40px auto 40px;
    row-gap: 10px;
    place-content: center;
    height: 100vh;
    background-color: #51504d;
`;

const PlayerSection = styled.div`
    grid-column: 1 / 2;
    width: 560px;
    justify-self: center;
    display: grid;
    grid-template-columns: 40px auto 140px;
    grid-template-rows: 20px 20px;
    column-gap: 5px;
`;

export interface TimeCountdown {
    minute: number;
    second: number;
}

interface Props {}

const Game: React.FunctionComponent<Props> = () => {
    const [boardSize] = useState<number>(560);
    const [squareSize] = useState<number>(boardSize / 8);
    const [squares, setSquares] =
        useState<(Piece | null)[][]>(initialiseChessBoard);
    const [activePieceCoordinate, setActivePieceCoordinate] =
        useState<Coordinate | null>(null);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [highlightedSquares, setHighlightedSquares] = useState<
        Array<Coordinate>
    >([]);
    const [turn, setTurn] = useState<PieceColor>(PieceColor.WHITE);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [hintSquares, setHintSquares] = useState<Array<Coordinate>>([]);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [player1Countdown, setPlayer1Coundown] = useState<TimeCountdown>({
        minute: 10,
        second: 0
    });
    const [player2Countdown, setPlayer2Coundown] = useState<TimeCountdown>({
        minute: 10,
        second: 0
    });

    let chessBoardEl = useRef<HTMLDivElement>(null);

    const grabPiece = (e: React.MouseEvent): void => {
        setIsMouseDown(true);

        const element = e.target as HTMLElement;
        const chessBoard = chessBoardEl.current;
        if (!chessBoard) {
            return;
        }

        if (element.classList.contains('chess-piece')) {
            const { x, y } = getBoardCoordinateUnderMouse(e, chessBoard);

            const selectedPiece = squares[y][x];
            if (selectedPiece !== null && selectedPiece!.color !== turn) {
                return;
            } else {
                setActivePieceCoordinate(null);
                setActivePiece(null);
            }

            setActivePieceCoordinate({ x, y });

            if (highlightedSquares.length !== 0) {
                setHighlightedSquares([]);
            }

            setHighlightedSquares([{ x, y }]);

            element.style.position = 'absolute';
            element.style.left = `${e.clientX - squareSize / 2}px`;
            element.style.top = `${e.clientY - squareSize / 2}px`;

            setActivePiece(element);

            setHintSquares(selectedPiece!.getPossibleMoves({ x, y }, squares));
        }
    };

    const movePiece = (e: React.MouseEvent): void => {
        const chessBoard = chessBoardEl.current;
        if (!chessBoard) {
            return;
        }

        if (isMouseDown && activePiece) {
            const minX = chessBoard.offsetLeft,
                maxX = minX + chessBoard.clientWidth - squareSize,
                minY = chessBoard.offsetTop,
                maxY = minY + chessBoard.clientHeight - squareSize,
                x = e.clientX,
                y = e.clientY;

            // prevent dragging piece out of the board
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

    const dropPiece = (e: React.MouseEvent): void => {
        setIsMouseDown(false);

        const chessBoard = chessBoardEl.current;
        if (!chessBoard) {
            return;
        }

        if (activePiece && activePieceCoordinate) {
            const squaresCopy = squares.slice();

            const sourceSquare =
                squaresCopy[activePieceCoordinate.y][activePieceCoordinate.x];

            if (sourceSquare?.color !== turn) {
                return;
            }

            const destination = getBoardCoordinateUnderMouse(e, chessBoard);
            const destinationSquare = squaresCopy[destination.y][destination.x];

            const isMovePossible: boolean = sourceSquare!.isMovePossible(
                activePieceCoordinate,
                destination,
                !!destinationSquare
            );

            const srcToDestPath: Array<Coordinate> =
                sourceSquare!.getSrcToDestPath(
                    activePieceCoordinate,
                    destination
                );

            const isLegal =
                isLegalMove(srcToDestPath) &&
                sourceSquare?.color !== destinationSquare?.color;

            if (isMovePossible && isLegal) {
                squaresCopy[destination.y][destination.x] =
                    squaresCopy[activePieceCoordinate.y][
                        activePieceCoordinate.x
                    ];
                squaresCopy[activePieceCoordinate.y][activePieceCoordinate.x] =
                    null;

                setSquares(squaresCopy);

                let highlighted = highlightedSquares;
                highlighted.push({ x: destination.x, y: destination.y });
                setHighlightedSquares(highlighted);

                setTurn(
                    turn === PieceColor.WHITE
                        ? PieceColor.BLACK
                        : PieceColor.WHITE
                );

                setHintSquares([]);
            } else {
                activePiece.style.position = 'relative';
                activePiece.style.top = '0px';
                activePiece.style.left = '0px';
            }
        }
    };

    const getBoardCoordinateUnderMouse = (
        e: React.MouseEvent,
        board: HTMLDivElement
    ): Coordinate => {
        const col = Math.floor((e.clientX - board.offsetLeft) / squareSize),
            row = Math.abs(
                Math.ceil(
                    (e.clientY - board.offsetTop - boardSize) / squareSize
                )
            );

        return {
            x: col,
            y: row
        };
    };

    const isLegalMove = (srcToDestPath: Array<Coordinate>): boolean => {
        for (let coordinate of srcToDestPath) {
            if (squares[coordinate.y][coordinate.x] !== null) {
                return false;
            }
        }

        return true;
    };

    const handleStartGame = (): void => {
        setGameStarted(true);
    };

    return (
        <Container>
            <PlayerSection>
                <PlayerInfo
                    userAvatar='https://betacssjs.chesscomfiles.com/bundles/web/images/user-image.svg'
                    username='user 1'
                />
                <Clock player={2} countdown={player2Countdown} />
            </PlayerSection>
            <Board
                ref={chessBoardEl}
                boardSize={boardSize}
                squareSize={squareSize}
                squares={squares}
                highlightedSquares={highlightedSquares}
                hintSquares={hintSquares}
                onMouseDown={(e) => grabPiece(e)}
                onMouseMove={(e) => movePiece(e)}
                onMouseUp={(e) => dropPiece(e)}
            />
            <PlayerSection>
                <PlayerInfo
                    userAvatar='https://betacssjs.chesscomfiles.com/bundles/web/images/user-image.svg'
                    username='user 2'
                />
                <Clock player={1} countdown={player1Countdown} />
            </PlayerSection>
            <GameInfo startGame={handleStartGame} />
        </Container>
    );
};

export default Game;
