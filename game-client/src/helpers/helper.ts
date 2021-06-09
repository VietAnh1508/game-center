import { Coordinate } from '../components/Game';
import Piece, { PieceName, PieceColor } from '../pieces/Piece';

import Pawn from '../pieces/Pawn';
import Rook from '../pieces/Rook';
import Knight from '../pieces/Knight';
import Bishop from '../pieces/Bishop';
import Queen from '../pieces/Queen';
import King from '../pieces/King';

export const initialiseChessBoard = (): Array<Array<Piece | null>> => {
    const squares: Piece[][] = new Array(8)
        .fill(null)
        .map(() => new Array(8).fill(null));

    /**
     * Board's coordinate
     *
     * [7-0] [7-1] [7-2] [7-3] [7-4] [7-5] [7-6] [7-7]
     * [6-0] [6-1] [6-2] [6-3] [6-4] [6-5] [6-6] [6-7]
     * [5-0] [5-1] [5-2] [5-3] [5-4] [5-5] [5-6] [5-7]
     * [4-0] [4-1] [4-2] [4-3] [4-4] [4-5] [4-6] [4-7]
     * [3-0] [3-1] [3-2] [3-3] [3-4] [3-5] [3-6] [3-7]
     * [2-0] [2-1] [2-2] [2-3] [2-4] [2-5] [2-6] [2-7]
     * [1-0] [1-1] [1-2] [1-3] [1-4] [1-5] [1-6] [1-7]
     * [0-0] [0-1] [0-2] [0-3] [0-4] [0-5] [0-6] [0-7]
     */

    // from now, assume that player 1 get white pieces
    for (let col = 0; col < 8; col++) {
        squares[6][col] = new Pawn(2, PieceColor.BLACK);
        squares[1][col] = new Pawn(1, PieceColor.WHITE);
    }

    const defaultPiecePosition: Array<PieceName> = [
        PieceName.ROOK,
        PieceName.KNIGHT,
        PieceName.BISHOP,
        PieceName.QUEEN,
        PieceName.KING,
        PieceName.BISHOP,
        PieceName.KNIGHT,
        PieceName.ROOK
    ];

    for (let player = 1; player <= 2; player++) {
        const pieceColor = player === 1 ? PieceColor.WHITE : PieceColor.BLACK;
        const row = pieceColor === PieceColor.WHITE ? 0 : 7;

        for (let col = 0; col < 8; col++) {
            squares[row][col] = createPiece(
                defaultPiecePosition[col],
                player,
                pieceColor
            );
        }
    }

    return squares;
};

const createPiece = (
    pieceName: PieceName,
    player: number,
    color: PieceColor
): Piece => {
    switch (pieceName) {
        case PieceName.ROOK:
            return new Rook(player, color);
        case PieceName.KNIGHT:
            return new Knight(player, color);
        case PieceName.BISHOP:
            return new Bishop(player, color);
        case PieceName.QUEEN:
            return new Queen(player, color);
        case PieceName.KING:
            return new King(player, color);
        default:
            throw new Error('Invalid piece name');
    }
};

export const isSamePosition = (p1: Coordinate, p2: Coordinate): boolean => {
    return p1.x === p2.x && p1.y === p2.y;
};
