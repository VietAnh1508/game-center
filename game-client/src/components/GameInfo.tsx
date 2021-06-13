import styled from 'styled-components';

const Panel = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 300px;
    height: 640px;
    background-color: white;
`;

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
