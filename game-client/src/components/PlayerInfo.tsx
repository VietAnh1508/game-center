import styled from 'styled-components';

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
    isGameStarted?: boolean;
}

const PlayerInfo: React.FunctionComponent<Props> = (props) => {
    return (
        <>
            <Avatar imageUrl={props.userAvatar} />
            <Username>{props.username}</Username>
        </>
    );
};

export default PlayerInfo;
