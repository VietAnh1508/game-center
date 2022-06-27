import React, { useRef, useEffect, useContext } from 'react';
import useInterval from '../../custom-hooks/useInterval';

import { GameContext } from '../../context/game-context';

import { initialiseChessBoard } from '../../helpers/helper';
import { TimeCountdown } from '../../@types/game';
import { Coordinate } from '../../@types/coordinate';

import Piece, { PieceColor, PieceName } from '../../pieces/Piece';
import Board from '../board/Board';
import GameInfo from '../game-info/GameInfo';
import PlayerInfo from '../player-info/PlayerInfo';
import Clock from '../clock/Clock';
import CapturedPieces from '../captured-pieces/CapturedPieces';

import { Container, PlayerSection } from './stlye';

const Game: React.FunctionComponent = () => {
    const [state, dispatch] = useContext(GameContext);

    let chessBoardEl = useRef<HTMLDivElement>(null);

    useInterval(
        () => {
            if (
                (state.playerSelectedColor === PieceColor.WHITE &&
                    state.turn === PieceColor.WHITE) ||
                (state.playerSelectedColor === PieceColor.BLACK &&
                    state.turn === PieceColor.BLACK)
            ) {
                const newTime = countdown(state.player1Countdown);
                dispatch({
                    type: 'SET_PLAYER_COUNT_DOWN',
                    payload: {
                        player: 1,
                        minute: newTime.minute,
                        second: newTime.second
                    }
                });
            }
        },
        state.isGamePlaying ? 1000 : null
    );

    useInterval(
        () => {
            if (
                (state.playerSelectedColor === PieceColor.WHITE &&
                    state.turn === PieceColor.BLACK) ||
                (state.playerSelectedColor === PieceColor.BLACK &&
                    state.turn === PieceColor.WHITE)
            ) {
                const newTime = countdown(state.player2Countdown);
                dispatch({
                    type: 'SET_PLAYER_COUNT_DOWN',
                    payload: {
                        player: 2,
                        minute: newTime.minute,
                        second: newTime.second
                    }
                });
            }
        },
        state.isGamePlaying ? 1000 : null
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
        if (
            (state.playerSelectedColor === PieceColor.WHITE &&
                state.turn === PieceColor.WHITE) ||
            (state.playerSelectedColor === PieceColor.BLACK &&
                state.turn === PieceColor.BLACK)
        ) {
            dispatch({
                type: 'SET_COUNT_DOWN_PAUSE',
                payload: 2 // player number
            });
        } else {
            dispatch({
                type: 'SET_COUNT_DOWN_PAUSE',
                payload: 1
            });
        }
    }, [state.turn, state.playerSelectedColor, dispatch]);

    useEffect(() => {
        if (
            (state.player1Countdown.minute === 0 &&
                state.player1Countdown.second === 0) ||
            (state.player2Countdown.minute === 0 &&
                state.player2Countdown.second === 0)
        ) {
            dispatch({
                type: 'SET_IS_GAME_PLAYING',
                payload: false
            });
        }
    }, [
        state.player1Countdown.minute,
        state.player1Countdown.second,
        state.player2Countdown.minute,
        state.player2Countdown.second,
        dispatch
    ]);

    const grabPiece = (e: React.MouseEvent): void => {
        if (!state.isGamePlaying) {
            return;
        }

        dispatch({
            type: 'SET_MOUSE_DOWN',
            payload: true
        });

        const element = e.target as HTMLElement;
        const chessBoard = chessBoardEl.current;
        if (!chessBoard) {
            return;
        }

        if (element.classList.contains('chess-piece')) {
            const { x, y } = getBoardCoordinateUnderMouse(e, chessBoard);

            const selectedPiece = state.squares[y][x];
            if (selectedPiece !== null && selectedPiece!.color !== state.turn) {
                return;
            } else {
                dispatch({
                    type: 'SET_ACTIVE_PIECE_COORDINATE',
                    payload: null
                });
                dispatch({
                    type: 'SET_ACTIVE_PIECE',
                    payload: null
                });
            }

            dispatch({
                type: 'SET_ACTIVE_PIECE_COORDINATE',
                payload: { x, y }
            });

            if (state.highlightedSquares.length !== 0) {
                dispatch({
                    type: 'SET_HIGHLIGHTED_SQUARES',
                    payload: []
                });
            }

            dispatch({
                type: 'SET_HIGHLIGHTED_SQUARES',
                payload: [{ x, y }]
            });

            element.style.position = 'absolute';
            element.style.left = `${e.clientX - state.squareSize / 2}px`;
            element.style.top = `${e.clientY - state.squareSize / 2}px`;

            dispatch({
                type: 'SET_ACTIVE_PIECE',
                payload: element
            });

            const hints = selectedPiece!.getPossibleMoves(
                { x, y },
                state.squares
            );
            if (state.enPassant) {
                hints.push(state.enPassant);
            }
            dispatch({
                type: 'SET_HINT_SQUARES',
                payload: hints
            });
        }
    };

    const movePiece = (e: React.MouseEvent): void => {
        const chessBoard = chessBoardEl.current;
        if (!chessBoard) {
            return;
        }

        if (state.isMouseDown && state.activePiece) {
            const minX = chessBoard.offsetLeft,
                maxX = minX + chessBoard.clientWidth - state.squareSize,
                minY = chessBoard.offsetTop,
                maxY = minY + chessBoard.clientHeight - state.squareSize,
                x = e.clientX,
                y = e.clientY;

            // prevent dragging piece out of the board
            if (x < minX) {
                state.activePiece.style.left = `${minX}px`;
            } else if (x > maxX) {
                state.activePiece.style.left = `${maxX}px`;
            } else {
                state.activePiece.style.left = `${x - state.squareSize / 2}px`;
            }

            if (y < minY) {
                state.activePiece.style.top = `${minY}px`;
            } else if (y > maxY) {
                state.activePiece.style.top = `${maxY}px`;
            } else {
                state.activePiece.style.top = `${y - state.squareSize / 2}px`;
            }
        }
    };

    const dropPiece = (e: React.MouseEvent): void => {
        dispatch({
            type: 'SET_MOUSE_DOWN',
            payload: false
        });

        const chessBoard = chessBoardEl.current;
        if (!chessBoard) {
            return;
        }

        if (state.activePiece && state.activePieceCoordinate) {
            const squaresCopy = state.squares.slice();

            const sourceSquare =
                squaresCopy[state.activePieceCoordinate.y][
                    state.activePieceCoordinate.x
                ];

            if (sourceSquare?.color !== state.turn) {
                return;
            }

            const destination = getBoardCoordinateUnderMouse(e, chessBoard);
            const destinationSquare = squaresCopy[destination.y][destination.x];

            const isMovePossible: boolean = sourceSquare!.isMovePossible(
                state.activePieceCoordinate,
                destination,
                !!destinationSquare,
                state.enPassant
            );

            const srcToDestPath: Array<Coordinate> =
                sourceSquare!.getSrcToDestPath(
                    state.activePieceCoordinate,
                    destination
                );

            const isLegal =
                isLegalMove(srcToDestPath) &&
                sourceSquare?.color !== destinationSquare?.color;

            if (isMovePossible && isLegal) {
                dispatch({
                    type: 'SET_EN_PASSANT',
                    payload: null
                });

                setEnPassantMoveIfExist(
                    squaresCopy,
                    state.activePieceCoordinate,
                    destination
                );

                const capturedPiece = squaresCopy[destination.y][destination.x];
                if (capturedPiece !== null) {
                    if (capturedPiece.color === PieceColor.BLACK) {
                        let capturePices = state.blackCapturedPieces;
                        capturePices.push(capturedPiece);
                        dispatch({
                            type: 'SET_BLACK_CAPTURED_PIECES',
                            payload: capturePices
                        });
                    } else {
                        let capturePices = state.whiteCapturedPieces;
                        capturePices.push(capturedPiece);
                        dispatch({
                            type: 'SET_WHITE_CAPTURED_PIECES',
                            payload: capturePices
                        });
                    }
                }

                squaresCopy[destination.y][destination.x] =
                    squaresCopy[state.activePieceCoordinate.y][
                        state.activePieceCoordinate.x
                    ];
                squaresCopy[state.activePieceCoordinate.y][
                    state.activePieceCoordinate.x
                ] = null;

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
                            let capturePices = state.blackCapturedPieces;
                            capturePices.push(capturedPiece);
                            dispatch({
                                type: 'SET_BLACK_CAPTURED_PIECES',
                                payload: capturePices
                            });
                        } else {
                            let capturePices = state.whiteCapturedPieces;
                            capturePices.push(capturedPiece);
                            dispatch({
                                type: 'SET_WHITE_CAPTURED_PIECES',
                                payload: capturePices
                            });
                        }
                    }

                    squaresCopy[destination.y + direction][destination.x] =
                        null;
                }

                dispatch({
                    type: 'UPDATE_SQUARES',
                    payload: squaresCopy
                });

                let highlighted = state.highlightedSquares;
                highlighted.push({ x: destination.x, y: destination.y });
                dispatch({
                    type: 'SET_HIGHLIGHTED_SQUARES',
                    payload: highlighted
                });

                dispatch({
                    type: 'CHANGE_TURN'
                });

                dispatch({
                    type: 'SET_HINT_SQUARES',
                    payload: []
                });

                calculateScore();
            } else {
                state.activePiece.style.position = 'relative';
                state.activePiece.style.top = '0px';
                state.activePiece.style.left = '0px';
            }
        }
    };

    const getBoardCoordinateUnderMouse = (
        e: React.MouseEvent,
        board: HTMLDivElement
    ): Coordinate => {
        const col = Math.floor(
                (e.clientX - board.offsetLeft) / state.squareSize
            ),
            row = Math.floor((e.clientY - board.offsetTop) / state.squareSize);

        return {
            x: col,
            y: row
        };
    };

    const isLegalMove = (srcToDestPath: Array<Coordinate>): boolean => {
        for (let coordinate of srcToDestPath) {
            if (state.squares[coordinate.y][coordinate.x] !== null) {
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

            dispatch({
                type: 'SET_EN_PASSANT',
                payload: {
                    x: dest.x,
                    y: dest.y + direction
                }
            });
        }
    };

    const onColorSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (state.isGamePlaying) {
            return;
        }

        let selectedColor =
            PieceColor[e.target.value as keyof typeof PieceColor];
        dispatch({
            type: 'SET_SELECTED_COLOR',
            payload: selectedColor
        });

        if (selectedColor === PieceColor.RANDOM) {
            selectedColor = Math.floor(Math.random() * 2);
        }

        dispatch({
            type: 'SET_PLAYER_SELECTED_COLOR',
            payload: selectedColor
        });
        dispatch({
            type: 'UPDATE_SQUARES',
            payload: initialiseChessBoard(selectedColor)
        });
    };

    const onTimeLimitSelected = (
        e: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const timeLimit = Number(e.target.value);
        dispatch({
            type: 'SET_SELECTED_TIME_LIMIT',
            payload: timeLimit
        });

        dispatch({
            type: 'SET_PLAYER_COUNT_DOWN',
            payload: {
                player: 1,
                minute: timeLimit,
                second: 0
            }
        });

        dispatch({
            type: 'SET_PLAYER_COUNT_DOWN',
            payload: {
                player: 2,
                minute: timeLimit,
                second: 0
            }
        });
    };

    const handleStartGame = (): void => {
        dispatch({
            type: 'SET_IS_GAME_PLAYING',
            payload: true
        });
    };

    const calculateScore = (): void => {
        let whiteScore = 0;
        for (let piece of state.blackCapturedPieces) {
            whiteScore += piece.value;
        }

        let blackScore = 0;
        for (let piece of state.whiteCapturedPieces) {
            blackScore += piece.value;
        }

        const diff = Math.abs(whiteScore - blackScore);

        dispatch({
            type: 'SET_WHITE_SCORE',
            payload: whiteScore > blackScore ? diff : 0
        });

        dispatch({
            type: 'SET_BLACK_SCORE',
            payload: blackScore > whiteScore ? diff : 0
        });
    };

    return (
        <Container>
            <PlayerSection>
                <PlayerInfo
                    userAvatar='https://betacssjs.chesscomfiles.com/bundles/web/images/user-image.svg'
                    username='user 2'
                />
                <Clock
                    color={
                        state.playerSelectedColor === PieceColor.WHITE
                            ? PieceColor.BLACK
                            : PieceColor.WHITE
                    }
                    countdown={state.player2Countdown}
                    isPause={state.isCountdown2Pause}
                />
                <CapturedPieces
                    color={
                        state.playerSelectedColor === PieceColor.WHITE
                            ? PieceColor.WHITE
                            : PieceColor.BLACK
                    }
                    capturedPieces={
                        state.playerSelectedColor === PieceColor.WHITE
                            ? state.whiteCapturedPieces
                            : state.blackCapturedPieces
                    }
                    capturedPiecesScore={
                        state.playerSelectedColor === PieceColor.WHITE
                            ? state.blackScore
                            : state.whiteScore
                    }
                />
            </PlayerSection>
            <Board
                ref={chessBoardEl}
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
                    color={state.playerSelectedColor}
                    countdown={state.player1Countdown}
                    isPause={state.isCountdown1Pause}
                />
                <CapturedPieces
                    color={
                        state.playerSelectedColor === PieceColor.WHITE
                            ? PieceColor.BLACK
                            : PieceColor.WHITE
                    }
                    capturedPieces={
                        state.playerSelectedColor === PieceColor.WHITE
                            ? state.blackCapturedPieces
                            : state.whiteCapturedPieces
                    }
                    capturedPiecesScore={
                        state.playerSelectedColor === PieceColor.WHITE
                            ? state.whiteScore
                            : state.blackScore
                    }
                />
            </PlayerSection>
            <GameInfo
                handleSelectTimeLimit={onTimeLimitSelected}
                handleSelectPieceColor={onColorSelected}
                startGame={handleStartGame}
            />
        </Container>
    );
};

export default Game;
