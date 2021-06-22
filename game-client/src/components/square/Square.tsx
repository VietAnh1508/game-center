import {
    StyledSquare,
    ChessPiece,
    CaptureHint,
    Hint,
    CoordinateLabel
} from './style';

import Piece from '../../pieces/Piece';

interface Props {
    size: number;
    isShade: boolean;
    isHighlight: boolean;
    isHint: boolean;
    piece: Piece | null;
    xCoordinateLabel: string | null;
    yCoordinateLabel: string | null;
}

const Square: React.FunctionComponent<Props> = (props) => {
    return (
        <StyledSquare
            size={props.size}
            isShade={props.isShade}
            isHighlight={props.isHighlight}
        >
            {props.piece && (
                <ChessPiece
                    size={props.size}
                    background={props.piece.icon}
                    className='chess-piece'
                />
            )}
            {props.isHint &&
                (props.piece ? <CaptureHint size={props.size} /> : <Hint />)}
            {props.xCoordinateLabel && (
                <CoordinateLabel isShade={props.isShade} isXAxis={true}>
                    {props.xCoordinateLabel}
                </CoordinateLabel>
            )}
            {props.yCoordinateLabel && (
                <CoordinateLabel isShade={props.isShade} isXAxis={false}>
                    {props.yCoordinateLabel}
                </CoordinateLabel>
            )}
        </StyledSquare>
    );
};

export default Square;
