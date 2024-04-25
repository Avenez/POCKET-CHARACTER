import "./App.css";
import { Dice } from "./components/DiceBox";
import DiceParser from "@3d-dice/dice-parser-interface";
import DisplayResults from "@3d-dice/dice-ui/src/displayResults";
import DiceSideMenu from "./components/DiceSideMenu/DiceSideMenu";
import { CustomResults } from "./components/Results/CustomResults";
import { useDispatch } from "react-redux";
import { fillFinalResults, fillResults, setIsOpen } from "./REDUX/ResultSlice";
import { Registrazione } from "./components/Registrazione/Registrazione.jsx";
import { Login } from "./components/Registrazione/Login.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginConteiner } from "./components/Registrazione/LoginContainer.jsx";
import { SplashPage } from "./components/SplashPage/SplashPage.jsx";
import { Main } from "./components/Main/Main.jsx";
import CharacterList from "./components/Characters/CharacterMain/CharacterList.jsx";
import CharacterSheetMain from "./components/Characters/CharacterSheet/CharacterSheetMain.jsx";
import Navbar from "./components/NavBar/Navbar.jsx";
import BackofficeMain from "./components/Backoffice/BackofficeMain.jsx";
import UserSheet from "./components/Backoffice/UserSheet.jsx";
import PageNotFound from "./components/PageNotFound.jsx/PageNotFound.jsx";
import About from "./components/About/About.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import FAQMain from "./components/FAQ/FAQMain.jsx";

// Creo un Dice Parse per poter individuare i numeri dei dati e passarli al Dice Result
const DRP = new DiceParser();

// Creo l'overlay per mostrare il risulòtato del tiro
const DiceResults = new DisplayResults("#dice-box");

// Inizializzo il diceBox in modo che possa essere usato
Dice.init().then(() => {});

// ----------- Funzione per il lancio dei dadi------

// -----Creo delle variabili per gestire i timeout e clear intervall per la scomparsa dei dadi e del conteggio
let rollTimeout;
let clearTimeout1;
let clearTimeout2;

// ------funzione del lancio dei dadi al di fuori di App per poter essere esportata dove serve

export const rollDice = (string) => {
  // Svuoto eventuali timeout precedenti
  clearIntervalTimeouts();

  // Lancio il dado
  Dice.show().roll(DRP.parseNotation(string));

  // Avvia il primo timeout dopo 2 secondi
  rollTimeout = setTimeout(() => {
    Dice.hide().clear();
    console.log("TimeOut");
  }, 5000);

  // Avvia il secondo timeout dopo 8 secondi
  clearTimeout1 = setTimeout(() => {
    DiceResults.clear();
  }, 8000);
};

// Pulisci tutti i timeout e intervalli precedenti
const clearIntervalTimeouts = () => {
  clearInterval(rollTimeout);
  clearTimeout(clearTimeout1);
  clearTimeout(clearTimeout2);
};

// ----------APP

const App = () => {
  const dispatch = useDispatch();
  // -------Funzione che si attiva quando i dati hanno smesso di ruotare
  Dice.onRollComplete = (results) => {
    // console.log("results:-", results);
    // Considera i reroll di dadi multipli. DRP è il DiceParser
    const rerolls = DRP.handleRerolls(results);

    // in caso di roll multipli sommo i valori
    if (rerolls.length) {
      rerolls.forEach((roll) => Dice.add(roll, roll.groupId));
      return rerolls;
    }
    // Se non ci sono roll multipli passa direttamente il valore finale

    // mostro i risultati in DiceResults creato fuori da App
    // (Ricorda che lo stile del Dice Results può essere cambiato all'interno del suo CSS nella cartella "@3d-dice/dice-ui/src/displayResults" )

    const finalResults = DRP.parseFinalResults(results);
    // console.log("finalResults:-", finalResults);
    // DiceResults.showResults(finalResults);
    dispatch(fillResults(results));
    dispatch(fillFinalResults(finalResults));
    dispatch(setIsOpen(false));
    setTimeout(() => {
      dispatch(setIsOpen(true));
    }, "10");
    //dispatch(setIsOpen(true));
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/Login" element={<LoginConteiner />} />
          <Route path="/Main" element={<Main />} />
          {/* <Route path="/Main/:characterId" element={<Main />} /> */}
          <Route path="/Backoffice" element={<BackofficeMain />} />
          <Route path="/Backoffice/User/:idUser" element={<UserSheet />} />
          <Route path="/Profile/:idUser" element={<UserProfile />} />
          <Route path="/Characters" element={<CharacterList />} />
          <Route path="/Character/:characterId" element={<CharacterSheetMain />} />
          <Route path="/About" element={<About />} />
          <Route path="/Faq" element={<FAQMain />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
