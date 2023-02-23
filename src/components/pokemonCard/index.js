import React from "react";
import "./index.css";
const Index = ({ item }) => {
  const types = item.types;

  return (
    <div className="pokemon-outer-card-div">
      <img className="pokemon-card-image" src={item.backSprite} />
      <h3 className="pokemon-name-typo">{item.key}</h3>
      <div className="pokemon-types">
        {types.map((t) => (
          <div className="pokemon-type1">{t.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Index;
