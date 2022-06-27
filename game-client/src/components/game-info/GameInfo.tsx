import React, { useContext } from 'react';
import { GameContext } from '../../context/game-context';
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
    handleSelectPieceColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectTimeLimit: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    startGame: (e: React.MouseEvent) => void;
}

const GameInfo: React.FunctionComponent<Props> = (props) => {
    const [state] = useContext(GameContext);

    return (
        <Panel>
            <span>I play as</span>
            <ModeSelectionBlock>
                <ModeSelectionBox
                    selectedColor={state.selectedColor}
                    pieceColor={PieceColor.WHITE}
                >
                    <ModeSelectionRadio
                        name='selectedColor'
                        value={PieceColor[PieceColor.WHITE]}
                        onChange={props.handleSelectPieceColor}
                    />
                </ModeSelectionBox>
                <ModeSelectionBox
                    selectedColor={state.selectedColor}
                    pieceColor={PieceColor.RANDOM}
                >
                    <ModeSelectionRadio
                        name='selectedColor'
                        value={PieceColor[PieceColor.RANDOM]}
                        onChange={props.handleSelectPieceColor}
                    />
                </ModeSelectionBox>
                <ModeSelectionBox
                    selectedColor={state.selectedColor}
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
                    value={state.selectedTimeLimit}
                    onChange={props.handleSelectTimeLimit}
                >
                    {state.timeLimits.map((time: number) => (
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
