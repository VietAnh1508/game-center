import React, { createContext, useReducer } from 'react';
import { initialiseChessBoard } from '../helpers/helper';
import { PieceColor } from '../pieces/Piece';
import { IGame } from '../@types/game';

export const GameContext = createContext<any | null>(null);

const BOARD_SIZE = 560;

const initialState: IGame = {
    boardSize: BOARD_SIZE,
    squareSize: BOARD_SIZE / 8,
    squares: initialiseChessBoard(PieceColor.WHITE),
    highlightedSquares: [],
    hintSquares: [],
    activePiece: null,
    activePieceCoordinate: null,
    isMouseDown: false,
    turn: PieceColor.WHITE,
    enPassant: null,
    selectedColor: PieceColor.RANDOM,
    playerSelectedColor: PieceColor.WHITE,
    blackCapturedPieces: [],
    whiteCapturedPieces: [],
    blackScore: 0,
    whiteScore: 0,
    isGamePlaying: false,
    timeLimits: [3, 5, 10],
    selectedTimeLimit: 3,
    player1Countdown: {
        minute: 3,
        second: 0
    },
    player2Countdown: {
        minute: 3,
        second: 0
    },
    isCountdown1Pause: true,
    isCountdown2Pause: true
};

interface ReducerAction {
    type: string;
    payload: any;
}

const reducer = (state: any, { type, payload }: ReducerAction) => {
    switch (type) {
        case 'UPDATE_SQUARES':
            return {
                ...state,
                squares: payload
            };
        case 'SET_HIGHLIGHTED_SQUARES':
            return {
                ...state,
                highlightedSquares: payload
            };
        case 'SET_HINT_SQUARES':
            return {
                ...state,
                hintSquares: payload
            };
        case 'SET_ACTIVE_PIECE':
            return {
                ...state,
                activePiece: payload
            };
        case 'SET_ACTIVE_PIECE_COORDINATE':
            return {
                ...state,
                activePieceCoordinate: payload
            };
        case 'SET_MOUSE_DOWN':
            return {
                ...state,
                isMouseDown: payload
            };
        case 'SET_EN_PASSANT':
            return {
                ...state,
                enPassant: payload
            };
        case 'SET_SELECTED_COLOR':
            return {
                ...state,
                selectedColor: payload
            };
        case 'SET_PLAYER_SELECTED_COLOR':
            return {
                ...state,
                playerSelectedColor: payload
            };
        case 'SET_SELECTED_TIME_LIMIT':
            return {
                ...state,
                selectedTimeLimit: payload
            };
        case 'SET_IS_GAME_PLAYING':
            return {
                ...state,
                isGamePlaying: payload
            };
        case 'CHANGE_TURN':
            return {
                ...state,
                turn:
                    state.turn === PieceColor.WHITE
                        ? PieceColor.BLACK
                        : PieceColor.WHITE
            };
        case 'SET_PLAYER_COUNT_DOWN':
            if (payload.player === 1) {
                return {
                    ...state,
                    player1Countdown: {
                        minute: payload.minute,
                        second: payload.second
                    }
                };
            }
            return {
                ...state,
                player2Countdown: {
                    minute: payload.minute,
                    second: payload.second
                }
            };
        case 'SET_COUNT_DOWN_PAUSE':
            if (payload === 1) {
                return {
                    ...state,
                    isCountdown1Pause: true,
                    isCountdown2Pause: false
                };
            }
            return {
                ...state,
                isCountdown2Pause: true,
                isCountdown1Pause: false
            };
        case 'SET_BLACK_CAPTURED_PIECES':
            return {
                ...state,
                blackCapturedPieces: payload
            };
        case 'SET_WHITE_CAPTURED_PIECES':
            return {
                ...state,
                whiteCapturedPieces: payload
            };
        case 'SET_WHITE_SCORE':
            return {
                ...state,
                whiteScore: payload
            };
        case 'SET_BLACK_SCORE':
            return {
                ...state,
                blackScore: payload
            };
        default:
            throw new Error(`Unknown action type: ${type}`);
    }
};

export const GameContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GameContext.Provider value={[state, dispatch]}>
            {children}
        </GameContext.Provider>
    );
};
