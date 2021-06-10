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
}
