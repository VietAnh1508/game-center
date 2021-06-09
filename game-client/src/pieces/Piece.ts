// interface Coordinate {
//     x: number;
//     y: number;
// }

export enum PieceName {
    ROOK,
    KNIGHT,
    BISHOP,
    QUEEN,
    KING
}

export enum PieceColor {
    BLACK,
    WHITE
}

export interface PieceInterface {
    player: number;
    color: PieceColor;
    icon: string;

    isMovePossible(src: number, dest: number): boolean;
    getSrcToDestPath(src: number, dest: number): Array<number>;
}

export default abstract class Piece implements PieceInterface {
    player: number;
    color: PieceColor;
    colorSymbol: string;
    icon: string;

    constructor(player: number, color: PieceColor) {
        this.player = player;
        this.color = color;
        this.colorSymbol = color === PieceColor.WHITE ? 'w' : 'b';
        this.icon = ``;
    }

    abstract isMovePossible(src: number, dest: number): boolean;
    abstract getSrcToDestPath(src: number, dest: number): Array<number>;
}
