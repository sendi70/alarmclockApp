import React, { Component } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Vibration } from 'react-native';

import * as Font from "expo-font";
import ListItem from './ListItem';
import Database from './Database'

class Main extends Component {
    static navigationOptions = {
        title: "Ring List",
        headerStyle: {
            backgroundColor: "#ffffff",
        },
        headerTitleStyle: {
            color: "#303030"
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false,
            table: [],
            refresh: false
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/fonts/Roboto-Thin.ttf'),
        });

        var table = []

        //Database.dropTable()
        Database.getAll()
            .then((all) => {
                table = JSON.parse(all).rows._array
                this.setState({ fontloaded: true, table: table })

            }).catch((err) => {
                this.setState({ fontloaded: true, table: [] })
            })


        setInterval(() => this.checkHour(), 2500)

    }

    refresh = async () => {
        console.log("GITÓWA");
        Database.getAll()
            .then((all) => {
                table = JSON.parse(all).rows._array
                // console.log("No co jest: ", table)

                this.setState({ fontloaded: true, table: table })
                console.log("Here: " + table)
            })
    }

    deleteRing = async (id) => {
        this.setState({ fontloaded: false, })
        console.log("I'll delete u: ", id)
        Database.remove(id)

        var newTable = this.state.table.filter(function (e) {
            return e.id != id
        })

        var temp = this.state.refresh
        temp = !temp
        console.log("NOwa", newTable)
        this.setState({ table: newTable, refresh: temp, fontloaded: true })
    }

    updateRing = async (days, state, id) => {
        console.log("Updating days in: ", id)
        //console.log(days, state, id)
        Database.update(JSON.stringify(days), state, id)
    }

    checkHour = async () => {
        let date = new Date();
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let found = false
        const vibrate_ring = 1000;

        this.state.table.forEach(element => {
            if (element.state == "true") {
                // console.log(element.minutes, hours)
                // console.log(element.seconds, minutes)
                if (parseInt(element.minutes) == hours && parseInt(element.seconds) == minutes) {
                    found = true;
                }
                // else console.log("Time: DONT")
            }
        });

        if (found) Vibration.vibrate(vibrate_ring)
    }

    updateLocalActive = async (id, newState) => {
        let newTab = []
        this.state.table.forEach(element => {
            if (parseInt(element.id) == id) newTab.push({ days: element.days, id: element.id, minutes: element.minutes, seconds: element.seconds, state: "" + newState })
            else newTab.push(element)
        });
        this.setState({ table: newTab })
    }

    updateLocalDay = async (id, newDays) => {
        console.log("Local: ", id, newDays)
        let newTab = []

        this.state.table.forEach(element => {
            if (parseInt(element.id) == id) newTab.push({ days: newDays, id: element.id, minutes: element.minutes, seconds: element.seconds, state: element.state })
            else newTab.push(element)
        });
        console.log(newTab)
        this.setState({ table: newTab })
    }

    render() {
        const { navigate } = this.props.navigation;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: "#FFBA1C",
                alignItems: "center",
            },
            indicatorView: {
                flex: 10,
                alignItems: "center",
                justifyContent: "center",
            },
            list: {
                flex: 10,
            },
            bt_container: {
                position: "absolute",
                bottom: 10,
                height: 100,
                width: 600,
                alignItems: "center",
                justifyContent: 'center',
                flexDirection: "row",
            },
            bt_add: {
                width: 100,
                height: 100,
                backgroundColor: "#303030",
                padding: 20,
                borderRadius: 100,
                marginBottom: 10,
                marginHorizontal: 40,
            },
            bt_add_img: {
                width: 60,
                height: 60,
                resizeMode: 'stretch',
            },
            bt_refDel: {
                width: 80,
                height: 80,
                backgroundColor: "#303030",
                padding: 20,
                borderRadius: 100,
                marginBottom: 10,
            },
            bt_refDel_img: {
                width: 40,
                height: 40,
                resizeMode: 'stretch',
            },
        });

        //onPress={() => }
        return (
            <View style={styles.container}>
                {
                    this.state.fontloaded ?
                        <View style={styles.list}>
                            <FlatList
                                data={this.state.table}
                                renderItem={({ item }) => <ListItem key={item.id} id={item.id} minutes={item.minutes} seconds={item.seconds} active={item.state} days={item.days} deleteFunc={this.deleteRing} updateFunc={this.updateRing} updateLocalActive={this.updateLocalActive} updateLocalDay={this.updateLocalDay} />}
                                keyExtractor={(item, index) => item + index}
                                extraData={this.state.refresh}

                            />
                        </View>
                        :
                        <View style={styles.indicatorView}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>

                }
                <View style={styles.bt_container}>
                    <TouchableOpacity style={styles.bt_refDel} onPress={() => {
                        this.setState({ fontloaded: false, })
                        this.refresh()
                    }}>
                        <Image style={styles.bt_refDel_img} source={require('../assets/images/refresh.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bt_add} onPress={() => {
                        this.setState({ fontloaded: false, })
                        navigate("AdditionScreen", { func: () => this.refresh() })
                    }}>
                        <Image style={styles.bt_add_img} source={require('../assets/images/plus.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bt_refDel} onPress={() => {
                        this.setState({ fontloaded: false, })
                        Database.removeAll()
                        this.refresh()
                    }}>
                        <Image style={styles.bt_refDel_img} source={require('../assets/images/trashcan.png')} />
                    </TouchableOpacity>
                </View>

            </View>

        );
    }
}

export default Main