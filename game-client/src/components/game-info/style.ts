import styled from 'styled-components';
import { PieceColor } from '../../pieces/Piece';

export const Panel = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 300px;
    height: 640px;
    background-color: white;
`;

export const ModeSelectionBlock = styled.div`
    display: block;
`;

interface ModeSelectionBoxProps {
    selectedColor: PieceColor;
    pieceColor: PieceColor;
}

export const ModeSelectionBox = styled.div<ModeSelectionBoxProps>`
    width: 2rem;
    height: 2rem;
    background-image: ${(p) => {
        switch (p.pieceColor) {
            case PieceColor.WHITE:
                return 'url("assets/images/king_w.png")';
            case PieceColor.RANDOM:
                return 'url("assets/images/question-mark.png")';
            case PieceColor.BLACK:
                return 'url("assets/images/king_b.png")';
        }
    }};
    background-size: contain;
    background-repeat: no-repeat;
    display: inline-block;
    border: ${(p) =>
        p.selectedColor === p.pieceColor ? '2px solid #7fa650' : 'none'};
`;

export const ModeSelectionRadio = styled.input.attrs({
    type: 'radio'
})`
    width: 100%;
    height: 100%;
    opacity: 0;
`;
