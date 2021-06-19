import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 40px auto 40px;
    row-gap: 10px;
    place-content: center;
    height: 100vh;
    background-color: #51504d;
`;

export const PlayerSection = styled.div`
    grid-column: 1 / 2;
    width: 560px;
    justify-self: center;
    display: grid;
    grid-template-columns: 40px auto 140px;
    grid-template-rows: 20px 20px;
    column-gap: 5px;
`;
