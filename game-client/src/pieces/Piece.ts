export interface Coordinate {
    x: number;
    y: number;
}

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

    isMovePossible(
        src: Coordinate,
        dest: Coordinate,
        destinationSquare: Piece | null
    ): boolean;
    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate>;
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

    abstract isMovePossible(
        src: Coordinate,
        dest: Coordinate,
        destinationSquare: Piece | null
    ): boolean;
    abstract getSrcToDestPath(
        src: Coordinate,
        dest: Coordinate
    ): Array<Coordinate>;
}
