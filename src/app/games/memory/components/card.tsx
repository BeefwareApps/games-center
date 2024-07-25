// @ts-nocheck

import React from "react";
import classnames from "classnames";
import Image from "next/image";
import "./card.css";

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive,
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <Image
          src="/games-center/pokeball.png"
          width={500}
          height={500}
          alt="pokeball"
        />
      </div>
      <div className="card-face card-back-face">
        <Image src={card.image} width={500} height={500} alt="card" />
      </div>
    </div>
  );
};

export default Card;
