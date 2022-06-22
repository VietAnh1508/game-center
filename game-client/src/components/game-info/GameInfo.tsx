import React from 'react';
import { PieceColor } from '../../pieces/Piece';
import {
    Panel,
    ModeSelectionBlock,
    ModeSelectionBox,
    ModeSelectionRadio,
    SelectTimeBox,
    PlayButton,
    Footer
} from './style';

interface Props {
    selectedColor: PieceColor;
    timeLimits: Array<number>;
    selectedTime: number;
    handleSelectPieceColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectTimeLimit: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    startGame: (e: React.MouseEvent) => void;
}

const GameInfo: React.FunctionComponent<Props> = (props) => {
    return (
        <Panel>
            <span>I play as</span>
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
            <SelectTimeBox>
                <label htmlFor='countdown'>Select time limit</label>
                <select
                    name='time'
                    id='countdown'
                    value={props.selectedTime}
                    onChange={props.handleSelectTimeLimit}
                >
                    {props.timeLimits.map((time) => (
                        <option key={time} value={time}>{`${time} min`}</option>
                    ))}
                </select>
            </SelectTimeBox>
            <Footer>
                <PlayButton onClick={props.startGame}>Play</PlayButton>
            </Footer>
        </Panel>
    );
};

export default GameInfo;
