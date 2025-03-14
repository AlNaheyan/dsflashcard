"use client"

import { useState } from "react"
import "./App.css"

const flashcards = [
  {
    question: "What is the time complexity of accessing an element in an array using an index?",
    answer: "O(1)",
    difficulty: "easy",
  },
  {
    question: "What is the key difference between how a stack and a queue process elements?",
    answer: "Stack uses LIFO, Queue uses FIFO",
    difficulty: "easy",
  },
  {
    question: "How does a linked list store elements differently from an array?",
    answer: "List uses pointers, Array in memory",
    difficulty: "easy",
  },
  {
    question: "What is the average and worst-case time complexity for searching in a Binary Search Tree (BST)?",
    answer: "O(log n) avg, O(n) worst",
    difficulty: "medium",
  },
  {
    question: "What is a hash collision in a hash table?",
    answer: "Two keys map to the same index",
    difficulty: "medium",
  },
  {
    question: "What are two common methods to resolve hash collisions?",
    answer: "Chaining, open addressing",
    difficulty: "medium",
  },
  {
    question: "How does the Breadth-First Search (BFS) algorithm explore a graph?",
    answer: "Uses a queue",
    difficulty: "medium",
  },
  {
    question: "What is a priority queue, and what is one common use case?",
    answer: "Processes elements by priority, used in Dijkstra’s",
    difficulty: "medium",
  },
  {
    question: "How does a trie data structure store words efficiently?",
    answer: "Stores words in a tree by characters",
    difficulty: "hard",
  },
  {
    question: "What is the time complexity of Dijkstra’s algorithm using a priority queue?",
    answer: "O((V + E) log V)",
    difficulty: "hard",
  },
];


function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [topScore, setTopScore] = useState(0)
  const [currStreak, setCurrStreak] = useState(0)
  const [AfterMsg, setAftertMsg] = useState("")

  const handleCardClick = () => {
    setShowAnswer(!showAnswer)
  }

  const handleNextClick = () => {
    setShowAnswer(false)
    setAftertMsg("")
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
  }

  const handlePrevClick = () => {
    setShowAnswer(false)
    setAftertMsg("")
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length)
  }

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length) + 1;
    setCurrentIndex(randomIndex)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "easy"
      case "medium":
        return "medium"
      case "hard":
        return "hard"
      default:
        return ""
    }
  }
  const handleScore = () => {
    setTopScore(prevScore =>prevScore + 1)
    setCurrStreak(prevStreak => prevStreak + 1)
  }

  const handleuserInput = (event) => {
    setUserInput(event.target.value)
  }

  const checkUserAnswer = (event) => {
    event.preventDefault()
    const userWords = userInput.trim().toLowerCase().split(/\s+/)
    const answerWords = flashcards[currentIndex].answer.toLowerCase().split(/\s+/)

    const commonWords = userWords.filter(word => answerWords.includes(word))
    const threshold = Math.ceil(answerWords.length * 0.5)
    const correctMessage = "You got it correct!"
    const wrongMessage = "You got it wrong, try again!"

    if (commonWords.length >= threshold) {
      console.log("correct")
      handleScore()
      setAftertMsg(correctMessage)

    } else {
      console.log("incorrect")
      setAftertMsg(wrongMessage)
      setCurrStreak(0)
    }
    setUserInput("")
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Data Structures Quiz</h1>
        <p className="subtitle">Test your knowledge of data structures and algorithms</p>
      </div>

      <div className="scoreContainer">
        <h4>Score: {topScore}</h4>
        <h4>Current Streak: {currStreak}</h4>
      </div>

      <div className="progress-container">
        <div className="progress-info">
          <span>
            Card {currentIndex + 1} of {flashcards.length}
          </span>
          <span className={`difficulty ${getDifficultyColor(flashcards[currentIndex].difficulty)}`}>
            {flashcards[currentIndex].difficulty}
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}></div>
        </div>
      </div>

      <div className={`flashcard ${showAnswer ? "flipped" : ""}`} onClick={handleCardClick}>
        <div className="flashcard-inner">
          <div className={`flashcard-front ${getDifficultyColor(flashcards[currentIndex].difficulty)}`}>
            <p className="question">{flashcards[currentIndex].question}</p>
            <p className="hint">Click to reveal answer</p>
          </div>
          <div className={`flashcard-back ${getDifficultyColor(flashcards[currentIndex].difficulty)}`}>
            <p className="answer">{flashcards[currentIndex].answer}</p>
          </div>
        </div>
      </div>

      <div className="aftermessage-container">
        {AfterMsg}
      </div>

      <div className="userInputContainer">
        <input className="inputBox" 
          placeholder="Type your answer here"
          type="text"
          value={userInput}
          onChange={handleuserInput}>
        </input>
        <button className="nav-button-2" onClick={checkUserAnswer}>
          Check answer
        </button>

      </div>
      <div className="controls">
        <button className="nav-button prev" onClick={handlePrevClick}>
          Previous
        </button>
        <button className="nav-button next" onClick={handleNextClick}>
          Next
        </button>
        <button className="nav-button shuffle" onClick={handleShuffle}> Shuffle</button>
      </div>
    </div>
  )
}

export default App

