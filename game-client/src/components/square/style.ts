import styled from 'styled-components';

interface StyleSquareProps {
    size: number;
    isShade: boolean;
    isHighlight: boolean;
}

export const StyledSquare = styled.div<StyleSquareProps>`
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

export const ChessPiece = styled.div<StyledPieceProps>`
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

export const Hint = styled.div`
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    width: 25px; // TODO: dynamic value
    height: 25px;
`;

interface CaptureHintProps {
    size: number;
}

export const CaptureHint = styled.div<CaptureHintProps>`
    border: 5px solid rgba(0, 0, 0, 0.1);
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;
    border-radius: 50%;
    position: absolute;
`;

interface CoordinateLabelProps {
    isShade: boolean;
}

const CoordinateLabel = styled.span<CoordinateLabelProps>`
    position: absolute;
    color: ${(p) => (p.isShade ? '#eeeed2' : '#769656')};
    font-weight: 600;
    user-select: none;
`;

export const XCoordinateLabel = styled(CoordinateLabel)`
    margin-top: 45px;
    margin-left: 60px;
`;

export const YCoordinateLabel = styled(CoordinateLabel)`
    padding-left: 4px;
`;
