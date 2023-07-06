import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Vibration } from 'react-native';
import Tiles from './tiles';
import Defender from './defender';

export default function App() {
  let tileColor = "#fff";
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
  const [ defender1Active, setDefender1Active ] = useState(false);
  const [ defender2Active, setDefender2Active ] = useState(false);
  const [ isGameOver, setIsGameOver ] = useState(false);
  const [ winner, setWinner ] = useState(false);
  const [ startingColors, setStartingColors ] = useState(["#eeeed5", "#7c945d", "#eeeed5", "#7c945d"]);

 


  useEffect(() => {
    console.log("player changed");
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
          console.log("local attacker valid moves " + moves);
        }
      }
      // going top right
      if (attackerGoingUp >= 0 && attackerGoingRight <= 7) {
        if (isHighlighted(attackerGoingUp, attackerGoingRight)) {
          console.log("going top left is highlighted");
          setAttackerValidMoves(attackerValidMoves + 1);
          moves = moves + 1;
          console.log("attacker valid moves " + attackerValidMoves);
          console.log("local attacker valid moves " + moves);
        }
      }
      // going bottom right
      if (attackerGoingDown <= 7 && attackerGoingRight <= 7) {
        if (isHighlighted(attackerGoingDown, attackerGoingRight)) {
          console.log("going top left is highlighted");
          setAttackerValidMoves(attackerValidMoves + 1);
          moves = moves + 1;
          console.log("attacker valid moves " + attackerValidMoves);
          console.log("local attacker valid moves " + moves);
        }
      }
      // going bottom left
      if (attackerGoingDown <= 7 && attackerGoingLeft >= 0) {
        if (isHighlighted(attackerGoingDown, attackerGoingLeft)) {
          console.log("going top left is highlighted");
          setAttackerValidMoves(attackerValidMoves + 1);
          moves = moves + 1;
          console.log("attacker valid moves " + attackerValidMoves);
          console.log("local attacker valid moves " + moves);
        }
      }
      setAttackerValidMoves(moves);
      console.log("total attacker moves " + attackerValidMoves);
    }

    /*
    if (player === "attacker" && attackerGoingUp >= 0 && attackerGoingDown <=7 && attackerGoingLeft >=0 && attackerGoingRight <=7) {
      // going top right
      if (isHighlighted(attackerGoingUp, attackerGoingRight)) {
        console.log("going top right is highlighted");
        setAttackerValidMoves(attackerValidMoves + 1);
        moves = moves + 1;
        console.log("attacker valid moves " + attackerValidMoves);
        console.log("local attacker valid moves " + moves);
      }
      // going top left
      if (isHighlighted(attackerGoingUp, attackerGoingLeft)) {
        console.log("going top left is highlighted");
        setAttackerValidMoves(attackerValidMoves + 1);
        moves = moves + 1;
        console.log("attacker valid moves " + attackerValidMoves);
        console.log("local attacker valid moves " + moves);
      }
      // going bottom right
      if (isHighlighted(attackerGoingDown, attackerGoingRight)) {
        console.log("going bottom right is highlighted");
        setAttackerValidMoves(attackerValidMoves + 1);
        moves = moves + 1;
        console.log("attacker valid moves " + attackerValidMoves);
        console.log("local attacker valid moves " + moves);
      }
      // going bottom left
      if (isHighlighted(attackerGoingDown, attackerGoingLeft)) {
        console.log("going bottom left is highlighted");
        setAttackerValidMoves(attackerValidMoves + 1);
        moves = moves + 1;
        console.log("attacker valid moves " + attackerValidMoves);
        console.log("local attacker valid moves " + moves);
      }

    }
    */

  }, [player, attackerValidMoves] )

  const moveAttacker = (col, row) => {
    setAttackerCol(col);
    setAttackerRow(row);
    console.log("new attacker position col: " + attackerCol + " row: " + attackerRow);
  };

  const checkGameStatus = (row, col) => {
    if (isTileOccuppiedByADefender(defender1Row, defender1Col, row, col) && isTileOccuppiedByADefender(defender1Row, defender1Col, row, col) && isTileOccuppiedByADefender(defender3Row, defender3Col, row, col)
    && isTileOccuppiedByADefender(defender2Row, defender2Col, row, col) && isTileOccuppiedByADefender(defender4Row, defender4Col, row, col)) {
      setWinner("attacker");
      setIsGameOver(true);
    }
  }

  const checkIfGameIsOver = () => {
    if (attackerRow === 0 || (attackerRow <= defender1Row && attackerRow <= defender2Row && attackerRow <= defender3Row && attackerRow <= defender4Row)) {
     // setWinner("Attacker");
      return true;
    } else if (player === "attacker" && !attackerValidMoves) {
   //   setWinner("Defender");
      return true;
    }
    //if (player === "player" && attackerValidMoves === 0) {
    //  return true;
   // }

    return false;
  }


  const isPlayerMovable = () => {
    let isAttackerFreeToMove = false;
    const attackerGoingUp = attackerRow - 1;
    const attackerGoingDown = attackerRow + 1;
    const attackerGoingLeft = attackerCol - 1;
    const attackerGoingRight = attackerCol + 1;

    const attackerGoingTopLeft = { row: attackerRow -1, col: attackerCol -1 };
    const attackerGoingTopRight = { row: attackerRow -1, col: attackerCol +1 };
    const attackerGoingBottomLeft = { row: attackerRow +1, col: attackerCol -1 };
    const attackerGoingBottomRight = { row: attackerRow +1, col: attackerCol +1 };

    const defender1Pos = { row: defender1Row, col: defender1Col };
    const defender2Pos = { row: defender2Row, col: defender2Col };
    const defender3Pos = { row: defender3Row, col: defender3Col };
    const defender4Pos = { row: defender4Row, col: defender4Col };

    // check attacker going top right
    if (attackerGoingUp >= 0 && attackerGoingRight <=7) {
      if (defender1Row === attackerGoingUp && defender1Col === attackerGoingRight) {
        // already occuppied
      }
    }

    /*
    if (!isAttackerAndDefenderSamePosition(attackerGoingUp, attackerGoingLeft, defender1Row, defender1Col) && !isAttackerAndDefenderSamePosition(attackerGoingUp, attackerGoingRight, defender1Row, defender1Col)
    || !isAttackerAndDefenderSamePosition(attackerGoingDown, attackerGoingLeft, defender1Row, defender1Col) && !isAttackerAndDefenderSamePosition(attackerGoingDown, attackerGoingRight, defender1Row, defender1Col) ) {
      isAttackerFreeToMove = true;
    }
    if (!isAttackerAndDefenderSamePosition(attackerGoingUp, attackerGoingLeft, defender2Row, defender2Col) || !isAttackerAndDefenderSamePosition(attackerGoingUp, attackerGoingRight, defender2Row, defender2Col)
    || !isAttackerAndDefenderSamePosition(attackerGoingDown, attackerGoingLeft, defender2Row, defender2Col) || !isAttackerAndDefenderSamePosition(attackerGoingDown, attackerGoingRight, defender2Row, defender2Col) ) {
      isAttackerFreeToMove = true;
    }
    if (!isAttackerAndDefenderSamePosition(attackerGoingUp, attackerGoingLeft, defender3Row, defender3Col) || !isAttackerAndDefenderSamePosition(attackerGoingUp, attackerGoingRight, defender3Row, defender3Col)
    || !isAttackerAndDefenderSamePosition(attackerGoingDown, attackerGoingLeft, defender3Row, defender3Col) || !isAttackerAndDefenderSamePosition(attackerGoingDown, attackerGoingRight, defender3Row, defender3Col) ) {
      isAttackerFreeToMove = true;
    }
    if (!isAttackerAndDefenderSamePosition(attackerGoingUp, attackerGoingLeft, defender4Row, defender4Col) || !isAttackerAndDefenderSamePosition(attackerGoingUp, attackerGoingRight, defender4Row, defender4Col)
    || !isAttackerAndDefenderSamePosition(attackerGoingDown, attackerGoingLeft, defender4Row, defender4Col) || !isAttackerAndDefenderSamePosition(attackerGoingDown, attackerGoingRight, defender4Row, defender4Col) ) {
      isAttackerFreeToMove = true;
    }
    */
    return isAttackerFreeToMove;
  }

  const isAttackerAndDefenderSamePosition = (aRow, aCol, dRow, dCol) => {
    if (aRow === dRow && aCol === dCol) {
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
        if (isPlayerMovable()) {
          setIsGameOver(true);
          setPlayer("");
        }
      } else if (activeDefender === 2 && isTileValidDestinationForADefender(row, col, 2)) {
        setDefender2Row(row);
        setDefender2Col(col);
        setPlayer("attacker");
        setActiveDefender("");
        if (isPlayerMovable()) {
          setIsGameOver(true);
          setPlayer("");
        }
      } else if (activeDefender === 3 && isTileValidDestinationForADefender(row, col, 3)) {
        setDefender3Row(row);
        setDefender3Col(col);
        setPlayer("attacker");
        setActiveDefender("");
        if (isPlayerMovable()) {
          setIsGameOver(true);
          setPlayer("");
        }
      } else if (activeDefender === 4 && isTileValidDestinationForADefender(row, col, 4)) {
        setDefender4Row(row);
        setDefender4Col(col);
        setPlayer("attacker");
        setActiveDefender("");
        if (isPlayerMovable()) {
          setIsGameOver(true);
          setPlayer("");
        }
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

  const defenders = [ { id: "defender1", col: defender1Col, row: defender1Row }, { id: "defender2", col: defender2Col, row: defender2Row }, { id: "defender3", col: defender3Col, row: defender3Row }, { id: "defender4", col: defender4Col, row: defender4Row } ];

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
        <View style={styles.row}>
        {Array.from(Array(8), (e, i) => {
          return <TouchableOpacity disabled={!isHighlighted(0, i)}  key={i} onPress={() => { onTileClick(0, i) } } style={[styles.tile, { backgroundColor: i%2 ? '#7c945d' : '#eeeed5', opacity: isHighlighted(0, i) ? 0.5 : 1 }]}>
             {
                  attackerRow == 0 && attackerCol === i ?
                  <TouchableOpacity disabled={player === 'defender'} style={[styles.attacker]}>
                    <Text style={{color: '#000'}}>0</Text>
                  </TouchableOpacity> : null
                }  
              {
                isTileOccuppiedByADefender(defender1Row, defender1Col, 0, i) ?
                <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 1 ? 'green': 'black' }]} onPress={() => {setActiveDefender(1)}}>
                  <Text style={{color: '#FFF'}}>1</Text>
                </TouchableOpacity> : null
              }
              {
                isTileOccuppiedByADefender(defender2Row, defender2Col, 0, i) ?
                <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 2 ? 'green': 'black' }]} onPress={() => {setActiveDefender(2)}}>
                  <Text style={{color: '#FFF'}}>2</Text>
                </TouchableOpacity> : null
              }
              {
                isTileOccuppiedByADefender(defender3Row, defender3Col, 0, i)?
                <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 3 ? 'green': 'black' }]} onPress={() => {setActiveDefender(3)}}>
                  <Text style={{color: '#FFF'}}>3</Text>
                </TouchableOpacity> : null
              }
              {
                isTileOccuppiedByADefender(defender4Row, defender4Col, 0, i) ?
                <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 4 ? 'green': 'black' }]} onPress={() => {setActiveDefender(4)}}>
                  <Text style={{color: '#FFF'}}>4</Text>
                </TouchableOpacity> : null
              }
               
          </TouchableOpacity>
        })}

        </View>

        <View style={styles.row}>
        {Array.from(Array(8), (e, i) => {
          return <TouchableOpacity disabled={!isHighlighted(1, i)}  key={i} onPress={() => { onTileClick(1, i) } } style={[styles.tile, { backgroundColor: i%2 ? '#eeeed5' : '#7c945d', opacity: isHighlighted(1, i) ? 0.5 : 1 }]}>
              {
                  attackerRow == 1 && attackerCol === i ?
                  <TouchableOpacity disabled={player === 'defender'} style={[styles.attacker]}>
                    <Text style={{color: '#000'}}>0</Text>
                  </TouchableOpacity> : null
                }  
              {
                defender1Row == 1 && defender1Col === i ?
                <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 1 ? 'green': 'black' }]} onPress={() => { setActiveDefender(1)}}>
                  <Text style={{color: '#FFF'}}>1</Text>
                </TouchableOpacity> : null
              }
              {
                defender2Row == 1 && defender2Col === i ?
                <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 2 ? 'green': 'black' }]} onPress={() => {setActiveDefender(2)}}>
                  <Text style={{color: '#FFF'}}>2</Text>
                </TouchableOpacity> : null
              }
              {
                defender3Row == 1 && defender3Col === i ?
                <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 3 ? 'green': 'black' }]} onPress={() => {setActiveDefender(3)}}>
                  <Text style={{color: '#FFF'}}>3</Text>
                </TouchableOpacity> : null
              }
              {
                defender4Row == 1 && defender4Col === i ?
                <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 4 ? 'green': 'black' }]} onPress={() => {setActiveDefender(4)}}>
                  <Text style={{color: '#FFF'}}>4</Text>
                </TouchableOpacity> : null
              }
               
          </TouchableOpacity>
        })}

        </View>

        <View style={styles.row}>
          {Array.from(Array(8), (e, i) => {
            return <TouchableOpacity disabled={!isHighlighted(2, i)}  key={i} onPress={() => { onTileClick(2, i) } } style={[styles.tile, { backgroundColor: i%2 ? '#7c945d' : '#eeeed5', opacity: isHighlighted(2, i) ? 0.5 : 1 }]}>
                {
                  attackerRow == 2 && attackerCol === i ?
                  <TouchableOpacity disabled={player === 'defender'} style={[styles.attacker]}>
                    <Text style={{color: '#000'}}>0</Text>
                  </TouchableOpacity> : null
                }  
                {
                  defender1Row == 2 && defender1Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 1 ? 'green': 'black' }]} onPress={() => { setActiveDefender(1)}}>
                    <Text style={{color: '#FFF'}}>1</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender2Row == 2 && defender2Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 2 ? 'green': 'black' }]} onPress={() => {setActiveDefender(2)}}>
                    <Text style={{color: '#FFF'}}>2</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender3Row == 2 && defender3Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 3 ? 'green': 'black' }]} onPress={() => {setActiveDefender(3)}}>
                    <Text style={{color: '#FFF'}}>3</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender4Row == 2 && defender4Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 4 ? 'green': 'black' }]} onPress={() => {setActiveDefender(4)}}>
                    <Text style={{color: '#FFF'}}>4</Text>
                  </TouchableOpacity> : null
                }
                
            </TouchableOpacity>
          })}
        </View>

        <View style={styles.row}>
          {Array.from(Array(8), (e, i) => {
            return <TouchableOpacity disabled={!isHighlighted(3, i)}  key={i} onPress={() => { onTileClick(3, i) } } style={[styles.tile, { backgroundColor: i%2 ? '#eeeed5' : '#7c945d', opacity: isHighlighted(3, i) ? 0.5 : 1 }]}>
                {
                  attackerRow == 3 && attackerCol === i ?
                  <TouchableOpacity disabled={player === 'defender'} style={[styles.attacker]}>
                    <Text style={{color: '#000'}}>0</Text>
                  </TouchableOpacity> : null
                }  
                {
                  defender1Row == 3 && defender1Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 1 ? 'green': 'black' }]} onPress={() => { setActiveDefender(1)}}>
                    <Text style={{color: '#FFF'}}>1</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender2Row == 3 && defender2Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 2 ? 'green': 'black' }]} onPress={() => {setActiveDefender(2)}}>
                    <Text style={{color: '#FFF'}}>2</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender3Row == 3 && defender3Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 3 ? 'green': 'black' }]} onPress={() => {setActiveDefender(3)}}>
                    <Text style={{color: '#FFF'}}>3</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender4Row == 3 && defender4Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 4 ? 'green': 'black' }]} onPress={() => {setActiveDefender(4)}}>
                    <Text style={{color: '#FFF'}}>4</Text>
                  </TouchableOpacity> : null
                }
                
            </TouchableOpacity>
          })}
        </View>

        <View style={styles.row}>
          {Array.from(Array(8), (e, i) => {
            return <TouchableOpacity disabled={!isHighlighted(4, i)}  key={i} onPress={() => { onTileClick(4, i) } } style={[styles.tile, { backgroundColor: i%2 ? '#7c945d' : '#eeeed5', opacity: isHighlighted(4, i) ? 0.5 : 1 }]}>

                {
                  attackerRow == 4 && attackerCol === i ?
                  <TouchableOpacity disabled={player === 'defender'} style={[styles.attacker]}>
                    <Text style={{color: '#000'}}>0</Text>
                  </TouchableOpacity> : null
                }  
                {
                  defender1Row == 4 && defender1Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 1 ? 'green': 'black' }]} onPress={() => { setActiveDefender(1)}}>
                    <Text style={{color: '#FFF'}}>1</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender2Row == 4 && defender2Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 2 ? 'green': 'black' }]} onPress={() => {setActiveDefender(2)}}>
                    <Text style={{color: '#FFF'}}>2</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender3Row == 4 && defender3Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 3 ? 'green': 'black' }]} onPress={() => {setActiveDefender(3)}}>
                    <Text style={{color: '#FFF'}}>3</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender4Row == 4 && defender4Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 4 ? 'green': 'black' }]} onPress={() => {setActiveDefender(4)}}>
                    <Text style={{color: '#FFF'}}>4</Text>
                  </TouchableOpacity> : null
                }
                
            </TouchableOpacity>
          })}
        </View>

        <View style={styles.row}>
          {Array.from(Array(8), (e, i) => {
            return <TouchableOpacity disabled={!isHighlighted(5, i)}  key={i} onPress={() => { onTileClick(5, i) } } style={[styles.tile, { backgroundColor: i%2 ? '#eeeed5' : '#7c945d', opacity: isHighlighted(5, i) ? 0.7 : 1 }]}>

                {
                  attackerRow == 5 && attackerCol === i ?
                  <TouchableOpacity disabled={player === 'defender'} style={[styles.attacker]}>
                    <Text style={{color: '#000'}}>0</Text>
                  </TouchableOpacity> : null
                }  

                {
                  defender1Row == 5 && defender1Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 1 ? 'green': 'black' }]} onPress={() => { setActiveDefender(1)}}>
                    <Text style={{color: '#FFF'}}>1</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender2Row == 5 && defender2Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 2 ? 'green': 'black' }]} onPress={() => {setActiveDefender(2)}}>
                    <Text style={{color: '#FFF'}}>2</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender3Row == 5 && defender3Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 3 ? 'green': 'black' }]} onPress={() => {setActiveDefender(3)}}>
                    <Text style={{color: '#FFF'}}>3</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender4Row == 5 && defender4Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 4 ? 'green': 'black' }]} onPress={() => {setActiveDefender(4)}}>
                    <Text style={{color: '#FFF'}}>4</Text>
                  </TouchableOpacity> : null
                }
                
            </TouchableOpacity>
          })}
        </View>

        <View style={styles.row}>
          {Array.from(Array(8), (e, i) => {
            return <TouchableOpacity disabled={!isHighlighted(6, i)}  key={i} onPress={() => { onTileClick(6, i) } } style={[styles.tile, { backgroundColor: i%2 ? '#7c945d' : '#eeeed5', opacity: isHighlighted(6, i) ? 0.7 : 1 }]}>

                {
                  attackerRow == 6 && attackerCol === i ?
                  <TouchableOpacity disabled={player === 'defender'} style={[styles.attacker]}>
                    <Text style={{color: '#000'}}>0</Text>
                  </TouchableOpacity> : null
                }  

                {
                  defender1Row == 6 && defender1Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 1 ? 'green': 'black' }]} onPress={() => { setActiveDefender(1)}}>
                    <Text style={{color: '#FFF'}}>1</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender2Row == 6 && defender2Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 2 ? 'green': 'black' }]} onPress={() => {setActiveDefender(2)}}>
                    <Text style={{color: '#FFF'}}>2</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender3Row == 6 && defender3Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 3 ? 'green': 'black' }]} onPress={() => {setActiveDefender(3)}}>
                    <Text style={{color: '#FFF'}}>3</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender4Row == 6 && defender4Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 4 ? 'green': 'black' }]} onPress={() => {setActiveDefender(4)}}>
                    <Text style={{color: '#FFF'}}>4</Text>
                  </TouchableOpacity> : null
                }
                
            </TouchableOpacity>
          })}
        </View>

        <View style={styles.row}>
          {Array.from(Array(8), (e, i) => {
            return <TouchableOpacity disabled={!isHighlighted(7, i)}  key={i} onPress={() => { onTileClick(7, i) } } style={[styles.tile, { backgroundColor: i%2 ? '#eeeed5' : '#7c945d', opacity: isHighlighted(7, i) ? 0.7 : 1 }]}>

                {
                  attackerRow == 7 && attackerCol === i ?
                  <TouchableOpacity disabled={player === 'defender'} style={[styles.attacker]}>
                    <Text style={{color: '#000'}}>0</Text>
                  </TouchableOpacity> : null
                }               
                
                {
                  defender1Row == 7 && defender1Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 1 ? 'green': 'black' }]} onPress={() => { setActiveDefender(1)}}>
                    <Text style={{color: '#FFF'}}>1</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender2Row == 7 && defender2Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 2 ? 'green': 'black' }]} onPress={() => {setActiveDefender(2)}}>
                    <Text style={{color: '#FFF'}}>2</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender3Row == 7 && defender3Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 3 ? 'green': 'black' }]} onPress={() => {setActiveDefender(3)}}>
                    <Text style={{color: '#FFF'}}>3</Text>
                  </TouchableOpacity> : null
                }
                {
                  defender4Row == 7 && defender4Col === i ?
                  <TouchableOpacity disabled={player === 'attacker'} style={[styles.pawn, {backgroundColor: activeDefender === 4 ? 'green': 'black' }]} onPress={() => {setActiveDefender(4)}}>
                    <Text style={{color: '#FFF'}}>4</Text>
                  </TouchableOpacity> : null
                }
                
            </TouchableOpacity>
          })}
        </View>

        {/* <View style={styles.row}>
            {Array.from(Array(8), (e, i) => {
              return <Tiles key={i} moveAttacker={moveAttacker} color={i%2 ? '#7c945d' : '#eeeed5'} row={0} defenders={[ { id: 1, col: defender1Col, row: defender1Row }, { id: 2, col: defender2Col, row: defender2Row }, { id: 3, col: defender3Col, row: defender3Row }, { id: 4, col: defender4Col, row: defender4Row } ]} position={i}/>
            })}
          </View> 
        <View style={styles.row}>
            {Array.from(Array(8), (e, i) => {
              return <Tiles key={i} color={i%2 ? '#eeeed5' : '#7c945d'} row={1} isAttacker={attackerRow === 1 ? true : false} attackerRow={attackerRow}  attackerCol={attackerCol} position={i} moveAttacker={moveAttacker}/>
            })}
        </View>
        <View style={styles.row}>
            {Array.from(Array(8), (e, i) => {
              return <Tiles key={i} color={i%2 ? '#7c945d' : '#eeeed5'} row={2} isAttacker={attackerRow === 2 ? true : false} attackerRow={attackerRow}  attackerCol={attackerCol} position={i} moveAttacker={moveAttacker} />
            })}
        </View>
        <View style={styles.row}>
            {Array.from(Array(8), (e, i) => {
              return <Tiles key={i} color={i%2 ? '#eeeed5' : '#7c945d'} row={3} isAttacker={attackerRow === 3 ? true : false} attackerRow={attackerRow}  attackerCol={attackerCol} position={i} moveAttacker={moveAttacker} />
            })}
        </View>
        <View style={styles.row}>
            {Array.from(Array(8), (e, i) => {
              return <Tiles key={i} color={i%2 ? '#7c945d' : '#eeeed5'} row={4} isAttacker={attackerRow === 4 ? true : false} attackerRow={attackerRow}  attackerCol={attackerCol} position={i} moveAttacker={moveAttacker} />
            })}
        </View>
        <View style={styles.row}>
            {Array.from(Array(8), (e, i) => {
              return <Tiles key={i} color={i%2 ? '#eeeed5' : '#7c945d'} row={5} isAttacker={attackerRow === 5 ? true : false} attackerRow={attackerRow}  attackerCol={attackerCol} position={i} moveAttacker={moveAttacker} />
            })}
        </View>
        <View style={styles.row}>
            {Array.from(Array(8), (e, i) => {
              return <Tiles key={i} color={i%2 ? '#7c945d' : '#eeeed5'} row={6} isAttacker={attackerRow === 6 ? true : false} attackerRow={attackerRow}  attackerCol={attackerCol} position={i} moveAttacker={moveAttacker} />
            })}
        </View>
        <View style={styles.row}>
            {Array.from(Array(8), (e, i) => {
              return <Tiles key={i} color={i%2 ? '#eeeed5' : '#7c945d'} row={7} isAttacker={attackerRow === 7 ? true : false} attackerRow={attackerRow} attackerCol={attackerCol} position={i} moveAttacker={moveAttacker} />
            })}
        </View>
          */}
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
  attacker: {
    width: "80%",
    height: "72%",
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "#000",
    alignItems: 'center',
    justifyContent: 'center',
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
