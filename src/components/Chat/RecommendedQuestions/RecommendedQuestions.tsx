import React from 'react';
import style from './RecommendedQuestions.module.css';
import { useThreads } from '../../../hooks';
import { ReactComponent as AerochatIcon } from '../../../assets/aerochatIcon.svg';
import { getIsSidebarOpen } from '../../../utils';

const RecommendedQuestions = () => {
  const { sendMessage } = useThreads();
  const isSidebarOpen =  getIsSidebarOpen()
  const QUESTIONS = [
    `유치원생에게 '노스탤지어' 설명하기`,
    '고대 문명 퀴즈',
    '카메라에 잘 받는 옷 고르기',
    '생산성 극대화를 위한 모닝 루틴',
  ];
  return (
    <div
      className={`${style.recQuestionContainer} ${isSidebarOpen ? style.sidebarVisible : style.sidebarHidden}`}
    >
      <div className={style.recQuestionLogo}>
        <AerochatIcon />
      </div>
      <ul className={style.recQuestionList}>
        {QUESTIONS.map((question, i) => (
          <li
            key={i}
            className={style.recQuestionitem}
            onClick={() => {
              sendMessage(question);
            }}
          >
            <p>{question}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { RecommendedQuestions };
