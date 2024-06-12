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

const ChattingQuestion: React.FC<ChattingQuestionProps> = ({ message }) => {
  return (
    <div className={styles.questionBox}>
      <div className={styles.contentBox}>
        <div className={styles.leftBox}>
          <div className={styles.userIcon}></div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.questionTextBox}>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                ol: ({ children }) => (
                  <ol className={styles.list}>{children}</ol>
                ),
                ul: ({ children }) => (
                  <ul className={styles.list}>{children}</ul>
                ),
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingQuestion;
