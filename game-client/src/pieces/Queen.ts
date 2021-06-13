import Piece, { PieceColor, Coordinate } from './Piece';

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
            this.getPointsBetween2PointsOnColAndRow(src, dest);
        let diagonalPath: Array<Coordinate> =
            this.getPointsBetween2PointsOnDiagonal(src, dest);

        return [...straightLinePath, ...diagonalPath];
    }

    getPossibleMoves(curPos: Coordinate): Array<Coordinate> {
        return [];
    }
}
