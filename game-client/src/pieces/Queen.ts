import { Coordinate } from '../@types/coordinate';
import Piece, { PieceColor, PieceName } from './Piece';

export default class Queen extends Piece {
    constructor(name: PieceName, player: number, color: PieceColor) {
        super(name, 9, player, color);
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
        let colPath: Array<Coordinate> = [],
            rowPath: Array<Coordinate> = [],
            diagonalPath: Array<Coordinate> = [];

        if (src.x === dest.x) {
            colPath.push(...this.getPointsBetween2PointsOnCol(src, dest));
        } else if (src.y === dest.y) {
            rowPath.push(...this.getPointsBetween2PointsOnRow(src, dest));
        } else {
            diagonalPath.push(
                ...this.getPointsBetween2PointsOnDiagonal(src, dest)
            );
        }

        return [...colPath, ...rowPath, ...diagonalPath];
    }

    getPossibleMoves(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate> {
        return [
            ...this.getPossibleMovesOnColAndRow(curPos, squares),
            ...this.getPossibleMovesOnDiagonal(curPos, squares)
        ];
    }
}
