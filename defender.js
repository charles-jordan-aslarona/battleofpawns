import React from  'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Defender extends React.Component {
    state = {
        activeDefender: "",
    }

    makeActive = () => {
        console.log("making active ss ", this.props.defender);
        this.props.makeActive(this.props.defender);
    }

    render() {
        return (
                <TouchableOpacity style={[styles.defender, this.props.isActive ? styles.active : '']} onPress={this.makeActive}>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    defender: {
        width: "75%",
        height: "70%",
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: "#000",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000"
    },
    active: {
        backgroundColor: 'green',
    }
  })


export default Defender;