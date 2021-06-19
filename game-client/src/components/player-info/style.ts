import styled from 'styled-components';

interface AvatarProps {
    imageUrl: string;
}

export const Avatar = styled.div<AvatarProps>`
    grid-column: 1 / 2;
    background-image: url('${(p) => p.imageUrl}');
    background-repeat: no-repeat;
    background-position: center;
    height: 40px;
`;

export const Username = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    color: white;
    font-weight: bold;
`;
