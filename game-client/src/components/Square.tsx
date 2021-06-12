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

interface Props {
    size: number;
    isShade: boolean;
    isHighlight: boolean;
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
        </StyledSquare>
    );
};

export default Square;
