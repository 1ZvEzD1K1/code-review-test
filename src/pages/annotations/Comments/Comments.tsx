import { FC, memo, useCallback } from 'react';
import { Annotation } from '~/types/Annotation';
import Delete from '../../../images/Delete.svg'
import { marginButtonAndInfo } from '../annotations.variable.space-between-button-and-field';

type Props = {
  annotation: Annotation,
  scale: number,
  clearAnnotation: (id: number) => void,
  handleAnnotationDetails: (id: number) => void,
};

export const Comments: FC<Props> = memo(({
  annotation, scale, clearAnnotation, handleAnnotationDetails,
}) => {
  const removeAnnotation = useCallback(() => clearAnnotation(annotation.id), []);
  const closeOpenDetails = useCallback(() => handleAnnotationDetails(annotation.id), []);

  return (
    <>
      <div
        className="annotations__button"
        style={{
          top: `${annotation.properties.y * scale}px`,
          left: `${annotation.properties.x * scale}px`,
        }}
        onClick={closeOpenDetails}
      >
        {annotation.id}
      </div>

      {annotation.properties.isOpen && (
        <div
          className="annotations__comment"
          style={{
            top: `${annotation.properties.y * scale + marginButtonAndInfo}px`,
            left: `${annotation.properties.x * scale}px`,
          }}
        >
          <div className="annotations__info-box">
            <div className="annotations__author-logo">
              {annotation.author.split(' ').map((part) => part[0])}
            </div>

            <div className="annotations__info">
              <p className="annotations__message annotations__message--weight-bolt">
                {annotation.author}
              </p>

              <p className="annotations__message">{annotation.properties.message}</p>
            </div>

            <img
              src={Delete}
              alt="send annotation"
              className="annotations__delete-btn"
              onClick={removeAnnotation}
            />
          </div>
        </div>
      )}
    </>
  );
});
