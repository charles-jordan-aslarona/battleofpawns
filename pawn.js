import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Pawn = (props) => {
    const [ isActive, setIsActive ] = useState(true);
    const [ activePawn, setActivePawn ] = useState("");


    makePawnActive = () => {
       // setIsActive(!isActive);
       //
       setActivePawn(props.id);
        props.makeActive(props.id);
    }

    return (
        <TouchableOpacity onPress={makePawnActive} id={props.id} style={[styles.pawn, activePawn === props.id ? styles.active : "#000"]}>
            <Text>{props.isActive ? 'active' : ''}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    pawn: {
      width: "75%",
      height: "70%",
      borderRadius: 30,
      borderWidth: 0.5,
      borderColor: "#000",
      alignItems: 'center',
      justifyContent: 'center',
    },
    attacker: {
        backgroundColor: '#eedcb5',
    },
    defender: {
        backgroundColor: '#000'
    }
  })

export default Pawn;