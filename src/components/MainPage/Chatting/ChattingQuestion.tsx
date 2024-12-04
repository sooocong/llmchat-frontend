import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './Chatting.module.css';

interface ChattingQuestionProps {
  message: string;
}

const escapeMarkdownSpecialCharacters = (text: string): string => {
  return text.replace(/([*_`~|#{}[\]<>+=.!$%^&\-\\])/g, '\\$1');
};

const ChattingQuestion: React.FC<ChattingQuestionProps> = ({ message }) => {
  return (
    <div className={styles.questionBox}>
      <div className={styles.contentBox}>
        <div className={styles.leftBox}>
          <div className={styles.userIcon}></div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.questionTextBox}>
            {/* ReactMarkdown 대신 일반 텍스트로 표시 */}
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'inherit',
              }}
            >
              {message}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingQuestion;
