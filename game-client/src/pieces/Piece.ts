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
    WHITE,
    RANDOM
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

    getPointsBetween2PointsOnCol(
        p1: Coordinate,
        p2: Coordinate
    ): Array<Coordinate> {
        let path = [];
        let startRow = Math.min(p1.y, p2.y),
            endRow = Math.max(p1.y, p2.y);

        for (let row = startRow + 1; row < endRow; row++) {
            path.push({
                x: p1.x,
                y: row
            });
        }

        return path;
    }

    getPointsBetween2PointsOnRow(
        p1: Coordinate,
        p2: Coordinate
    ): Array<Coordinate> {
        let path = [];
        let startCol = Math.min(p1.x, p2.x),
            endCol = Math.max(p1.x, p2.x);

        for (let col = startCol + 1; col < endCol; col++) {
            path.push({
                x: col,
                y: p1.y
            });
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

    getPossibleMovesOnColAndRow(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate> {
        let moves = [];

        let x = curPos.x,
            y = curPos.y + 1;

        // top
        while (y < 8 && squares[y][x]?.color !== this.color) {
            moves.push({ x, y });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            y++;
        }

        // down
        y = curPos.y - 1;
        while (y >= 0 && squares[y][x]?.color !== this.color) {
            moves.push({ x, y });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            y--;
        }

        // left
        x = curPos.x - 1;
        y = curPos.y;
        while (x >= 0 && squares[y][x]?.color !== this.color) {
            moves.push({ x, y });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x--;
        }

        // right
        x = curPos.x + 1;
        while (x < 8 && squares[y][x]?.color !== this.color) {
            moves.push({ x, y });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x++;
        }

        return moves;
    }

    getPossibleMovesOnDiagonal(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate> {
        let moves = [];

        // top left
        let x = curPos.x - 1,
            y = curPos.y + 1;
        while (x >= 0 && y < 8 && squares[y][x]?.color !== this.color) {
            moves.push({ x, y });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x--;
            y++;
        }

        // top right
        x = curPos.x + 1;
        y = curPos.y + 1;
        while (x < 8 && y < 8 && squares[y][x]?.color !== this.color) {
            moves.push({
                x,
                y
            });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x++;
            y++;
        }

        // bottom left
        x = curPos.x - 1;
        y = curPos.y - 1;
        while (x >= 0 && y >= 0 && squares[y][x]?.color !== this.color) {
            moves.push({
                x,
                y
            });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x--;
            y--;
        }

        // bottom right
        x = curPos.x + 1;
        y = curPos.y - 1;
        while (x < 8 && y >= 0 && squares[y][x]?.color !== this.color) {
            moves.push({
                x,
                y
            });

            if (this.meetFirstOpponent(squares[y][x])) {
                break;
            }

            x++;
            y--;
        }

        return moves;
    }

    meetFirstOpponent(piece: Piece | null): boolean {
        return piece !== null && piece?.color !== this.color;
    }
}
