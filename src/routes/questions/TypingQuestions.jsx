import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typical from 'react-typical';
import './TypingQuestions.css';

const TypingQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(6).fill(null));
  const [showOptions, setShowOptions] = useState(Array(6).fill(false));
  const navigate = useNavigate();
  const questions = [
    {
      question: "What is the primary characteristic of your unused land or vacant space?",
      options: [
        "a) Large open field",
        "b) Small vacant lot",
        "c) Undeveloped forested area",
        "d) Urban rooftop or balcony space"
      ]
    },
    {
      question: "What type of project are you most interested in implementing on your unused land?",
      options: [
        "a) Community garden for local food production",
        "b) Organic farming with crop rotation",
        "c) Solar farm for renewable energy",
        "d) Homestay or eco-lodge for tourism"
      ]
    },
    {
      question: "How do you plan to utilize the space for infrastructure or facilities?",
      options: [
        "a) Establishing a solar energy installation",
        "b) Building a community or event space",
        "c) Developing an agricultural production area",
        "d) Creating a recreational or leisure facility (e.g., park, sports field)"
      ]
    },
    {
      question: "Which of the following best describes your goals for using the unused land?",
      options: [
        "a) Generating income through commercial activities",
        "b) Contributing to environmental sustainability (e.g., solar power, green spaces)",
        "c) Enhancing community engagement and local tourism",
        "d) Personal hobby or experimental project"
      ]
    },
    {
      question: "What is your preferred method of development for the land?",
      options: [
        "a) Installing renewable energy systems (e.g., solar panels, wind turbines)",
        "b) Constructing residential or commercial buildings",
        "c) Creating agricultural facilities (e.g., greenhouses, farms)",
        "d) Setting up recreational or cultural spaces (e.g., parks, art installations)"
      ]
    },
    {
      question: "How soon are you looking to start utilizing the unused land?",
      options: [
        "a) Immediately",
        "b) Within the next 6 months",
        "c) Within the next 1-2 years",
        "d) I am not sure yet"
      ]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const updatedShowOptions = [...showOptions];
      updatedShowOptions[currentQuestion] = true;
      setShowOptions(updatedShowOptions);
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentQuestion, showOptions]);

  const handleOptionSelect = (questionIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;
    setSelectedOptions(updatedOptions);

    if (questionIndex < questions.length - 1) {
      setCurrentQuestion(questionIndex + 1);
    }
  };

  const isSubmitEnabled = selectedOptions.every(option => option !== null);

  const handleSubmit = () => {
    navigate('/nagri', { state: { answers: selectedOptions } });
  };

  return (
    <div>
      <img src="/orbital.png" alt="" className="orbital" />
      {questions.map((q, questionIndex) => (
        <div key={questionIndex} className="typing-question">
          {questionIndex <= currentQuestion && (
            <>
              <Typical
                steps={[q.question, 1000]}
                wrapper="h2"
                onFinishedTyping={() => {
                  const updatedShowOptions = [...showOptions];
                  updatedShowOptions[questionIndex] = true;
                  setShowOptions(updatedShowOptions);
                }}
              />
              {showOptions[questionIndex] && (
                <ul className="typing-options">
                  {q.options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionSelect(questionIndex, option)}
                      className={selectedOptions[questionIndex] === option ? 'selected' : ''}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      ))}
      {currentQuestion === questions.length - 1 && (
        <button className="submit-button" disabled={!isSubmitEnabled} onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default TypingQuestions;
