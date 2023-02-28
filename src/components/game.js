import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, Button, StyleSheet} from 'react-native';
import RandomNumber from './randomNum';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {
    static propTypes = {
        randomNumCount: PropTypes.number.isRequired,
        initialSecs: PropTypes.number.isRequired,
        onPlayAgain:  PropTypes.func.isRequired,
    };

    state = {
        selectedIds: [],
        remainingSecs: this.props.initialSecs,
    };
    gameStatus = 'PLAYING';
    randomNumbers = Array
        .from({length: this.props.randomNumCount})
        .map(() => 1 + Math.floor(15 * Math.random()));
    target = this.randomNumbers
    .slice(0, this.props.randomNumCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

    shuffledRandomNumbers = shuffle(this.randomNumbers);

    componentDidMount() {
        this.intervalId = setInterval (() => {
            this.setState((prevState) => {
                return{remainingSecs: prevState.remainingSecs - 1};
            }, () => {
                if (this.state.remainingSecs === 0) {
                    clearInterval(this.intervalId)
                }
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    };

    isNumSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
        selectedIds: [...prevState.selectedIds, numberIndex],
        }));
    };

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (nextState.selectedIds !== this.state.selectedIds || nextState.remainingSecs === 0) {
            this.gameStatus = this.calcGameStatus(nextState);
            if (this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId);
            }
        }
    }

    calcGameStatus = (nextState) => {
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        if (nextState.remainingSecs === 0) {
            return 'LOST';
        }
        if (sumSelected < this.target) {
            return 'PLAYING';
        }
        if (sumSelected === this.target) {
            return 'WON';
        }
        if (sumSelected > this.target) {
            return 'LOST';
        }
    }

    render() {
        const gameStatus = this.gameStatus;
        return (
            <View style={styles.container}>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.shuffledRandomNumbers.map((randomNumber, index) =>
                        <RandomNumber
                        key = {index}
                        id = {index}
                        number = {randomNumber}
                        isDisabled = {this.isNumSelected(index) || gameStatus !== 'PLAYING'}
                        onPress = {this.selectNumber}
                        />
                    )}
                </View>
                <Text style={styles.remainingSecs}>{this.state.remainingSecs}</Text>
                {this.gameStatus !== 'PLAYING' && (
                    <Button title="Play Again" onPress={this.props.onPlayAgain} />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00a2ff',
        flex: 1,
        paddingTop: 30,
    },

    target: {
    fontSize: 50,
    backgroundColor: '#aaa',
    margin: 50,
    textAlign: 'center',
    },

    randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    },

    STATUS_PLAYING: {
        backgroundColor: '#bbb',
    },

    STATUS_WON: {
        backgroundColor: '#32CD32',
    },

    STATUS_LOST: {
        backgroundColor: '#FF6347',
    },

    remainingSecs: {
        textAlign: 'center',
        paddingBottom: 100,
        fontSize: 30,
        fontWeight: 'bold',

    }

});

export default Game;
