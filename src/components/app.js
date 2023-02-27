import React from 'react';

import {View, Text, StyleSheet} from 'react-native'

class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00a2ff',
        flex: 1,
    }
});

export default App;
