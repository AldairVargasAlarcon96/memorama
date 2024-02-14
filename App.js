import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Card from "./Card";
const cards = [
  //"💩 🤡 👹 👺 👻 👽 👾 🤖 😺 😸 😹 😻 😼 😽 🙀 😿 😾 🙈 🙉 🙊 💋 💯 💢 💥 💫 💦 💨 ",
  "👺",
  "👽",
  "😺",
  "🙊",
  "💢",
  "💫",
];

export default function App() {
  const [board, setboard] = React.useState(() => shuffle([...cards, ...cards]));

  const [selectedCards, setselectedCards] = React.useState([]);
  const [matchedCards, setmatchedCards] = React.useState([]);
  const [score, setscore] = React.useState(0);

  React.useEffect(() => {
    if (selectedCards.length < 2) return;
    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setmatchedCards([...matchedCards, ...selectedCards]);
      setselectedCards([]);
    } else {
      const timeoutId = setTimeout(() => setselectedCards([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setselectedCards([...selectedCards, index]);
    setscore(score + 1);
  };

  const didPLayerWin = () => matchedCards.length === board.length;

  const resetGame = () => {
    setmatchedCards([]);
    setscore(0);
    setselectedCards([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {didPLayerWin() ? "Ganaste" : "Comienza"}
      </Text>
      <Text style={styles.title}> Score: {score}</Text>
      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver =
            selectedCards.includes(index) || matchedCards.includes(index);
          return (
            <Card
              key={index}
              isTurnedOver={isTurnedOver}
              onPress={() => handleTapCard(index)}
            >
              {card}
            </Card>
          );
        })}
      </View>
      {didPLayerWin() && <Button onPress={resetGame} title="Reiniciar" />}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "900",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
