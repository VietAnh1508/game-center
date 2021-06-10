import Piece, { PieceColor, Coordinate } from './Piece';

export default class Knight extends Piece {
    constructor(player: number, color: PieceColor) {
        super(player, color);
        this.icon = `assets/images/knight_${this.colorSymbol}.png`;
    }

    /**
     * [ ] [O] [ ] [O] [ ]
     * [O] [ ] [ ] [ ] [O]
     * [ ] [ ] [X] [ ] [ ]
     * [O] [ ] [ ] [ ] [O]
     * [ ] [O] [ ] [O] [ ]
     */
    isMovePossible(src: Coordinate, dest: Coordinate): boolean {
        if (
            src.x - 2 === dest.x &&
            (src.y - 1 === dest.y || src.y + 1 === dest.y)
        ) {
            return true;
        }
        if (
            src.x - 1 === dest.x &&
            (src.y - 2 === dest.y || src.y + 2 === dest.y)
        ) {
            return true;
        }
        if (
            src.x + 1 === dest.x &&
            (src.y - 2 === dest.y || src.y + 2 === dest.y)
        ) {
            return true;
        }
        if (
            src.x + 2 === dest.x &&
            (src.y - 1 === dest.y || src.y + 1 === dest.y)
        ) {
            return true;
        }
        return false;
    }

    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate> {
        // knight can jump over other pieces, so no need to validate the path
        return [];
    }
}