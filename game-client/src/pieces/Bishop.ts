import Piece, { PieceColor, Coordinate } from './Piece';
import { getPointsBetween2PointsOnDiagonal } from '../helpers/helper';

export default class Bishop extends Piece {
    constructor(player: number, color: PieceColor) {
        super(player, color);
        this.icon = `assets/images/bishop_${this.colorSymbol}.png`;
    }

    isMovePossible(src: Coordinate, dest: Coordinate): boolean {
        return Math.abs(dest.x - src.x) === Math.abs(dest.y - src.y);
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate> {
        return [...getPointsBetween2PointsOnDiagonal(src, dest)];
    }

    getPossibleMoves(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate> {
        let moves = [];

        // top left
        let x = curPos.x - 1,
            y = curPos.y + 1;
        while (x >= 0 && y < 8 && squares[y][x]?.color !== this.color) {
            moves.push({ x, y });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x--;
            y++;
        }

        // top right
        x = curPos.x + 1;
        y = curPos.y + 1;
        while (x < 8 && y < 8 && squares[y][x]?.color !== this.color) {
            moves.push({
                x,
                y
            });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x++;
            y++;
        }

        // bottom left
        x = curPos.x - 1;
        y = curPos.y - 1;
        while (x >= 0 && y >= 0 && squares[y][x]?.color !== this.color) {
            moves.push({
                x,
                y
            });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x--;
            y--;
        }

        // bottom right
        x = curPos.x + 1;
        y = curPos.y - 1;
        while (x < 8 && y >= 0 && squares[y][x]?.color !== this.color) {
            moves.push({
                x,
                y
            });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x++;
            y--;
        }

        return moves;
    }
}
