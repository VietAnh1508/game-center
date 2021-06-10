import Piece, { PieceColor, Coordinate } from './Piece';
import { isSamePosition } from '../helpers/helper';

export default class King extends Piece {
    constructor(player: number, color: PieceColor) {
        super(player, color);
        this.icon = `assets/images/king_${this.colorSymbol}.png`;
    }

    isMovePossible(src: Coordinate, dest: Coordinate) {
        return (
            isSamePosition({ x: src.x - 1, y: src.y - 1 }, dest) ||
            isSamePosition({ x: src.x, y: src.y - 1 }, dest) ||
            isSamePosition({ x: src.x + 1, y: src.y - 1 }, dest) ||
            isSamePosition({ x: src.x - 1, y: src.y }, dest) ||
            isSamePosition({ x: src.x + 1, y: src.y }, dest) ||
            isSamePosition({ x: src.x - 1, y: src.y + 1 }, dest) ||
            isSamePosition({ x: src.x, y: src.y + 1 }, dest) ||
            isSamePosition({ x: src.x + 1, y: src.y + 1 }, dest)
        );
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate) {
        return [];
    }
}
