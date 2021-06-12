import Piece, { PieceColor, Coordinate } from './Piece';
import { getPointsBetween2PointsOnStraightLine } from '../helpers/helper';

export default class Rook extends Piece {
    constructor(player: number, color: PieceColor) {
        super(player, color);
        this.icon = `assets/images/rook_${this.colorSymbol}.png`;
    }

    isMovePossible(src: Coordinate, dest: Coordinate): boolean {
        return src.x === dest.x || src.y === dest.y;
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate> {
        return [...getPointsBetween2PointsOnStraightLine(src, dest)];
    }

    getPossibleMoves(curPos: Coordinate): Array<Coordinate> {
        return [];
    }
}
