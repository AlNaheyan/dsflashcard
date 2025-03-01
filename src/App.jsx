"use client"

import { useState } from "react"
import "./App.css"

const flashcards = [
  {
    question: "What is the time complexity of accessing an element in an array?",
    answer: "O(1), as arrays allow direct access to any element using its index.",
    difficulty: "easy",
  },
  {
    question: "Explain the difference between a stack and a queue.",
    answer: "A stack follows LIFO (Last In, First Out), while a queue follows FIFO (First In, First Out).",
    difficulty: "easy",
  },
  {
    question: "How does a linked list differ from an array?",
    answer:
      "A linked list consists of nodes with data and pointers, while an array stores elements in contiguous memory.",
    difficulty: "easy",
  },
  {
    question: "What is the time complexity for searching an element in a binary search tree (BST)?",
    answer: "O(log n) on average, but O(n) in the worst case for an unbalanced tree.",
    difficulty: "medium",
  },
  {
    question: "What is a hash collision and how can it be resolved?",
    answer:
      "A hash collision happens when two keys hash to the same index. It can be resolved by chaining or open addressing.",
    difficulty: "medium",
  },
  {
    question: "How would you implement a breadth-first search (BFS) algorithm on a graph?",
    answer: "BFS uses a queue to visit nodes level by level, starting from the source and exploring neighbors first.",
    difficulty: "medium",
  },
  {
    question: "Describe how a priority queue works and give an example use case.",
    answer:
      "A priority queue processes elements based on priority. It's used in algorithms like Dijkstra's for shortest path.",
    difficulty: "medium",
  },
  {
    question: "What is the difference between a red-black tree and an AVL tree?",
    answer:
      "Red-black trees offer more flexibility with balancing, while AVL trees are more strict, requiring more rotations.",
    difficulty: "hard",
  },
  {
    question: "How does a trie data structure work and what is it typically used for?",
    answer:
      "A trie stores strings in a tree structure, with each node representing a character. It's used for efficient searching and autocomplete.",
    difficulty: "hard",
  },
  {
    question:
      "What is the time complexity of finding the shortest path using Dijkstra's algorithm with a priority queue?",
    answer: "O((V + E) log V), where V is the number of vertices and E is the number of edges.",
    difficulty: "hard",
  },
]

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleCardClick = () => {
    setShowAnswer(!showAnswer)
  }

  const handleNextClick = () => {
    setShowAnswer(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
  }

  const handlePrevClick = () => {
    setShowAnswer(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length)
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

  return (
    <div className="container">
      <div className="header">
        <h1>Data Structures Quiz</h1>
        <p className="subtitle">Test your knowledge of data structures and algorithms</p>
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

      <div className="controls">
        <button className="nav-button prev" onClick={handlePrevClick}>
          Previous
        </button>
        <button className="nav-button next" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  )
}

export default App

