// @ts-nocheck
"use client";

import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
} from "@material-ui/core";
import Card from "./components/card";
import styles from "./page.module.css";
import { pokemonCardSet } from "@/app/lib/cards/card-sets";

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

export default function Memory() {
  const [cards, setCards] = useState(
    shuffleCards.bind(null, pokemonCardSet.concat(pokemonCardSet))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState(Number.POSITIVE_INFINITY);
  const timeout = useRef(null);
  const [storage, setStorage] = useState(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  useEffect(() => {
    setStorage(localStorage);
    setBestScore(localStorage.getItem("bestScore") || Number.POSITIVE_INFINITY);
  }, []);

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === pokemonCardSet.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      storage?.setItem("bestScore", highScore);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffleCards(pokemonCardSet.concat(pokemonCardSet)));
  };

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>Play the Flip card game</h3>
          <div className={styles.content}>
            Select two cards with same content consequtively to make them vanish
          </div>
        </div>

        <div className={styles.memoryContainer}>
          {cards.map((card, index) => {
            return (
              <Card
                key={index}
                card={card}
                index={index}
                isDisabled={shouldDisableAllCards}
                isInactive={checkIsInactive(card)}
                isFlipped={checkIsFlipped(index)}
                onClick={handleCardClick}
              />
            );
          })}
        </div>

        <div className={styles.footer}>
          <div className={styles.score}>
            <div className={styles.moves}>
              <span className={styles.bold}>Moves:</span> {moves}
            </div>
            {storage?.getItem("bestScore") && (
              <div className={styles.highScore}>
                <span className={styles.bold}>Best Score:</span> {bestScore}
              </div>
            )}
          </div>
          <div className={styles.restart}>
            <Button onClick={handleRestart} color="primary" variant="contained">
              Restart
            </Button>
          </div>
        </div>

        <Dialog
          open={showModal}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Hurray!!! You completed the challenge
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You completed the game in {moves} moves. Your best score is{" "}
              {bestScore} moves.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRestart} color="primary">
              Restart
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </main>
  );
}
