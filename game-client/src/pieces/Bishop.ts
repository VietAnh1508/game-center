import Piece, { PieceColor } from './Piece';

export default class Bishop extends Piece {
    constructor(player: number, color: PieceColor) {
        super(player, color);
        this.icon = `assets/images/bishop_${this.colorSymbol}.png`;
    }

    isMovePossible(src: number, dest: number) {
        return true;
    }

    getSrcToDestPath(src: number, dest: number) {
        return [];
    }
}
