import React, { useEffect, useRef } from 'react';
import styles from './SharePage.module.css';
import { ShareAPI } from '../../apis';
import { Params, useLoaderData, useNavigate } from 'react-router-dom';
import { isoToCustomFormat } from '../../utils';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const shareLoader = async ({ params }: { params: Params }) => {
  const thread = await ShareAPI.getSharedThread(params.shareKey as string);
  const messages = await ShareAPI.getSharedThreadMessages(
    params.shareKey as string
  );

  return { thread, messages };
};

const SharePage = () => {
  const { thread, messages } = useLoaderData() as {
    thread: ISharedThread;
    messages: ISharedMessage[];
  };
  const messageRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const navigate = useNavigate();

  useEffect(() => {
    const targetIndex =
      messages.findIndex((msg) => msg.id === thread.messageId) + 1;
    const targetQuestionElement = messageRefs.current.get(
      messages[targetIndex].id + ''
    );
    const targetAnswerElement = messageRefs.current.get(thread.messageId + '');

    if (targetQuestionElement && targetAnswerElement) {
      targetQuestionElement.scrollIntoView({ behavior: 'auto' });

      targetAnswerElement.classList.add(styles.blinkAnimation);

      const onAnimationEnd = () => {
        targetAnswerElement.classList.remove(styles.blinkAnimation);
      };

      console.log("!!!!!!!!!!!!!!!!!! 7");
      targetAnswerElement.addEventListener('animationend', onAnimationEnd);

      return () => {
        targetAnswerElement.removeEventListener('animationend', onAnimationEnd);
      };
    }
  }, [messages, thread.messageId]);

  return (
    <>
      <div className={styles.container}>
        <header>
          <h1>{thread.threadName}</h1>
          <div>{isoToCustomFormat(new Date(messages[0].updatedAt))}</div>
        </header>
        {[...messages].reverse().map((msg) => (
          <div
            key={msg.id}
            ref={(el) => messageRefs.current.set(msg.id + '', el)}
            className={`${styles.itemContainer} ${msg.role === 'USER' ? styles.userContainer : styles.answerBox}`}
          >
            <div className={styles.contentBox}>
              <div className={styles.leftBox}>
                <div
                  className={
                    msg.role === 'USER' ? styles.userIcon : styles.answerIcon
                  }
                ></div>
              </div>
              <div className={styles.rightBox}>
                <div className={styles.centerBox}>
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, className, children, style, ...props }) {
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
                    {msg.content}
                  </ReactMarkdown>
                </div>
                {msg.role === 'ASSISTANT' && (
                  <div className={styles.bottomBox}>
                    {/* 아이콘 그룹 등을 여기에 추가할 수 있습니다. */}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.fixedButton}
          onClick={() => {
            navigate('/');
          }}
        >
          AeroChat 시작하기
        </button>
      </div>
    </>
  );
};

export { SharePage, shareLoader };
