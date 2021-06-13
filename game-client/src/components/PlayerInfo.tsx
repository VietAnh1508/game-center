import styled from 'styled-components';

import Clock from './Clock';

const InfoPanel = styled.div`
    grid-column: 1 / 2;
    width: 560px;
    justify-self: center;
    display: grid;
    grid-template-columns: 40px auto 140px;
    grid-template-rows: 20px 20px;
    column-gap: 5px;
`;

interface AvatarProps {
    imageUrl: string;
}

const Avatar = styled.div<AvatarProps>`
    grid-column: 1 / 2;
    background-image: url('${(p) => p.imageUrl}');
    background-repeat: no-repeat;
    background-position: center;
    height: 40px;
`;

const Username = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    color: white;
    font-weight: bold;
`;

export interface Props {
    userAvatar: string;
    username: string;
}

const PlayerInfo: React.FunctionComponent<Props> = (props) => {
    return (
        <InfoPanel>
            <Avatar imageUrl={props.userAvatar} />
            <Username>{props.username}</Username>
            <Clock />
        </InfoPanel>
    );
};

export default PlayerInfo;
