import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ListItem from './ListItem'
import Database from '../Database';

class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
        console.log(this.props.data)
    }

    componentDidMount() {
        //this.getData()
    }

    getData() {
        Database.getAll().then((all) => {

            console.log(JSON.parse(all).rows._array)
            this.setState({ data: JSON.parse(all).rows._array })
        })
    }

    delete(id) {
        let temp = this.state.data
        Database.remove(id)
        let array = temp.filter((item) => {
            return item.id != id
        })
        this.setState({ data: array })
    }

    render() {
        let arr = []
        this.state.data.forEach((item) => {
            arr.push(<ListItem key={item.id} a={item.a} b={item.b} c={item.c} func={this.getData} delete={() => this.delete(item.id)} />)
        })
        return (
            <View>
                {arr}
            </View>
        );
    }
}

export default ListItems;
