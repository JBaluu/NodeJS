const Marker = ({ isGuess }) => {
  return (
    <>
      <img
        src={isGuess ? "guess.png" : "target.png"}
        alt="marker"
        style={{
          background: "transparent",
          width: "40px",
          height: "40px",
          marginLeft: "-20px",
          marginTop: "-40px",
        }}
      />
    </>
  );
};

export default Marker;
