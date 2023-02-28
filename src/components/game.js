import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, StyleSheet} from 'react-native'
import RandomNumber from './randomNum'

class Game extends React.Component {
    static propTypes = {
        randomNumCount: PropTypes.number.isRequired,
        initialSecs: PropTypes.number.isRequired,
    };

    state = {
        selectedIds: [],
        remainingSecs: this.props.initialSecs,
    };

    randomNumbers = Array
        .from({length: this.props.randomNumCount})
        .map(() => 1 + Math.floor(15 * Math.random()));
    target = this.randomNumbers
    .slice(0, this.props.randomNumCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
    // TODO: Shuffle the random numbers

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
    }

    isNumSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
        selectedIds: [...prevState.selectedIds, numberIndex],
        }));
    };

    //gameStatus: Playing, Won, Lost
    gameStatus = () => {
        const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
            return acc + this.randomNumbers[curr];
        }, 0);
        if (this.state.remainingSecs === 0) {
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
        const gameStatus = this.gameStatus();
        return (
            <View style={styles.container}>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.randomNumbers.map((randomNumber, index) =>
                        <RandomNumber
                        key={index}
                        id = {index}
                        number={randomNumber}
                        isDisabled = {this.isNumSelected(index) || gameStatus !== 'PLAYING'}
                        onPress={this.selectNumber}
                        />
                    )}
                </View>
                <Text>{this.state.remainingSecs}</Text>
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

});

export default Game;
