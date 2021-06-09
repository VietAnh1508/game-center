import Piece, { PieceColor } from './Piece';

export default class Queen extends Piece {
    constructor(player: number, color: PieceColor) {
        super(player, color);
        this.icon = `assets/images/queen_${this.colorSymbol}.png`;
    }

    isMovePossible(src: number, dest: number) {
        return false;
    }

    getSrcToDestPath(src: number, dest: number) {
        return [];
    }
}
