import styled from 'styled-components';

export const Panel = styled.div`
    grid-column: 2 / 3;
    grid-row: 2;
    width: 100%;
`;

interface CapturedPieceProps {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const CapturedPiece = styled.span<CapturedPieceProps>`
    display: inline-block;
    background-image: url('assets/images/captured-pieces.png');
    background-repeat: no-repeat;
    background-position: ${(p) => p.x}px ${(p) => p.y}px;
    width: ${(p) => p.width}px;
    height: ${(p) => p.height}px;
    margin-right: 2px;
`;

export const CapturedPieceScore = styled.span`
    display: inline-block;
    color: hsla(0, 0%, 100%, 0.4);
    margin-left: 0.2rem;
`;
