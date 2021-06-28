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

interface SvgClockAttrsProps {
    direction: number;
}

export const SvgClock = styled.svg.attrs<SvgClockAttrsProps>((props) => ({
    xmlns: 'http://www.w3.org/2000/svg',
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    style: {
        transform: `rotate(${props.direction}deg)`
    }
}))``;

export const Time = styled.span`
    text-align: center;
    font-size: 1.2rem;
`;
