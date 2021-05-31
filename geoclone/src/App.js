import "./App.css";
import { useState, useEffect } from "react";
import StreetView from "./components/StreetView";
import OverlayMap from "./components/OverlayMap";
import Results from "./components/Results";
import { getRandom } from "./Utils/mapHelper";
import locations from "./components/locations.json";

const App = () => {
  const API_KEY = "AIzaSyBEzsiB9ULE2O1_4Jkt5SKVb8HAtcmWLZY";
  const [positions, setPositions] = useState();
  const [round, setRound] = useState(0);
  const [position, setPosition] = useState();
  const [guessPosition, setGuessPosition] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setPositions(getRandom(locations, 3));
  }, []);

  useEffect(() => {
    if (positions) setPosition(positions[round]);
  }, [positions, round]);

  const guess = (_position) => {
    setGuessPosition(_position);
    setIsModalOpen(true);
    console.log(_position);
  };

  const [actualRound, setActualRound] = useState(1);
  const nextRound = () => {
    setActualRound(actualRound + 1);
    console.log(actualRound);
  };

  return (
    <div className="App">
      {position && positions && (
        <>
          <OverlayMap API_KEY={API_KEY} guess={guess} />
          {position ? (
            <StreetView API_KEY={API_KEY} position={position} />
          ) : null}
          {isModalOpen && (
            <Results
              API_KEY={API_KEY}
              isOpen={isModalOpen}
              handleClose={() => {
                if (round + 1 < positions.length) {
                  setPosition(null);
                  setRound(round + 1);
                  setIsModalOpen(false);
                  nextRound();
                } else {
                  setPosition(null);
                  setRound(0);
                  setPositions(getRandom(locations, 3));
                  setIsModalOpen(false);
                }
              }}
              guess={guessPosition}
              position={position}
              actualRound={actualRound}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
