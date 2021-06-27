import Piece, { PieceColor, Coordinate, PieceName } from './Piece';

export default class Pawn extends Piece {
    direction: number;
    enPassantCapture: boolean;

    constructor(name: PieceName, player: number, color: PieceColor) {
        super(name, 1, player, color);
        this.icon = `assets/images/pawn_${this.colorSymbol}.png`;
        this.direction = player === 1 ? -1 : 1;
        this.enPassantCapture = false;
    }

    isMovePossible(
        src: Coordinate,
        dest: Coordinate,
        isDestEnemyOccupied: boolean,
        enPassant: Coordinate | null
    ): boolean {
        const startingRow = this.player === 1 ? 6 : 1;
        this.enPassantCapture = false;

        if (src.x === dest.x) {
            if (
                !isDestEnemyOccupied &&
                (src.y + this.direction === dest.y ||
                    (src.y === startingRow &&
                        src.y + this.direction * 2 === dest.y))
            ) {
                return true;
            }
        } else if (
            src.y + this.direction === dest.y &&
            (src.x - this.direction === dest.x ||
                src.x + this.direction === dest.x)
        ) {
            if (enPassant && dest.x === enPassant.x && dest.y === enPassant.y) {
                // en passant
                this.enPassantCapture = true;
                return true;
            }

            // normal capture
            return isDestEnemyOccupied;
        }

        return false;
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate> {
        if (src.x === dest.x) {
            if (src.y + this.direction * 2 === dest.y) {
                return [{ x: src.x, y: src.y + this.direction }];
            }
        }
        return [];
    }

    getPossibleMoves(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate> {
        let moves = [];

        const move1Step = {
            x: curPos.x,
            y: curPos.y + this.direction
        };

        if (squares[move1Step.y][move1Step.x] === null) {
            moves.push(move1Step);
        }

        let move2Steps;

        if (this.player === 1 && curPos.y === 6) {
            move2Steps = {
                x: curPos.x,
                y: curPos.y + this.direction * 2
            };
        }

        if (this.player === 2 && curPos.y === 1) {
            move2Steps = {
                x: curPos.x,
                y: curPos.y + this.direction * 2
            };
        }

        if (
            move2Steps &&
            squares[move2Steps.y][move2Steps.x] === null &&
            squares[move2Steps.y][move2Steps.x] === null
        ) {
            moves.push(move2Steps);
        }

        const takeLeftMove = {
            x: curPos.x + this.direction,
            y: curPos.y + this.direction
        };

        if (
            squares[takeLeftMove.y][takeLeftMove.x] &&
            squares[takeLeftMove.y][takeLeftMove.x]!.color !== this.color
        ) {
            moves.push(takeLeftMove);
        }

        const takeRightMove = {
            x: curPos.x - this.direction,
            y: curPos.y + this.direction
        };

        if (
            squares[takeRightMove.y][takeRightMove.x] &&
            squares[takeRightMove.y][takeRightMove.x]!.color !== this.color
        ) {
            moves.push(takeRightMove);
        }

        return moves;
    }

    isEnPassantCapture() {
        return this.enPassantCapture;
    }
}
