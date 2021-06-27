import Piece, { PieceColor, Coordinate, PieceName } from './Piece';

export default class Knight extends Piece {
    constructor(name: PieceName, player: number, color: PieceColor) {
        super(name, 3, player, color);
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

    getPossibleMoves(
        curPos: Coordinate,
        squares: Array<Array<Piece | null>>
    ): Array<Coordinate> {
        let moves = [
            {
                x: curPos.x - 2,
                y: curPos.y - 1
            },
            {
                x: curPos.x - 2,
                y: curPos.y + 1
            },
            {
                x: curPos.x - 1,
                y: curPos.y - 2
            },
            {
                x: curPos.x - 1,
                y: curPos.y + 2
            },
            {
                x: curPos.x + 1,
                y: curPos.y - 2
            },
            {
                x: curPos.x + 1,
                y: curPos.y + 2
            },
            {
                x: curPos.x + 2,
                y: curPos.y - 1
            },
            {
                x: curPos.x + 2,
                y: curPos.y + 1
            }
        ];

        // remove positions that capture my own pieces
        return moves.filter((pos) => {
            // remove positions outside of the board
            if (!squares[pos.y]) {
                return false;
            }

            const piece = squares[pos.y][pos.x];
            return (
                piece !== undefined &&
                (piece === null || piece.color !== this.color)
            );
        });
    }
}
