import Piece, { PieceColor, Coordinate } from './Piece';

export default class Pawn extends Piece {
    constructor(player: number, color: PieceColor) {
        super(player, color);
        this.icon = `assets/images/pawn_${this.colorSymbol}.png`;
    }

    isMovePossible(
        src: Coordinate,
        dest: Coordinate,
        isDestEnemyOccupied: boolean
    ): boolean {
        // TODO: en passant
        const direction = this.color === PieceColor.WHITE ? 1 : -1;
        const startingRow = this.color === PieceColor.WHITE ? 1 : 6;
        if (src.x === dest.x) {
            if (
                src.y + direction === dest.y ||
                (src.y === startingRow && src.y + direction * 2 === dest.y)
            ) {
                return true;
            }
        } else if (
            src.y + direction === dest.y &&
            (src.x - direction === dest.x || src.x + direction === dest.x)
        ) {
            // capture
            return isDestEnemyOccupied;
        }

        return false;
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate> {
        const direction = this.color === PieceColor.WHITE ? 1 : -1;
        if (src.x === dest.x) {
            if (src.y + direction * 2 === dest.y) {
                return [{ x: src.x, y: src.y + direction }];
            }
        }
        return [];
    }

    getPossibleMoves(curPos: Coordinate): Array<Coordinate> {
        const direction = this.color === PieceColor.WHITE ? 1 : -1;
        let moves = [
            {
                x: curPos.x,
                y: curPos.y + direction
            }
        ];

        if (this.color === PieceColor.WHITE && curPos.y === 1) {
            moves.push({
                x: curPos.x,
                y: curPos.y + 2
            });
        }

        if (this.color === PieceColor.BLACK && curPos.y === 6) {
            moves.push({
                x: curPos.x,
                y: curPos.y - 2
            });
        }

        return moves;
    }
}
