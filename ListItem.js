import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, Switch, Animated } from 'react-native';

import * as Font from "expo-font";
import DayButton from './DayButton';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false,
            s_state: false,
            height: new Animated.Value(40),
            expanded: false,

            deleteFunc: this.props.deleteFunc,
            updateFunc: this.props.updateFunc,
            updateLocalActive: this.props.updateLocalActive,
            updateLocalDay: this.props.updateLocalDay,

            id: this.props.id,
            minutes: this.props.minutes,
            seconds: this.props.seconds,
            active: (this.props.active == 'true'),
            days: JSON.parse(this.props.days),
            //days: [],
            temp_days: [],
            display_days: "",

            cont_display: "none",
            text_display: "flex",
        };

        this.toValue = 100
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/fonts/Roboto-Thin.ttf'),
        });

        var newDays = []

        if (this.state.days.Mon) newDays.push("Mon")
        if (this.state.days.Tue) newDays.push("Tue")
        if (this.state.days.Wed) newDays.push("Wed")
        if (this.state.days.Thu) newDays.push("Thu")
        if (this.state.days.Fri) newDays.push("Fri")
        if (this.state.days.Sat) newDays.push("Sat")
        if (this.state.days.Sun) newDays.push("Sun")

        console.log(newDays)
        this.setState({ fontloaded: true, temp_days: newDays, display_days: newDays.join() })
    }

    toggle = async () => {
        let newState = !this.state.expanded
        let newDisplay, newText;

        if (newState) this.toValue = 100
        else this.toValue = 40
        if (newState) {
            newDisplay = "flex"
            newText = "none"
        } else {
            newDisplay = "none"
            newText = "flex"
        }

        Animated.spring(this.state.height, {
            toValue: this.toValue,
        }).start();

        this.setState({
            expanded: newState,
            cont_display: newDisplay,
            text_display: newText,
        })
    }

    setActive = async (day, newActive) => {
        console.log(day, newActive)
        var newDays = this.state.days
        switch (day) {
            case "Mon":
                newDays.Mon = newActive
                break;
            case "Tue":
                newDays.Tue = newActive
                break;
            case "Wed":
                newDays.Wed = newActive
                break;
            case "Thu":
                newDays.Thu = newActive
                break;
            case "Fri":
                newDays.Fri = newActive
                break;
            case "Sat":
                newDays.Sat = newActive
                break;
            case "Sun":
                newDays.Sun = newActive
                break;
            default:
                console.log("Error: Lolz")
                break;
        }
        this.setState({ days: newDays })
        this.prescribe()
    }

    prescribe = async () => {
        var newDays = []
        if (this.state.days.Mon) newDays.push("Mon")
        if (this.state.days.Tue) newDays.push("Tue")
        if (this.state.days.Wed) newDays.push("Wed")
        if (this.state.days.Thu) newDays.push("Thu")
        if (this.state.days.Fri) newDays.push("Fri")
        if (this.state.days.Sat) newDays.push("Sat")
        if (this.state.days.Sun) newDays.push("Sun")

        this.setState({ temp_days: newDays, display_days: newDays.join() })
        this.state.updateFunc(this.state.days, this.state.active, this.state.id)
        this.state.updateLocalDay(this.state.id, JSON.stringify(this.state.days))
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                width: 350,
                flexDirection: "column",
                borderBottomWidth: 2,
                borderBottomColor: "#FFFFFF",
            },
            firstRow: {
                width: 350,
                flexDirection: "row",
                justifyContent: "center",
            },
            timer: {
                width: 300,
                fontSize: 80,
                color: "#FFFFFF",
                fontFamily: 'myfont',
            },
            switch: {
                justifyContent: "center",
                width: 50,
            },
            secondRow: {
                width: 350,
                flexDirection: "row",
                alignItems: "center"
            },
            image: {
                height: 30,
                width: 30,
                resizeMode: 'stretch',
            },
            imageReverse: {
                height: 30,
                width: 30,
                resizeMode: 'stretch',
                transform: [{ rotate: '180deg' }],
            },
            img_separator: {
                width: 280,
            },
            expandable_text: {
                marginVertical: 10,
                fontSize: 16,
                color: "#FFFFFF",
                display: this.state.text_display,
            },
            expandable_container: {
                flexDirection: "row",
                marginTop: 30,
                display: this.state.cont_display,
            }
        });

        var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        var array = days.map((elem, index) => {
            var active = true
            if (this.state.temp_days.includes(elem)) active = true
            else active = false

            return (<DayButton key={index} day={elem} setActive={this.setActive} active={active} />)
        });
        //console.log("dni: ", this.state.days)

        return (
            <View style={styles.container}>
                <View style={styles.firstRow}>
                    <Text style={styles.timer}>{this.state.minutes}:{this.state.seconds}</Text>
                    <View style={styles.switch}>
                        <Switch onValueChange={() => {
                            var newState = !this.state.active
                            this.setState({ active: newState })
                            this.state.updateFunc(this.state.days, !this.state.active, this.state.id)
                            this.state.updateLocalActive(this.state.id, newState)
                        }} value={this.state.active} />
                    </View>
                </View>
                <View style={styles.secondRow}>
                    <TouchableOpacity onPress={() => {
                        console.log("Delete")
                        console.log("dni: ", this.state.days)
                        this.state.deleteFunc(this.state.id)
                    }}>
                        <Image style={styles.image} source={require('../assets/images/trashcan.png')} />
                    </TouchableOpacity>

                    <View style={styles.img_separator}></View>
                    <TouchableOpacity onPress={() => {
                        console.log("Show/Hide")
                        this.toggle()
                    }}>
                        {
                            this.state.expanded ?
                                <Image style={styles.imageReverse} source={require('../assets/images/collapseArrow.png')} />
                                :
                                <Image style={styles.image} source={require('../assets/images/collapseArrow.png')} />
                        }
                    </TouchableOpacity>
                </View>
                <Animated.View style={{ width: 350, height: this.state.height, flexDirection: "column" }}>
                    <Text style={styles.expandable_text}>{this.state.display_days}</Text>
                    <View style={styles.expandable_container}>
                        {array}
                    </View>
                </Animated.View>

            </View>
        );
    }

    //Mon, Tue, Wed, Thu, Fri, Sat, Sun
};

export default ListItem


