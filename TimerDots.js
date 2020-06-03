import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Vibration } from 'react-native';

const TimerDots = ({ size, number, posX, posY, setValue }) => {
    const styles = StyleSheet.create({
        container: {
            width: 40 * size,
            height: 40 * size,
            top: posY,
            left: posX,
            position: 'absolute',
            fontFamily: "myfont",
            backgroundColor: "#303030",
            borderRadius: 20 * size,
            justifyContent: "center",
            alignItems: "center",
        },

    });
    const vibrate_click = 75;

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/fonts/Roboto-Thin.ttf'),
        });
        //fontLoad(true)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            console.log(number)
            setValue(number)
            Vibration.vibrate(vibrate_click)
        }}>
            <Text style={{ fontSize: 15 * size, color: "#FFFFFF" }}>{number}</Text>
        </TouchableOpacity>

    );
};

export default TimerDots














