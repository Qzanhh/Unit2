import React, { useState } from "react";
import './Card.css';


const Card = ({ question, answer, difficulty, image }) => {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleCardClick = () => {
      setIsFlipped(!isFlipped);
    };
  
    return (
      <div className={`card ${isFlipped ? 'flipped' : ''}` } onClick={handleCardClick}>
        <div className="card-inner">
          <div className={`card-front ${difficulty}` }>
            <h3>{question}</h3>
            <img src={image} alt="" />
          </div>
          <div className={`card-back ${difficulty}` }>
            <p>{answer}</p>
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;