import styled from 'styled-components';
import { PieceColor } from '../../pieces/Piece';

export const Panel = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 500px;
    height: 640px;
    background-color: #302f2d;
    color: #fff;
    border-radius: 5px;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    justify-items: center;

    span {
        margin-bottom: 20px;
        align-self: end;
    }
`;

export const ModeSelectionBlock = styled.div`
    display: grid;
    gap: 5px;
`;

interface ModeSelectionBoxProps {
    selectedColor: PieceColor;
    pieceColor: PieceColor;
}

export const ModeSelectionBox = styled.div<ModeSelectionBoxProps>`
    width: 40px;
    height: 40px;
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
    border: ${(p) =>
        p.selectedColor === p.pieceColor ? '3px solid #7fa650' : 'none'};
    border-radius: 3px;
    grid-row: 1;
`;

export const ModeSelectionRadio = styled.input.attrs({
    type: 'radio'
})`
    width: 100%;
    height: 100%;
    opacity: 0;
`;

export const SelectTimeBox = styled.div`
    display: inline-block;

    label {
        margin-right: 10px;
    }
`;

export const Footer = styled.div`
    justify-self: stretch;
    padding: 1.6rem 2.4rem 2.8rem;
`;

export const PlayButton = styled.button`
    width: 100%;
    background-color: #95bb4a;
    color: #fff;
    font-weight: bold;
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0 0.5rem 0 0 #537133, 0 0.7rem 0.5rem 0.05rem rgba(0, 0, 0, 0.2);
    border: 0;
`;
