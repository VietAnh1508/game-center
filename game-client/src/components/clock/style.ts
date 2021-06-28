import styled from 'styled-components';

interface StyledClockProps {
    backgroundColor: string;
    textColor: string;
}

export const StyledClock = styled.div<StyledClockProps>`
    grid-column: 3 / 4;
    grid-row: 1;
    height: 40px;
    width: 140px;
    background-color: ${(p) => p.backgroundColor};
    color: ${(p) => p.textColor};
    border-radius: 0.3rem;
    display: grid;
    grid-template-columns: 50px auto;
    align-items: center;
`;

interface ClockIconProps {
    hide: boolean;
}

export const ClockIcon = styled.div<ClockIconProps>`
    width: 50px;
    height: 40px;
    display: grid;
    place-content: center;
    opacity: ${(p) => (p.hide ? '0' : '1')};
`;

export const svgStyle = {
    transform: 'rotate(16830deg)'
};

export const Time = styled.span`
    text-align: center;
    font-size: 1.2rem;
`;
