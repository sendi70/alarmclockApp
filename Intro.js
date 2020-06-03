import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import * as Font from "expo-font";
import Database from './Database'

class Intro extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false,
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/fonts/Roboto-Thin.ttf'),
        });

        Database.createTable();

        this.setState({ fontloaded: true })
    }

    render() {
        const { navigate } = this.props.navigation;
        const styles = StyleSheet.create({
            header: {
                flex: 1,
                backgroundColor: "#FFBA1C",
                justifyContent: "center",
            },
            header_text: {
                fontSize: 70,
                color: "#303030",
                alignSelf: "center",
                fontFamily: 'myfont',
            },
            header_subtitle: {
                fontSize: 30,
                color: "#303030",
                alignSelf: "center",
                fontFamily: 'myfont',
            },
            pannel_box: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#303030'
            },
            bt_start: {
                alignSelf: "center",
                width: 160,
                borderWidth: 2,
                padding: 20,
                borderColor: '#FFBA1C',
            }
        });

        //onPress={() => }
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    {
                        this.state.fontloaded ?
                            <View>
                                <Text style={styles.header_text}>
                                    SQLite App
                            </Text>
                                <Text style={styles.header_subtitle}>
                                    manage sqlite, use animation and ring
                            </Text>
                            </View>
                            :
                            null
                    }
                </View>
                <View style={styles.pannel_box}>
                    <TouchableOpacity style={styles.bt_start} onPress={() => navigate("Main")} >
                        <Text style={{ alignSelf: "center", color: "#FFBA1C" }}>
                            START
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Intro