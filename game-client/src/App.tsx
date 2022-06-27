import Game from './components/game/Game';

import { GameContextProvider } from './context/game-context';

function App() {
    return (
        <GameContextProvider>
            <Game />
        </GameContextProvider>
    );
}

export default App;
