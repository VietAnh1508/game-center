import { Panel } from './style';

interface Props {
    startGame: (e: React.MouseEvent) => void;
}

const GameInfo: React.FunctionComponent<Props> = (props) => {
    return (
        <Panel>
            <button onClick={props.startGame}>start</button>
        </Panel>
    );
};

export default GameInfo;
