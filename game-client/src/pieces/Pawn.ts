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
                !isDestEnemyOccupied &&
                (src.y + direction === dest.y ||
                    (src.y === startingRow && src.y + direction * 2 === dest.y))
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

    getPossibleMoves(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate> {
        const direction = this.color === PieceColor.WHITE ? 1 : -1;
        let moves = [];

        const move1 = {
            x: curPos.x,
            y: curPos.y + direction
        };

        if (squares[move1.y][move1.x] === null) {
            moves.push(move1);
        }

        let move2;

        if (this.color === PieceColor.WHITE && curPos.y === 1) {
            move2 = {
                x: curPos.x,
                y: curPos.y + 2
            };
        }

        if (this.color === PieceColor.BLACK && curPos.y === 6) {
            move2 = {
                x: curPos.x,
                y: curPos.y - 2
            };
        }

        if (move2 && squares[move2.y][move2.x] === null) {
            moves.push(move2);
        }

        const takeLeftMove = {
            x: this.color === PieceColor.WHITE ? curPos.x - 1 : curPos.x + 1,
            y: this.color === PieceColor.WHITE ? curPos.y + 1 : curPos.y - 1
        };

        if (
            squares[takeLeftMove.y][takeLeftMove.x] &&
            squares[takeLeftMove.y][takeLeftMove.x]!.color !== this.color
        ) {
            moves.push(takeLeftMove);
        }

        const takeRightMove = {
            x: this.color === PieceColor.WHITE ? curPos.x + 1 : curPos.x - 1,
            y: this.color === PieceColor.WHITE ? curPos.y + 1 : curPos.y - 1
        };

        if (
            squares[takeRightMove.y][takeRightMove.x] &&
            squares[takeRightMove.y][takeRightMove.x]!.color !== this.color
        ) {
            moves.push(takeRightMove);
        }

        return moves;
    }
}
