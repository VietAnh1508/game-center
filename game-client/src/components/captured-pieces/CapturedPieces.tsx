import Piece, { PieceColor } from '../../pieces/Piece';
import { Panel, CapturedPiece } from './style';

export interface Props {
    color: PieceColor;
    capturedPieces: Array<Piece | null>;
}

/**
 * Piece name by index (define by PieceName enum in Piece.tsx)
 * 0: PAWN
 * 1: KNIGHT
 * 2: BISHOP
 * 3: ROOK
 * 4: QUEEN
 */

const blackPieces: any = {
    '0-1': {
        // 1 pawn
        x: -1,
        y: -595,
        width: 12,
        height: 16
    },
    '0-2': {
        // 2 pawns
        x: -1,
        y: -570,
        width: 19,
        height: 16
    },
    '0-3': {
        // 3 pawns
        x: -1,
        y: -545,
        width: 26,
        height: 16
    },
    '0-4': {
        // 4 pawns
        x: -1,
        y: -520,
        width: 33,
        height: 16
    },
    '0-5': {
        // 5 pawns
        x: -1,
        y: -495,
        width: 40,
        height: 16
    },
    '0-6': {
        // 6 pawns
        x: -1,
        y: -470,
        width: 47,
        height: 16
    },
    '0-7': {
        // 7 pawns
        x: -1,
        y: -445,
        width: 54,
        height: 16
    },
    '0-8': {
        // 8 pawns
        x: -1,
        y: -420,
        width: 61,
        height: 16
    },
    '1-1': {
        // 1 knight
        x: -95,
        y: -443,
        width: 16,
        height: 18
    },
    '1-2': {
        // 2 knights
        x: -95,
        y: -418,
        width: 23,
        height: 18
    },
    '2-1': {
        // 1 bishop
        x: -68,
        y: -443,
        width: 14,
        height: 18
    },
    '2-2': {
        // 2 bishops
        x: -68,
        y: -418,
        width: 22,
        height: 18
    },
    '3-1': {
        // 1 rook
        x: -121,
        y: -444,
        width: 15,
        height: 17
    },
    '3-2': {
        // 2 rooks
        x: -121,
        y: -419,
        width: 22,
        height: 17
    },
    '4-1': {
        // queen
        x: -145,
        y: -418,
        width: 18,
        height: 18
    }
};

const CapturedPieces: React.FunctionComponent<Props> = (props) => {
    let piecesCount: number[] = [0, 0, 0, 0, 0];
    for (let piece of props.capturedPieces) {
        piecesCount[piece!.name]++;
    }

    return (
        <Panel>
            {piecesCount
                .map((el, index) => `${index}-${el}`)
                .map((piece) => {
                    const pieceInfo: any = blackPieces[piece];
                    if (!pieceInfo) {
                        return null;
                    }
                    return (
                        <CapturedPiece
                            key={`${piece}`}
                            x={
                                props.color === PieceColor.BLACK
                                    ? pieceInfo.x
                                    : pieceInfo.x - 359
                            }
                            y={pieceInfo.y}
                            width={pieceInfo.width}
                            height={pieceInfo.height}
                        />
                    );
                })}
        </Panel>
    );
};

export default CapturedPieces;
