import Piece, { PieceColor, Coordinate, PieceName } from './Piece';

export default class Bishop extends Piece {
    constructor(name: PieceName, player: number, color: PieceColor) {
        super(name, 3, player, color);
        this.icon = `assets/images/bishop_${this.colorSymbol}.png`;
    }

    isMovePossible(src: Coordinate, dest: Coordinate): boolean {
        return Math.abs(dest.x - src.x) === Math.abs(dest.y - src.y);
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate> {
        return this.getPointsBetween2PointsOnDiagonal(src, dest);
    }

    getPossibleMoves(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate> {
        return this.getPossibleMovesOnDiagonal(curPos, squares);
    }
}
