import { FC, useCallback, useState } from 'react';
import { Annotation } from '~/types/Annotation';
import Send from '../../../images/send.svg';
import { namePattern } from '../annotation.utils.pattern';
import { marginButtonAndInfo } from '../annotations.variable.space-between-button-and-field';

type Props = {
  comment: Annotation,
  scale: number,
  handleTipClick: () => void,
  createAnnotation: (author: string, message: string) => void,
}

export const NewComment: FC<Props> = ({
  comment, scale, handleTipClick, createAnnotation,
}) => {
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [author, setAuthor] = useState('');
  const [authorError, setAuthorError] = useState(false);

  
  const handleMessage = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMessage(event.target.value);
    setMessageError(false);
  }, []);

  const handleAuthor = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAuthor(event.target.value);
    setAuthorError(false);
  }, []);

  const checkAuthor = useCallback(() => {
    setAuthorError(!namePattern.test(author));

    return !namePattern.test(author);
  }, [author]);

  const checkMessage = useCallback(() => {
    setMessageError(!message.trim());

    return !message.trim();
  }, [message]);

  const sendAnnotation = useCallback(() => {
    if (!checkAuthor() && !checkMessage()) {
      createAnnotation(author, message);
    }
  }, [message, author]);

  return (
    <>
      <div
        className="annotations__button"
        style={{
          top: `${comment.properties.y * scale}px`,
          left: `${comment.properties.x * scale}px`,
        }}
        onClick={handleTipClick}
      >
        {comment.id}
      </div>

      <div
        className="annotations__comment"
        style={{
          top: `${comment.properties.y * scale + marginButtonAndInfo}px`,
          left: `${comment.properties.x * scale}px`,
        }}
      >
        <div className="annotations__input-wrapper">
          <div className="annotations__input-box">
            <input
              type="text"
              placeholder="Name LastName"
              className="annotations__input"
              value={author}
              onChange={handleAuthor}
              onBlur={checkAuthor}
              required
            />
          </div>

          {authorError && <p className="error">Expect two words that starts with capital letter</p>}

          <div className="annotations__input-box">
            <input
              type="text"
              placeholder="Leave a comment"
              className="annotations__input"
              value={message}
              onChange={handleMessage}
              onBlur={checkMessage}
              required
            />

            <img
              src={Send}
              alt="send annotation"
              className="annotations__send"
              onClick={sendAnnotation}
            />
          </div>

          {messageError && <p className="error">Must contain at least one letter</p>}
        </div>
      </div>
    </>
  );
}
