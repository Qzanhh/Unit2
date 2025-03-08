import './App.css';
import cardData from './cards.json';
import Card from './components/Card';
import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const card = cardData[count];

  function nextClick() {
    setCount((count + 1) % 20);
  }
  function prevClick() {
    setCount((count + 19) % 20);
  }
  return (
    <div className='App'>
      <div className='header'>
        <h1>Welcome to your study</h1>
        <p>Ready to test your knowledge ? </p>
      </div>
      <div className='container'>
        <p>Number of cards: {cardData.length}</p>
        <p>Your current card number: {count + 1}</p>
        <Card question={card.question} answer={card.answer} difficulty={card.difficulty} image={card.image}/>
        <button onClick={prevClick}>Previous</button>
        <button onClick={nextClick}>Next</button>
      </div>
    </div>
  );
}

export default App