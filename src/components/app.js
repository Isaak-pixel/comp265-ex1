import React from 'react';
import Game from './game'

class App extends React.Component {
    render() {
        return (
            <Game randomNumCount = {6}
            initialSecs = {10} />
        );
    }
}

export default App;
