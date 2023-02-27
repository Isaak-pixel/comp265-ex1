import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, StyleSheet} from 'react-native'
import RandomNumber from './randomNum'

class Game extends React.Component {
    static propTypes = {
        randomNumCount: PropTypes.number.isRequired,
    };
    randomNumbers = Array
        .from({length: this.props.randomNumCount})
        .map(() => 1 + Math.floor(15 * Math.random()));
    target = this.randomNumbers
    .slice(0, this.props.randomNumCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
    // TODO: Shuffle the random numbers

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.randomNumbers.map((randomNumber, index) =>
                        <RandomNumber key={index} number={randomNumber} />
                    )}
                </View>
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

});

export default Game;
