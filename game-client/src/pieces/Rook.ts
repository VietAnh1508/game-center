import Piece, { PieceColor, Coordinate } from './Piece';

export default class Rook extends Piece {
    constructor(player: number, color: PieceColor) {
        super(player, color);
        this.icon = `assets/images/rook_${this.colorSymbol}.png`;
    }

    isMovePossible(src: Coordinate, dest: Coordinate): boolean {
        return src.x === dest.x || src.y === dest.y;
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate> {
        return [...this.getPointsBetween2PointsOnColAndRow(src, dest)];
    }

    getPossibleMoves(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate> {
        let moves = [];

        let x = curPos.x,
            y = curPos.y + 1;

        // top
        while (y < 8 && squares[y][x]?.color !== this.color) {
            moves.push({ x, y });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            y++;
        }

        // down
        y = curPos.y - 1;
        while (y >= 0 && squares[y][x]?.color !== this.color) {
            moves.push({ x, y });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            y--;
        }

        // left
        x = curPos.x - 1;
        y = curPos.y;
        while (x >= 0 && squares[y][x]?.color !== this.color) {
            moves.push({ x, y });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x--;
        }

        // right
        x = curPos.x + 1;
        while (x < 8 && squares[y][x]?.color !== this.color) {
            moves.push({ x, y });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x++;
        }

        return moves;
    }
}
