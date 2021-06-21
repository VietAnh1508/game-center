import Piece, { PieceColor, Coordinate, PieceName } from './Piece';

export default class Rook extends Piece {
    constructor(name: PieceName, player: number, color: PieceColor) {
        super(name, player, color);
        this.icon = `assets/images/rook_${this.colorSymbol}.png`;
    }

    isMovePossible(src: Coordinate, dest: Coordinate): boolean {
        return src.x === dest.x || src.y === dest.y;
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate> {
        let path: Array<Coordinate> = [];

        if (src.x === dest.x) {
            path.push(...this.getPointsBetween2PointsOnCol(src, dest));
        } else if (src.y === dest.y) {
            path.push(...this.getPointsBetween2PointsOnRow(src, dest));
        }

        return path;
    }

    getPossibleMoves(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate> {
        return this.getPossibleMovesOnColAndRow(curPos, squares);
    }
}
