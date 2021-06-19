import styled from 'styled-components';

export const StyledClock = styled.div`
    grid-column: 3 / 4;
    grid-row: 1;
    height: 40px;
    width: 140px;
    background-color: white;
    border-radius: 0.3rem;
    display: grid;
    grid-template-columns: 50px auto;
    align-items: center;
`;

export const ClockIcon = styled.div`
    width: 50px;
    height: 40px;
    display: grid;
    place-content: center;
`;

export const svgStyle = {
    transform: 'rotate(16830deg)'
};

export const Time = styled.span`
    text-align: center;
    font-size: 1.2rem;
`;
