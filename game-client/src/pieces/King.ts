import Piece, { PieceColor } from './Piece';

export default class King extends Piece {
    constructor(player: number, color: PieceColor) {
        super(player, color);
        this.icon = `assets/images/king_${this.colorSymbol}.png`;
    }

    isMovePossible(src: number, dest: number) {
        return (
            src - 9 === dest ||
            src - 8 === dest ||
            src - 7 === dest ||
            src + 1 === dest ||
            src + 9 === dest ||
            src + 8 === dest ||
            src + 7 === dest ||
            src - 1 === dest
        );
    }

    getSrcToDestPath(src: number, dest: number) {
        return [];
    }
}
