import { useState } from 'react';
import { data } from '../../data/data';
import LongMenu from 'components/Menu/LongMenu';
import { ResultPage } from 'components/ResultPage/ResultPage';
import {
  ButtonContainer,
  Button,
  QuestionNumber,
  NextBtn,
  Question,
  CodeExmpContainer,
  ToMainBtn,
  ToMainContainer,
} from './Card.styled';

export const Card = () => {
  const totalCards = data.length;
  const [disabled, setDisabled] = useState(false);
  const [id, setId] = useState(1);
  const [scoring, setScoring] = useState(0);
  const [resultPage, setResultPage] = useState(false);

  const currentCard = data.find(card => card.id === String(id));
  const { question, codeExample, possiblAnswer, correctAnswer } = currentCard;

  const handelClickNextBtn = () => {
    setId(prev => prev + 1);
    setDisabled(false);

    const elements = document.querySelectorAll('#answer');
    elements.forEach(element => {
      element.classList.remove('green');
      element.classList.remove('red');
    });
  };

  const handelClickResultBtn = () => {
    setResultPage(true);
  };

  const handelClick = e => {
    const selectedAnswer = e.target.dataset.answer;
    if (selectedAnswer === correctAnswer) {
      e.target.classList.add('green');
      setDisabled(true);
      setScoring(prev => prev + 1);
    } else {
      e.target.classList.add('red');
      setDisabled(true);
    }
  };

  const handelChoiceQuestion = id => {
    setId(Number(id));
  };

  return (
    <>
      {resultPage ? (
        <ResultPage total={totalCards} scoring={scoring} />
      ) : (
        <>
          <ToMainContainer>
            <LongMenu currentId={id} onChoice={handelChoiceQuestion} />
            <ToMainBtn to="/">На Главную</ToMainBtn>
          </ToMainContainer>
          <Question>{question}</Question>
          <QuestionNumber>{`Вопрос №${id}`}</QuestionNumber>

          <CodeExmpContainer
            dangerouslySetInnerHTML={{ __html: codeExample }}
          ></CodeExmpContainer>

          <ButtonContainer>
            {data.length === id ? (
              <NextBtn
                type="button"
                onClick={handelClickResultBtn}
                disabled={!disabled}
              >
                Рузультат
              </NextBtn>
            ) : (
              <NextBtn
                type="button"
                onClick={handelClickNextBtn}
                disabled={!disabled}
              >
                Далее
              </NextBtn>
            )}
            {possiblAnswer.map((answer, index) => {
              return (
                <Button
                  onClick={handelClick}
                  id="answer"
                  disabled={disabled}
                  data-answer={answer}
                  key={index}
                >
                  {answer}
                </Button>
              );
            })}
          </ButtonContainer>
        </>
      )}
    </>
  );
};
