import styled from 'styled-components';

export interface Props {}

const Panel = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 300px;
    height: 640px;
    background-color: white;
`;

const GameInfo: React.FunctionComponent<Props> = () => {
    return <Panel>Info panel</Panel>;
};

export default GameInfo;
