import React, { useState, useRef, useEffect } from 'react';
import { initialiseChessBoard } from '../../helpers/helper';
import useInterval from '../../custom-hooks/useInterval';

import Piece, { Coordinate, PieceColor, PieceName } from '../../pieces/Piece';
import Board from '../board/Board';
import GameInfo from '../game-info/GameInfo';
import PlayerInfo from '../player-info/PlayerInfo';
import Clock from '../clock/Clock';
import CapturedPieces from '../captured-pieces/CapturedPieces';

import { Container, PlayerSection } from './stlye';

export interface TimeCountdown {
    minute: number;
    second: number;
}

const Game: React.FunctionComponent = () => {
    const [boardSize] = useState<number>(560);
    const [squareSize] = useState<number>(boardSize / 8);
    const [squares, setSquares] = useState<(Piece | null)[][]>(() =>
        initialiseChessBoard(PieceColor.WHITE)
    );
    const [activePieceCoordinate, setActivePieceCoordinate] =
        useState<Coordinate | null>(null);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [highlightedSquares, setHighlightedSquares] = useState<
        Array<Coordinate>
    >([]);
    const [turn, setTurn] = useState<PieceColor>(PieceColor.WHITE);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [hintSquares, setHintSquares] = useState<Array<Coordinate>>([]);
    const [enPassant, setEnPassant] = useState<Coordinate | null>(null);
    const [playerSelectedColor, setPlayerSelectedColor] = useState<PieceColor>(
        PieceColor.RANDOM
    );
    const [blackCapturedPieces, setBlackCapturedPieces] = useState<
        Array<Piece>
    >([]);
    const [whiteCapturedPieces, setWhiteCapturedPieces] = useState<
        Array<Piece>
    >([]);
    const [whiteScore, setWhiteScore] = useState<number>(0);
    const [blackScore, setBlackScore] = useState<number>(0);
    const [isGamePlaying, setIsGamePlaying] = useState<boolean>(false);
    const [player1Countdown, setPlayer1Coundown] = useState<TimeCountdown>({
        minute: 1,
        second: 0
    });
    const [player2Countdown, setPlayer2Coundown] = useState<TimeCountdown>({
        minute: 1,
        second: 0
    });
    const [isCountdown1Pause, setIsCountdown1Pause] = useState<boolean>(true);
    const [isCountdown2Pause, setIsCountdown2Pause] = useState<boolean>(true);

    let chessBoardEl = useRef<HTMLDivElement>(null);

    useInterval(
        () => {
            if (turn === PieceColor.WHITE) {
                setPlayer1Coundown((time) => countdown(time));
            }
        },
        isGamePlaying ? 1000 : null
    );

    useInterval(
        () => {
            if (turn === PieceColor.BLACK) {
                setPlayer2Coundown((time) => countdown(time));
            }
        },
        isGamePlaying ? 1000 : null
    );

    const countdown = (time: TimeCountdown): TimeCountdown => {
        const newSec = time.second === 0 ? 59 : time.second - 1;
        const newMin = newSec === 59 ? time.minute - 1 : time.minute;

        return {
            minute: newMin,
            second: newSec
        };
    };

    useEffect(() => {
        // TODO: fix base on player's selected color
        if (turn === PieceColor.WHITE) {
            setIsCountdown1Pause(false);
            setIsCountdown2Pause(true);
        } else {
            setIsCountdown1Pause(true);
            setIsCountdown2Pause(false);
        }
    }, [turn]);

    useEffect(() => {
        if (
            (player1Countdown.minute === 0 && player1Countdown.second === 0) ||
            (player2Countdown.minute === 0 && player2Countdown.second === 0)
        ) {
            setIsGamePlaying(false);
        }
    }, [
        player1Countdown.minute,
        player1Countdown.second,
        player2Countdown.minute,
        player2Countdown.second
    ]);

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

            const hints = selectedPiece!.getPossibleMoves({ x, y }, squares);
            if (enPassant) {
                hints.push(enPassant);
            }
            setHintSquares(hints);
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
                !!destinationSquare,
                enPassant
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
                setEnPassant(null);
                setEnPassantMoveIfExist(
                    squaresCopy,
                    activePieceCoordinate,
                    destination
                );

                const capturedPiece = squaresCopy[destination.y][destination.x];
                if (capturedPiece !== null) {
                    if (capturedPiece.color === PieceColor.BLACK) {
                        let capturePices = blackCapturedPieces;
                        capturePices.push(capturedPiece);
                        setBlackCapturedPieces(capturePices);
                    } else {
                        let capturePices = whiteCapturedPieces;
                        capturePices.push(capturedPiece);
                        setWhiteCapturedPieces(capturePices);
                    }
                }

                squaresCopy[destination.y][destination.x] =
                    squaresCopy[activePieceCoordinate.y][
                        activePieceCoordinate.x
                    ];
                squaresCopy[activePieceCoordinate.y][activePieceCoordinate.x] =
                    null;

                if (
                    squaresCopy[destination.y][
                        destination.x
                    ]?.isEnPassantCapture()
                ) {
                    const direction =
                        squaresCopy[destination.y][destination.x]?.player === 1
                            ? 1
                            : -1;

                    const capturedPiece =
                        squaresCopy[destination.y + direction][destination.x];
                    if (capturedPiece !== null) {
                        if (capturedPiece.color === PieceColor.BLACK) {
                            let capturePices = blackCapturedPieces;
                            capturePices.push(capturedPiece);
                            setBlackCapturedPieces(capturePices);
                        } else {
                            let capturePices = whiteCapturedPieces;
                            capturePices.push(capturedPiece);
                            setWhiteCapturedPieces(capturePices);
                        }
                    }

                    squaresCopy[destination.y + direction][destination.x] =
                        null;
                }

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

                calculateScore();
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
            row = Math.floor((e.clientY - board.offsetTop) / squareSize);

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

    const setEnPassantMoveIfExist = (
        squares: (Piece | null)[][],
        src: Coordinate,
        dest: Coordinate
    ) => {
        const currentPiece = squares[src.y][src.x],
            leftOpponent = squares[dest.y][dest.x - 1], // from the normal coordinate point of view, not from the player's view
            rightOpponent = squares[dest.y][dest.x + 1],
            player = currentPiece?.player;

        if (
            currentPiece?.name === PieceName.PAWN &&
            Math.abs(dest.y - src.y) === 2 &&
            ((leftOpponent?.name === PieceName.PAWN &&
                leftOpponent.color !== currentPiece?.color) ||
                (rightOpponent?.name === PieceName.PAWN &&
                    rightOpponent.color !== currentPiece?.color))
        ) {
            const direction = player === 1 ? 1 : -1;

            setEnPassant({
                x: dest.x,
                y: dest.y + direction
            });
        }
    };

    const onColorSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        let selectedColor =
            PieceColor[e.target.value as keyof typeof PieceColor];
        setPlayerSelectedColor(selectedColor);

        if (selectedColor === PieceColor.RANDOM) {
            // TODO: fix this
            selectedColor = PieceColor.WHITE;
        }
        setSquares(initialiseChessBoard(selectedColor));
    };

    const handleStartGame = (): void => {
        setIsGamePlaying(true);
    };

    const calculateScore = (): void => {
        let whiteScore = 0;
        for (let piece of blackCapturedPieces) {
            whiteScore += piece.value;
        }

        let blackScore = 0;
        for (let piece of whiteCapturedPieces) {
            blackScore += piece.value;
        }

        const diff = Math.abs(whiteScore - blackScore);

        setWhiteScore(whiteScore > blackScore ? diff : 0);
        setBlackScore(blackScore > whiteScore ? diff : 0);
    };

    return (
        <Container>
            <PlayerSection>
                <PlayerInfo
                    userAvatar='https://betacssjs.chesscomfiles.com/bundles/web/images/user-image.svg'
                    username='user 2'
                />
                <Clock
                    player={2}
                    countdown={player2Countdown}
                    isPause={isCountdown2Pause}
                />
                <CapturedPieces
                    color={
                        playerSelectedColor === PieceColor.WHITE
                            ? PieceColor.WHITE
                            : PieceColor.BLACK
                    }
                    capturedPieces={
                        playerSelectedColor === PieceColor.WHITE
                            ? whiteCapturedPieces
                            : blackCapturedPieces
                    }
                    capturedPiecesScore={
                        playerSelectedColor === PieceColor.WHITE
                            ? blackScore
                            : whiteScore
                    }
                />
            </PlayerSection>
            <Board
                ref={chessBoardEl}
                boardSize={boardSize}
                squareSize={squareSize}
                squares={squares}
                highlightedSquares={highlightedSquares}
                hintSquares={hintSquares}
                playerSelectedColor={playerSelectedColor}
                onMouseDown={(e) => grabPiece(e)}
                onMouseMove={(e) => movePiece(e)}
                onMouseUp={(e) => dropPiece(e)}
            />
            <PlayerSection>
                <PlayerInfo
                    userAvatar='https://betacssjs.chesscomfiles.com/bundles/web/images/user-image.svg'
                    username='user 1'
                />
                <Clock
                    player={1}
                    countdown={player1Countdown}
                    isPause={isCountdown1Pause}
                />
                <CapturedPieces
                    color={
                        playerSelectedColor === PieceColor.WHITE
                            ? PieceColor.BLACK
                            : PieceColor.WHITE
                    }
                    capturedPieces={
                        playerSelectedColor === PieceColor.WHITE
                            ? blackCapturedPieces
                            : whiteCapturedPieces
                    }
                    capturedPiecesScore={
                        playerSelectedColor === PieceColor.WHITE
                            ? whiteScore
                            : blackScore
                    }
                />
            </PlayerSection>
            <GameInfo
                selectedColor={playerSelectedColor}
                handleSelectPieceColor={onColorSelected}
                startGame={handleStartGame}
            />
        </Container>
    );
};

export default Game;
