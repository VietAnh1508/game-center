import React from 'react';
import { PieceColor } from '../../pieces/Piece';
import {
    Panel,
    ModeSelectionBlock,
    ModeSelectionBox,
    ModeSelectionRadio
} from './style';

interface Props {
    selectedColor: PieceColor;
    handleSelectPieceColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
    startGame: (e: React.MouseEvent) => void;
}

const GameInfo: React.FunctionComponent<Props> = (props) => {
    return (
        <Panel>
            <label>I play as</label>
            <ModeSelectionBlock>
                <ModeSelectionBox
                    selectedColor={props.selectedColor}
                    pieceColor={PieceColor.WHITE}
                >
                    <ModeSelectionRadio
                        name='selectedColor'
                        value={PieceColor[PieceColor.WHITE]}
                        onChange={props.handleSelectPieceColor}
                    />
                </ModeSelectionBox>
                <ModeSelectionBox
                    selectedColor={props.selectedColor}
                    pieceColor={PieceColor.RANDOM}
                >
                    <ModeSelectionRadio
                        name='selectedColor'
                        value={PieceColor[PieceColor.RANDOM]}
                        onChange={props.handleSelectPieceColor}
                    />
                </ModeSelectionBox>
                <ModeSelectionBox
                    selectedColor={props.selectedColor}
                    pieceColor={PieceColor.BLACK}
                >
                    <ModeSelectionRadio
                        name='selectedColor'
                        value={PieceColor[PieceColor.BLACK]}
                        onChange={props.handleSelectPieceColor}
                    />
                </ModeSelectionBox>
            </ModeSelectionBlock>
            <label htmlFor='countdoưn'>Select time limit</label>
            <select name='time' id='countdown'>
                <option value='3m'>3 min</option>
                <option value='5m'>5 min</option>
                <option value='10m'>10 min</option>
            </select>
            <br />
            <button onClick={props.startGame}>start</button>
        </Panel>
    );
};

export default GameInfo;
