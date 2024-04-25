import DiceBox from "@3d-dice/dice-box";
// Tutto il lancio dei dadi si basa sulla libreria Fantastice Dice https://fantasticdice.games/docs/intro

/*  --------------- DICE BOX -------------- */
// Note the dice-box assets in the public folder.
// Those files are all necessary for the web workers to function properly
// create new DiceBox class

const diceColorSelected = localStorage.getItem("diceColor");
const defaultThemeColor = "#5f646b";
const themeColor = diceColorSelected ? diceColorSelected : defaultThemeColor;

// Questa è la classe per creare un nuovo DICEBOX. La sua creazione implica la selezione del contenitore che si trova in index.html attraverso l'ID
// Oltre questo è necessario selezionare gli assets nella cartella dedicata
// Subito dopo possiamo avere diversi parametri per la gestione dei dadi. Altre opzioni possono essere trovate qui https://fantasticdice.games/docs/usage/config

const Dice = new DiceBox(
  "#dice-box", // target DOM element to inject the canvas for rendering
  {
    id: "dice-canvas", // canvas element id
    assetPath: "/assets/dice-box/",
    startingHeight: 8,
    themeColor: themeColor,
    throwForce: 6,
    spinForce: 5,
    lightIntensity: 0.9,
    scale: 4,
  }
);

export { Dice };
