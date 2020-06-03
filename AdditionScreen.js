import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions, Text, Vibration } from 'react-native';
import SoundPlayer from 'react-native-sound-player'

import * as Font from "expo-font";
import Database from './Database';
import TimerDots from './TimerDots';

class AdditionScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false,
            mode: "hours",
            hours: "00",
            minutes: "00",
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/fonts/Roboto-Thin.ttf'),
        });
        this.setState({ fontloaded: true })

    }

    render() {
        const { navigate } = this.props.navigation;

        const vibrate_click = 100;
        const virate_ring = [1000, 2000, 3000];

        var func = this.props.navigation.state.params.func
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: "#FFBA1C",
                alignItems: "center",
            },
            timer_cont: {
                margin: 20,
                flexDirection: "row",
            },
            timer_cont_text_chosen: {
                fontSize: 120,
                color: "#FFFFFF",
                fontFamily: "myfont",
            },
            timer_cont_text: {
                fontSize: 120,
                color: "#303030",
                fontFamily: "myfont",
            },
            timerAnchorMin: {
                width: 0,
                height: 0,
                position: "absolute",
                top: Dimensions.get("window").height / 2,
                left: Dimensions.get("window").width / 2 - 20,
            },
            timerAnchorHour: {
                width: 0,
                height: 0,
                position: "absolute",
                top: Dimensions.get("window").height / 2,
                left: Dimensions.get("window").width / 2 - 40,
            },
            bt_add: {
                position: "absolute",
                bottom: 10,
                left: (Dimensions.get("window").width - 80) / 2,
                width: 100,
                height: 100,
                backgroundColor: "#303030",
                padding: 20,
                borderRadius: 100,
                marginBottom: 10,
            },
            bt_add_img: {
                width: 60,
                height: 60,
                resizeMode: 'stretch',
            },
        });

        setValue = async (value) => {
            var valueAdd

            if (value < 10) valueAdd = "0" + value;
            else valueAdd = "" + value;

            if (this.state.mode == "hours") this.setState({ hours: valueAdd })
            else this.setState({ minutes: valueAdd })
        }

        var dotsMin = []
        for (var i = 0; i < 60; i++) {
            let angle = i * -0.10471975506 - 3.14
            let posX, posY

            if (i % 3 == 0) {
                posX = Math.sin(angle) * 175
                posY = Math.cos(angle) * 175
            } else if (i % 3 == 1) {
                posX = Math.sin(angle) * 135
                posY = Math.cos(angle) * 135

            }

            dotsMin.push(<TimerDots size={1} key={i} number={i} posX={posX} posY={posY} setValue={setValue} />)
        }

        var dotsHour = []
        for (var i = 0; i < 24; i++) {
            let angle = i * -0.5235987773 - 3.14
            let posX, posY

            if (i < 12) {
                posX = Math.sin(angle) * 165
                posY = Math.cos(angle) * 165
            } else {
                posX = Math.sin(angle) * 115
                posY = Math.cos(angle) * 115
            }
            dotsHour.push(<TimerDots size={1.2} key={i} number={i} posX={posX} posY={posY} setValue={setValue} />)
        }

        //onPress={() => }
        return (
            <View style={styles.container}>
                <View style={styles.timer_cont}>
                    {
                        this.state.mode == "hours" ?
                            <View style={{ flexDirection: "row", }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ mode: "hours" });
                                    Vibration.vibrate(vibrate_click)
                                }}>
                                    <Text style={styles.timer_cont_text_chosen}>{this.state.hours}</Text>
                                </TouchableOpacity>
                                <Text style={styles.timer_cont_text}> : </Text>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ mode: "minutes" });
                                    Vibration.vibrate(vibrate_click)
                                }}>
                                    <Text style={styles.timer_cont_text}>{this.state.minutes}</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ flexDirection: "row", }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ mode: "hours" });
                                    Vibration.vibrate(vibrate_click)
                                }}>
                                    <Text style={styles.timer_cont_text}>{this.state.hours}</Text>
                                </TouchableOpacity>
                                <Text style={styles.timer_cont_text}> : </Text>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ mode: "minutes" });
                                    Vibration.vibrate(vibrate_click)
                                }}>
                                    <Text style={styles.timer_cont_text_chosen}>{this.state.minutes}</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
                {
                    this.state.mode == "hours" ?
                        <View style={styles.timerAnchorHour}>
                            {dotsHour}
                        </View>
                        :
                        <View style={styles.timerAnchorMin}>
                            {dotsMin}
                        </View>
                }
                <TouchableOpacity style={styles.bt_add} onPress={() => {
                    //console.log("Eloszka")
                    var days = { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false }
                    Database.add(this.state.hours, this.state.minutes, "false", JSON.stringify(days));
                    navigate("Main");
                    func()
                }}>
                    <Image style={styles.bt_add_img} source={require('../assets/images/plus.png')} />
                </TouchableOpacity>

            </View>
        );
    }
}

export default AdditionScreen