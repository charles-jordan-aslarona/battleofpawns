import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

export default function App() {
  const [ player, setPlayer ] = useState("attacker");
  const [ attackerValidMoves, setAttackerValidMoves ] = useState(0);
  const [ attackerCol, setAttackerCol ] = useState(4);
  const [ attackerRow, setAttackerRow ] = useState(7);
  const [ defender1Col, setDefender1Col ] = useState(1);
  const [ defender1Row, setDefender1Row ] = useState(0);
  const [ defender2Col, setDefender2Col ] = useState(3);
  const [ defender2Row, setDefender2Row ] = useState(0);
  const [ defender3Col, setDefender3Col ] = useState(5);
  const [ defender3Row, setDefender3Row ] = useState(0);
  const [ defender4Col, setDefender4Col ] = useState(7);
  const [ defender4Row, setDefender4Row ] = useState(0);
  const [activeDefender, setActiveDefender] = useState("");
  const [ startingColors, setStartingColors ] = useState([
    { color1: "#eeeed5", color2: "#7c945d"  },
    { color1: "#7c945d", color2: "#eeeed5"  },
    { color1: "#eeeed5", color2: "#7c945d"  },
    { color1: "#7c945d", color2: "#eeeed5"  },
    { color1: "#eeeed5", color2: "#7c945d"  },
    { color1: "#7c945d", color2: "#eeeed5"  },
    { color1: "#eeeed5", color2: "#7c945d"  },
    { color1: "#7c945d", color2: "#eeeed5"  }
  ]);
 
  useEffect(() => {
    const attackerGoingUp = attackerRow - 1;
    const attackerGoingDown = attackerRow + 1;
    const attackerGoingLeft = attackerCol - 1;
    const attackerGoingRight = attackerCol + 1;
    let moves = 0;
    if (player === "attacker") {
      // going top left
      if (attackerGoingUp >= 0 && attackerGoingLeft >=0) {
        if (isHighlighted(attackerGoingUp, attackerGoingLeft)) {
          console.log("going top left is highlighted");
          setAttackerValidMoves(attackerValidMoves + 1);
          moves = moves + 1;
          console.log("attacker valid moves " + attackerValidMoves);
        }
      }
      // going top right
      if (attackerGoingUp >= 0 && attackerGoingRight <= 7) {
        if (isHighlighted(attackerGoingUp, attackerGoingRight)) {
          console.log("going top left is highlighted");
          setAttackerValidMoves(attackerValidMoves + 1);
          moves = moves + 1;
          console.log("attacker valid moves " + attackerValidMoves);
        }
      }
      // going bottom right
      if (attackerGoingDown <= 7 && attackerGoingRight <= 7) {
        if (isHighlighted(attackerGoingDown, attackerGoingRight)) {
          console.log("going top left is highlighted");
          setAttackerValidMoves(attackerValidMoves + 1);
          moves = moves + 1;
          console.log("attacker valid moves " + attackerValidMoves);
        }
      }
      // going bottom left
      if (attackerGoingDown <= 7 && attackerGoingLeft >= 0) {
        if (isHighlighted(attackerGoingDown, attackerGoingLeft)) {
          console.log("going top left is highlighted");
          setAttackerValidMoves(attackerValidMoves + 1);
          moves = moves + 1;
          console.log("attacker valid moves " + attackerValidMoves);
        }
      }
      setAttackerValidMoves(moves);
      console.log("total attacker moves " + attackerValidMoves);
    }

  }, [player, attackerValidMoves] )

  const moveAttacker = (col, row) => {
    setAttackerCol(col);
    setAttackerRow(row);
    console.log("new attacker position col: " + attackerCol + " row: " + attackerRow);
  };

  const checkIfGameIsOver = () => {
    if (attackerRow === 0 || (attackerRow <= defender1Row && attackerRow <= defender2Row && attackerRow <= defender3Row && attackerRow <= defender4Row)) {
      return true;
    } else if (player === "attacker" && !attackerValidMoves) {
      return true;
    }
    return false;
  }
 
  const isTileOccuppiedByADefender = (defRow, defCol, row, col) => {
    if (defRow === row && defCol === col) {
      return true;
    }
    return false;
  }

  const onTileClick = (row, col) => {
    if (player === "defender") {
      if (activeDefender === 1 && isTileValidDestinationForADefender(row, col, 1)) {
        setDefender1Row(row);
        setDefender1Col(col);
        setPlayer("attacker");
        setActiveDefender("");
      } else if (activeDefender === 2 && isTileValidDestinationForADefender(row, col, 2)) {
        setDefender2Row(row);
        setDefender2Col(col);
        setPlayer("attacker");
        setActiveDefender("");
      } else if (activeDefender === 3 && isTileValidDestinationForADefender(row, col, 3)) {
        setDefender3Row(row);
        setDefender3Col(col);
        setPlayer("attacker");
        setActiveDefender("");
      } else if (activeDefender === 4 && isTileValidDestinationForADefender(row, col, 4)) {
        setDefender4Row(row);
        setDefender4Col(col);
        setPlayer("attacker");
        setActiveDefender("");
      }
    } else {
      // attacker's turn
      if (isTileValidDestinationForAttacker(row, col)) {
        setAttackerCol(col);
        setAttackerRow(row);
        setAttackerValidMoves(0);
        setPlayer("defender");
      }
    }
  }

  const isTileValidDestinationForAttacker = (row, col) => {
    if ((row === attackerRow + 1 || row === attackerRow - 1) && (col === attackerCol - 1 || col === attackerCol + 1)) {
      if (isTileOccuppiedByADefender(defender1Row, defender1Col, row, col)) {
        return false;
      } else if (isTileOccuppiedByADefender(defender2Row, defender2Col, row, col)) {
        return false;
      } else if (isTileOccuppiedByADefender(defender3Row, defender3Col, row, col)) {
        return false;
      } else if (isTileOccuppiedByADefender(defender4Row, defender4Col, row, col)) {
        return false;
      }
      return true;
    }
  }

  const isTileValidDestinationForADefender = (row, col, defender) => {
    if (defender1Col === col && defender1Row === row) {
      return false;
    } else if (defender2Col === col && defender2Row === row) {
      return false;
    } else if (defender3Col === col && defender3Row === row) {
      return false;
    } else if (defender4Col === col && defender4Row === row) {
      return false;
    } else if (attackerCol === col && attackerRow === row) {
      return false;
    } 
    else {
      if (defender === 1 && row === defender1Row + 1 && (col === defender1Col - 1 || col === defender1Col + 1)) {
        return true;
      } else if (defender === 2 && row === defender2Row + 1 && (col === defender2Col - 1 || col === defender2Col + 1)) {
        return true;
      } else if (defender === 3 && row === defender3Row + 1 && (col === defender3Col - 1 || col === defender3Col + 1)) {
        return true;
      } else if (defender === 4 && row === defender4Row + 1 && (col === defender4Col - 1 || col === defender4Col + 1)) {
        return true;
      }
    }
  }
  
  const restartGame = () => {
    setPlayer("attacker");
    setActiveDefender("");
    setAttackerRow(7);
    setAttackerCol(4);
    setDefender1Col(1);
    setDefender1Row(0);
    setDefender2Col(3);
    setDefender2Row(0);
    setDefender3Col(5);
    setDefender3Row(0);
    setDefender4Col(7);
    setDefender4Row(0);
  }

  const isHighlighted = (row, col) => {
    if (player === "defender") {
      if (activeDefender === 1) {
        if (isTileValidDestinationForADefender(row, col, 1) || (row === defender1Row && col === defender1Col)) {
          return true;
        } else {
          return false;
        }
      } else if (activeDefender === 2) {
        if (isTileValidDestinationForADefender(row, col, 2) || (row === defender2Row && col === defender2Col)) {
          return true;
        } else {
          return false;
        }
      } else if (activeDefender === 3) {
        if (isTileValidDestinationForADefender(row, col, 3) || (row === defender3Row && col === defender3Col)) {
          return true;
        } else {
          return false;
        }
      } else if (activeDefender === 4) {
        if (isTileValidDestinationForADefender(row, col, 4) || (row === defender4Row && col === defender4Col)) {
          return true;
        } else {
          return false;
        }
      }
    } else if (player === "attacker") {
      if ((row === attackerRow && col === attackerCol) || isTileValidDestinationForAttacker(row, col)) {
        return true;
      } else {
        return false;
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
     {
      checkIfGameIsOver() ?
      player === 'attacker' && !attackerValidMoves ?
      <Text style={styles.label}>GAME OVER!!! Defender won</Text> : 
      <Text style={styles.label}>GAME OVER!!! Attacker won</Text> :
      <Text style={styles.label}>{player}'s turn</Text>  
     } 
      <View style={styles.board}>
        {Array.from(Array(8), (rowE, rowI) => {
          return <View style={styles.row}>
                {Array.from(Array(8), (e, i) => {
                  return <TouchableOpacity disabled={!isHighlighted(rowI, i)} key={i} onPress={() => { onTileClick(rowI, i) } } style={[styles.tile, { backgroundColor: i%2 ? startingColors[rowI].color2 : startingColors[rowI].color1, opacity: isHighlighted(rowI, i) ? 0.5 : 1 }]}>
                    {
                        attackerRow == rowI && attackerCol === i ?
                          <TouchableOpacity disabled={player === 'defender'} style={[styles.pawn, styles.attacker]}>
                            <Text style={{color: '#000'}}>0</Text>
                          </TouchableOpacity> : null
                        }  
                      {
                        isTileOccuppiedByADefender(defender1Row, defender1Col, rowI, i) ?
                        <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 1 ? 'green': 'black' }]} onPress={() => {setActiveDefender(1)}}>
                          <Text style={{color: '#FFF'}}>1</Text>
                        </TouchableOpacity> : null
                      }
                      {
                        isTileOccuppiedByADefender(defender2Row, defender2Col, rowI, i) ?
                        <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 2 ? 'green': 'black' }]} onPress={() => {setActiveDefender(2)}}>
                          <Text style={{color: '#FFF'}}>2</Text>
                        </TouchableOpacity> : null
                      }
                      {
                        isTileOccuppiedByADefender(defender3Row, defender3Col, rowI, i)?
                        <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 3 ? 'green': 'black' }]} onPress={() => {setActiveDefender(3)}}>
                          <Text style={{color: '#FFF'}}>3</Text>
                        </TouchableOpacity> : null
                      }
                      {
                        isTileOccuppiedByADefender(defender4Row, defender4Col, rowI, i) ?
                        <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 4 ? 'green': 'black' }]} onPress={() => {setActiveDefender(4)}}>
                          <Text style={{color: '#FFF'}}>4</Text>
                        </TouchableOpacity> : null
                      }
                  </TouchableOpacity>
                })}
          </View>
        })}
      </View>
      <TouchableOpacity style={styles.restart} onPress={restartGame}><Text style={{color: '#FFF', fontSize: 20}}>New game</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.restart, styles.howto]}><Text style={{color: '#FFF', fontSize: 20}}>How to play</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.restart, styles.solo]}><Text style={{color: '#FFF', fontSize: 20}}>Play with Computer</Text></TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 0.125,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  board: {
    width: "90%",
    height: "50%",
    backgroundColor: "#fff"
  },
  label: {
    fontSize: 32,
    margin: 20
  },
  tile: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pawn: {
    width: "80%",
    height: "72%",
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "#000",
    alignItems: 'center',
    justifyContent: 'center',
  },
  defender: {
    backgroundColor: '#000'
  },
  attacker: {
    backgroundColor: '#FFF'
  },
  restart: {
    backgroundColor: '#679966',
    width: "40%",
    height: 60,
    borderRadius: 10,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderWidth: 1,
    borderColor: "#000"
  },
  howto: {
    marginTop: 10,
    backgroundColor: '#afd774'
  },
  solo: {
    marginTop: 10,
    backgroundColor: '#b74a49'
  }
});
