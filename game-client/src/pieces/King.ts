import Piece, { PieceColor, Coordinate, PieceName } from './Piece';
import { isSamePosition } from '../helpers/helper';

export default class King extends Piece {
    constructor(name: PieceName, player: number, color: PieceColor) {
        super(name, player, color);
        this.icon = `assets/images/king_${this.colorSymbol}.png`;
    }

    isMovePossible(src: Coordinate, dest: Coordinate) {
        return (
            isSamePosition({ x: src.x - 1, y: src.y - 1 }, dest) ||
            isSamePosition({ x: src.x, y: src.y - 1 }, dest) ||
            isSamePosition({ x: src.x + 1, y: src.y - 1 }, dest) ||
            isSamePosition({ x: src.x - 1, y: src.y }, dest) ||
            isSamePosition({ x: src.x + 1, y: src.y }, dest) ||
            isSamePosition({ x: src.x - 1, y: src.y + 1 }, dest) ||
            isSamePosition({ x: src.x, y: src.y + 1 }, dest) ||
            isSamePosition({ x: src.x + 1, y: src.y + 1 }, dest)
        );
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate) {
        return [];
    }

    getPossibleMoves(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate> {
        let moves = [
            {
                x: curPos.x - 1,
                y: curPos.y + 1
            },
            {
                x: curPos.x,
                y: curPos.y + 1
            },
            {
                x: curPos.x + 1,
                y: curPos.y + 1
            },
            {
                x: curPos.x - 1,
                y: curPos.y
            },
            {
                x: curPos.x + 1,
                y: curPos.y
            },
            {
                x: curPos.x - 1,
                y: curPos.y - 1
            },
            {
                x: curPos.x,
                y: curPos.y - 1
            },
            {
                x: curPos.x + 1,
                y: curPos.y - 1
            }
        ];

        return moves.filter((pos) => {
            // remove positions outside of the board
            if (!squares[pos.y]) {
                return false;
            }

            const piece = squares[pos.y][pos.x];
            return (
                piece !== undefined &&
                (piece === null || piece.color !== this.color)
            );
        });
    }
}
