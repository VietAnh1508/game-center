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
        isDestEnemyOccupied: boolean
    ): boolean;

    getSrcToDestPath(src: Coordinate, dest: Coordinate): Array<Coordinate>;

    getPossibleMoves(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate>;
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
        isDestEnemyOccupied: boolean
    ): boolean;

    abstract getSrcToDestPath(
        src: Coordinate,
        dest: Coordinate
    ): Array<Coordinate>;

    abstract getPossibleMoves(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate>;

    getPointsBetween2PointsOnColAndRow(
        p1: Coordinate,
        p2: Coordinate
    ): Array<Coordinate> {
        let path: Array<Coordinate> = [];

        if (p1.x === p2.x) {
            let startRow = Math.min(p1.y, p2.y),
                endRow = Math.max(p1.y, p2.y);

            for (let row = startRow + 1; row < endRow; row++) {
                path.push({
                    x: p1.x,
                    y: row
                });
            }
        } else if (p1.y === p2.y) {
            let startCol = Math.min(p1.x, p2.x),
                endCol = Math.max(p1.x, p2.x);

            for (let col = startCol + 1; col < endCol; col++) {
                path.push({
                    x: col,
                    y: p1.y
                });
            }
        }

        return path;
    }

    getPointsBetween2PointsOnDiagonal(
        p1: Coordinate,
        p2: Coordinate
    ): Array<Coordinate> {
        let path: Array<Coordinate> = [];

        let startX = -1,
            endX = -1,
            startY = -1,
            endY = -1;

        if (p1.x < p2.x) {
            startX = p1.x;
            endX = p2.x;

            startY = p1.y;
            endY = p2.y;
        } else {
            startX = p2.x;
            endX = p1.x;

            startY = p2.y;
            endY = p1.y;
        }

        let xCoordinates: Array<number> = [];
        for (let i = 1; i < endX - startX; i++) {
            xCoordinates.push(startX + i);
        }

        // note: the yAxis is upside down
        let yCoordinates: Array<number> = [];
        if (startY > endY) {
            for (let i = startY - 1; i > endY; i--) {
                yCoordinates.push(i);
            }
        } else {
            for (let i = 1; i < endY - startY; i++) {
                yCoordinates.push(startY + i);
            }
        }

        for (let i = 0, len = xCoordinates.length; i < len; i++) {
            path.push({
                x: xCoordinates[i],
                y: yCoordinates[i]
            });
        }

        return path;
    }

    meetFirstOpponent(piece: Piece | null): boolean {
        return piece !== null && piece?.color !== this.color;
    }
}
