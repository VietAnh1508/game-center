import Piece, { PieceColor, Coordinate } from './Piece';

export default class Bishop extends Piece {
    constructor(player: number, color: PieceColor) {
        super(player, color);
        this.icon = `assets/images/bishop_${this.colorSymbol}.png`;
    }

    isMovePossible(src: Coordinate, dest: Coordinate): boolean {
        return Math.abs(dest.x - src.x) === Math.abs(dest.y - src.y);
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate> {
        let path: Array<Coordinate> = [];

        let startX = -1,
            endX = -1,
            startY = -1,
            endY = -1;

        if (src.x < dest.x) {
            startX = src.x;
            endX = dest.x;
        } else {
            startX = dest.x;
            endX = src.x;
        }

        if (src.y < dest.y) {
            startY = src.y;
            endY = dest.y;
        } else {
            startY = dest.y;
            endY = src.y;
        }

        let xCoordinates: Array<number> = [];
        for (let i = 1; i < endY - startY; i++) {
            xCoordinates.push(startX + i);
        }

        // the yAxis is upside down
        let yCoordinates: Array<number> = [];
        for (let i = endY - startY - 1; i > 0; i--) {
            yCoordinates.push(startY + i);
        }

        for (let i = 0, len = xCoordinates.length; i < len; i++) {
            path.push({
                x: xCoordinates[i],
                y: yCoordinates[i]
            });
        }

        return path;
    }
}
