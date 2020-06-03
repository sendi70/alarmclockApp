import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const DayButton = ({ day, active, setActive }) => {
    //const [active, setActive] = React.useState(true)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 5,
        },
        bt_nonActive: {
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            borderRadius: 10,
        },
        bt_active: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            padding: 4,
            borderRadius: 10,
        },
        bt_text_nonActive: {
            color: "#FFFFFF",
            fontSize: 15,
        },
        bt_text_active: {
            color: "#FFBA1C",
            fontSize: 15,
        }
    });

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/fonts/Roboto-Thin.ttf'),
        });

        //fontLoad(true)
    }

    return (
        <View style={styles.container}>
            {
                active ?
                    <TouchableOpacity style={styles.bt_active} onPress={() => {
                        console.log("Unpicked")
                        setActive(day, !active)
                    }}>
                        <Text style={styles.bt_text_active}>{day}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.bt_nonActive} onPress={() => {
                        console.log("Picked")
                        setActive(day, !active)
                    }}>
                        <Text style={styles.bt_text_nonActive}>{day}</Text>
                    </TouchableOpacity>
            }

        </View>

    );
};

export default DayButton




























































// import React from 'react';
// import {Image, StyleSheet, TouchableOpacity, View, Text, Switch, TouchableNativeFeedback, Animated   } from 'react-native';

// const ListItem = ({ minutes, seconds, state, days }) => {
//     const [s_state, s_stateSet] = React.useState(false)
//     const [arrowDirection, setArrowDirection] = React.useState(false)
//     const [height, setHeight] = React.useState(40)

//     const styles = StyleSheet.create({
//         container: {     
//             width: 400,
//             flexDirection: "column",
//             borderBottomWidth: 2,
//             borderBottomColor: "#FFFFFF",
//         },
//         firstRow: {
//             width: 400,
//             flexDirection: "row",
//             justifyContent: "center",
//         },
//         timer: {
//             width:300,
//             fontSize: 80,
//             color: "#FFFFFF",
//             fontFamily: 'myfont',
//         },
//         switch: {
//             justifyContent: "center",
//             width:100,
//         },
//         secondRow: {
//             width: 400,
//             flexDirection: "row",
//             alignItems: "center"
//         },
//         image: {
//             height: 30,
//             width: 30,
//             resizeMode: 'stretch',
//         },
//         imageReverse: {
//             height: 30,
//             width: 30,
//             resizeMode: 'stretch',
//             transform: [{ rotate: '180deg' }],
//         },
//         img_separator: {
//             width: 340,
//         },
//         days_cont: {
//             width: 400,
//             height: height,
//         },
//     });

//     componentDidMount = async () => {
//         await Font.loadAsync({
//             'myfont': require('../assets/fonts/Roboto-Thin.ttf'),
//         });

//         //fontLoad(true)
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.firstRow}>
//                 <Text style={styles.timer}>{minutes}:{seconds}</Text>
//                 <View  style={styles.switch}>
//                     <Switch onValueChange = {() => { 
//                         console.log("Elo")
//                         s_stateSet(!s_state);
//                         }} value = {s_state}/>
//                 </View>
//             </View>
//             <View style={styles.secondRow}>
//                 <TouchableOpacity onPress={() => {
//                     console.log("Delete")
//                 }}>
//                     <Image style={styles.image} source={require('../assets/images/trashcan.png')}/>                    
//                 </TouchableOpacity>

//                 <View style={styles.img_separator}></View>
//                 <TouchableOpacity onPress={() => {
//                     console.log("Show/Hide")

//                     var toValue
//                     setArrowDirection(!arrowDirection)
//                     if(height == 100) toValue = 40
//                     else toValue = 100

//                     Animated.spring(height, {
//                         toValue: toValue,
//                     }).start();
//                 }}>
//                     {
//                         arrowDirection?
//                         <Image style={styles.imageReverse} source={require('../assets/images/collapseArrow.png')}/>
//                         :
//                         <Image style={styles.image} source={require('../assets/images/collapseArrow.png')}/>
//                     }
//                 </TouchableOpacity>
//             </View>
//             <Animated.View style={styles.days_cont}>

//             </Animated.View>
//             {/* <TouchableNativeFeedback
//                 background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
//                 onPress={() => console.log("pressed")}
//                 style={{
//                     width: 100,
//                     height: 100,
//                     backgroundColor: "green",
//                 }}
//             >
//                 <View style={{ width: 400, height: 50, background: "red" }}>
//                     <Text> CO jest</Text>
//                 </View>
//             </TouchableNativeFeedback> */}
//         </View>
//     );
// };

// export default ListItem