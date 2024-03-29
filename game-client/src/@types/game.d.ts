export type TimeCountdown = {
    minute: number;
    second: number;
};

export type IGame = {
    boardSize: number;
    squareSize: number;
    squares: (Piece | null)[][];
    highlightedSquares: Array<Coordinate>;
    hintSquares: Array<Coordinate>;
    activePiece: Piece | null;
    activePieceCoordinate: Coordinate | null;
    isMouseDown: boolean;
    turn: PieceColor;
    enPassant: Coordinate | null;
    selectedColor: PieceColor;
    playerSelectedColor: PieceColor;
    blackCapturedPieces: Array<Piece>;
    whiteCapturedPieces: Array<Piece>;
    blackScore: number;
    whiteScore: number;
    isGamePlaying: boolean;
    timeLimits: Array<number>;
    selectedTimeLimit: number;
    player1Countdown: TimeCountdown;
    player2Countdown: TimeCountdown;
    isCountdown1Pause: boolean;
    isCountdown2Pause: boolean;
};
