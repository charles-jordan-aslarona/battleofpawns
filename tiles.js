import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Pawn from './pawn';
import Defender from './defender';


class Tiles extends React.Component {
    constructor(props) {
        super(props);

        this.defenders = props.defenders;
    }

    state = {
        activeDefender: "",
        activeRow: null,
        activeCol: null,
        row: null,
        position: null,
        defenders: [
        
               { id: 1,
                isActive: false
               },
               {
                id: 2,
                isActive: false
               }
        ]
    }

    componentDidMount() {
        this.setState({ row: this.props.row, position: this.props.position });
    }

    /*
    makeActive = () => {
        console.log("activating");
        if (defenders) {
            if (defenders.defender1.col === props.position && defenders.defender2.row === props.row) {
                setActive("defender1");
            } else if (defenders.defender2.col === props.position && defenders.defender2.row === props.row) {
                setActive("defender2");
            } else if (defenders.defender3.col === props.position && defenders.defender3.row === props.row) {
                setActive("defender3");
            } else if (defenders.defender4.col === props.position && defenders.defender4.row === props.row) {
                setActive("defender4");
            }
        }
    }
    */

    makeActive = (id) => {
        console.log("is now active " + id);
        this.setState({ activeDefender: this.props.id });
    }

    onTileClick = () => {
        console.log("clicked " + this.props.row + " : " + this.props.position);
        this.setState({ activeCol: this.state.position, activeRow: this.state.row });
    }

    changeDefender(id) {
        console.log("changing defender " + id);
        const defenders = [
            { id: 1,
                isActive: id === 1
               },
               {
                id: 2,
                isActive: id === 2
               }
        ];
        this.setState({defenders:  [...defenders] }, () => {
            this.forceUpdate();
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onTileClick} style={[styles.tile, {backgroundColor: `${this.state.activeCol === this.state.position && this.state.activeRow === this.state.row ? 'green' : this.props.color}`}]}>
            { this.defenders && this.defenders.length && this.defenders[0] && this.defenders[0].col === this.props.position && this.defenders[0].row === this.props.row ? 
                <TouchableOpacity onPress={() => { this.changeDefender(1) }} id={1} style={this.state.defenders[0].isActive ? 'green' : styles.defender }></TouchableOpacity>
            : null}
            { this.defenders && this.defenders.length && this.defenders[1] && this.defenders[1].col === this.props.position && this.defenders[1].row === this.props.row ? 
                <TouchableOpacity onPress={() => { this.changeDefender(2) }} id={2} style={ this.state.defenders[1].isActive ? 'green' : styles.defender}></TouchableOpacity>
            : null}
     
             {/*this.defenders && this.defenders.map((e) => {
                 if (e.col === this.props.position && e.row === this.props.row) {
                    return (
                    <TouchableOpacity key={e.id} style={[styles.defender, this.state.activeDefender === e.id ? styles.active : '']} onPress={() => { this.setState({ activeDefender: e.id }); this.forceUpdate() }} >
                        <Text>{ this.state.activeDefender }</Text>
                    </TouchableOpacity>
                    )
                 }
             }) */}
             </TouchableOpacity>
     );
    }

}

const styles = StyleSheet.create({
    tile: {
      flex: 0.125,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
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

export default Tiles;