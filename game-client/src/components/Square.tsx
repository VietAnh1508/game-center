import styled from 'styled-components';

import Piece from '../pieces/Piece';

interface StyleSquareProps {
    size: number;
    isShade: boolean;
    isHighlight: boolean;
}

const StyledSquare = styled.div<StyleSquareProps>`
    width: ${(p) => p.size}px;
    background-color: ${(p) => {
        if (p.isShade) {
            return p.isHighlight ? '#bbca2b' : '#769656';
        }
        return p.isHighlight ? '#f6f668' : '#eeeed2';
    }};
    display: grid;
    place-content: center;
`;

interface StyledPieceProps {
    size: number;
    background: string;
}

const ChessPiece = styled.div<StyledPieceProps>`
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;
    background-image: url('${(p) => p.background}');
    background-repeat: no-repeat;
    background-position: center;

    &:hover {
        cursor: grab;
    }

    &:active {
        cursor: grabbing;
    }
`;

const Hint = styled.div`
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    width: 25px; // TODO: dynamic value
    height: 25px;
`;

interface Props {
    size: number;
    isShade: boolean;
    isHighlight: boolean;
    isHint: boolean;
    piece: Piece | null;
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
            {props.isHint && <Hint />}
        </StyledSquare>
    );
};

export default Square;
