import { Avatar, Username } from './style';

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
