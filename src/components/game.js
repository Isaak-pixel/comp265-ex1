import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, StyleSheet} from 'react-native'

class Game extends React.Component {
    static propTypes = {
        randomNumCount: PropTypes.number.isRequired,
    };
    randomNumbers = Array
        .from({length: this.props.randomNumCount})
        .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
    .slice(0, this.props.randomNumCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                {this.randomNumbers.map((randomNumber, index) =>
                    <Text key={index}>{randomNumber}</Text>
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
    fontSize: 40,
    backgroundColor: '#aaa',
    marginHorizontal: 50,
    textAlign: 'center',
    },
});

export default Game;
