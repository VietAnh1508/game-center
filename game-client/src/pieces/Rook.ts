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
        let path: Array<Coordinate> = [];

        if (src.x === dest.x) {
            let startRow = Math.min(src.y, dest.y),
                endRow = Math.max(src.y, dest.y);

            for (let row = startRow + 1; row < endRow; row++) {
                path.push({
                    x: src.x,
                    y: row
                });
            }
        } else if (src.y === dest.y) {
            let startCol = Math.min(src.x, dest.x),
                endCol = Math.max(src.x, dest.x);

            for (let col = startCol + 1; col < endCol; col++) {
                path.push({
                    x: col,
                    y: src.y
                });
            }
        }

        return path;
    }
}
