import React from 'react';
import Game from './game'

class App extends React.Component {
    state = {
        gameId: 1,
    };
    resetGame = () => {
        this.setState((prevState) => {
            return {gameId: prevState.gameId + 1};
        })
    };
    render() {
        return (
            <Game key={this.state.gameId}
            onPlayAgain = {this.resetGame}
            randomNumCount = {6}
            initialSecs = {10} />
        );
    }
}

export default App;
