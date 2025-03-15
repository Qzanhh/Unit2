import './App.css';
import cardData from './cards.json';
import Card from './components/Card';
import { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [streak, setStreak] = useState(0)
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const card = cardData[count];
  // let longestStreak = 0;
  const [longestStreak, setLongestStreak] = useState(0);
  const nextClick = () =>{
    setCount((count + 1) % 20);
    setFeedback('');
    setGuess('');
    setIsCorrect(null);
  }

  const prevClick = () => {
    setCount((count + 19) % 20);
    setFeedback('');
    setGuess('');
    setIsCorrect(null);
  }

  const shuffleClick = () => {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    setCount(randomIndex);
    setFeedback('');
    setGuess('');
    setIsCorrect(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = '';
    
    if (guess.toLowerCase() === card.answer.toLowerCase()) {
      message = 'Correct! 🎉';
      setStreak(streak+1)
      setIsCorrect(true);
    } else {
      message = `Incorrect! The answer is: ${card.answer}`;
      setStreak(0);
      setIsCorrect(false);
    }
    
    setFeedback(message);
  }

  // Define styles based on correctness
  const getContainerStyle = () => {
    if (isCorrect === true) {
      return { backgroundColor: '#e6ffeb', borderColor: '#34d399', borderWidth: '2px' };
    } else if (isCorrect === false) {
      return { backgroundColor: '#ffebeb', borderColor: '#f87171', borderWidth: '2px' };
    }
    return {};
  };

  const getInputStyle = () => {
    if (isCorrect === true) {
      return { 
        backgroundColor: '#d1fae5', 
        borderColor: '#34d399', 
        borderWidth: '2px',
        color: '#047857'
      };
    } else if (isCorrect === false) {
      return { 
        backgroundColor: '#fee2e2', 
        borderColor: '#f87171', 
        borderWidth: '2px',
        color: '#b91c1c'
      };
    }
    return {};
  };

  const getFeedbackStyle = () => {
    if (isCorrect === true) {
      return { color: '#047857', fontWeight: 'bold' };
    } else if (isCorrect === false) {
      return { color: '#b91c1c', fontWeight: 'bold' };
    }
    return {};
  };
  useEffect(() => {
    if (streak > longestStreak) {
      setLongestStreak(streak);
    }
  }, [streak, longestStreak]);

  return (
    <div className='App'>
      <div className='header'>
        <h1>Welcome to your study</h1>
        <p>Your streak: {streak} ~~ Your longest streak: {longestStreak} ~~ Your card number: {count}</p>
      </div>
      <div className='container'>
        <p>Number of cards: {cardData.length}</p>
        <Card question={card.question} answer={card.answer} difficulty={card.difficulty} image={card.image} />
        
        <form 
          onSubmit={handleSubmit} 
          className="p-4 border rounded-xl shadow-md"
          style={getContainerStyle()}
        >
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Your guess"
            className="p-2 border rounded-xl w-full"
            style={getInputStyle()}
          />
          <button type='submit'>Submit guess</button>
        </form>
        
        {feedback && (
          <p style={getFeedbackStyle()} className="mt-2">
            {feedback}
          </p>
        )}
        
        <div>
          <button onClick={prevClick}>Previous</button>
          <button onClick={shuffleClick}>Shuffle</button>
          <button onClick={nextClick}>Next</button>
          {/* <button onClick={markClick}>Mark as learnt</button> */}
        </div>
      </div>
    </div>
  );
}

export default App;