import styled from 'styled-components';

import Piece from '../pieces/Piece';

interface StyleSquareProps {
    size: number;
    color: string;
}

const StyledSquare = styled.div<StyleSquareProps>`
    width: ${(p) => p.size}px;
    background-color: ${(p) => (p.color === 'dark' ? '#769656' : '#eeeed2')};
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
    color: string;
    piece: Piece | null;
}

const Square: React.FunctionComponent<Props> = (props) => {
    return (
        <StyledSquare size={props.size} color={props.color}>
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
