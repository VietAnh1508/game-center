import Piece, { PieceColor, Coordinate } from './Piece';
import {
    getPointsBetween2PointsOnStraightLine,
    getPointsBetween2PointsOnDiagonal
} from '../helpers/helper';

export default class Queen extends Piece {
    constructor(player: number, color: PieceColor) {
        super(player, color);
        this.icon = `assets/images/queen_${this.colorSymbol}.png`;
    }

    isMovePossible(src: Coordinate, dest: Coordinate): boolean {
        return (
            Math.abs(dest.x - src.x) === Math.abs(dest.y - src.y) ||
            src.x === dest.x ||
            src.y === dest.y
        );
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate> {
        let straightLinePath: Array<Coordinate> =
            getPointsBetween2PointsOnStraightLine(src, dest);
        let diagonalPath: Array<Coordinate> = getPointsBetween2PointsOnDiagonal(
            src,
            dest
        );

        return [...straightLinePath, ...diagonalPath];
    }

    getPossibleMoves(curPos: Coordinate): Array<Coordinate> {
        return [];
    }
}
