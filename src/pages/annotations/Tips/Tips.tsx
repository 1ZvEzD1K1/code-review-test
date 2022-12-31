import { FC, memo } from 'react';
import './Tips.scss';
import Mouse from '../../../images/mouse.png';
import Plus from '../../../images/plus.svg';

export const Tips: FC = memo(() => {
  return (
    <div className="annotations__tips tips">
      <span className="tips__text">
        To leave a comment, mouseover
      </span>

      <div className="tips__icon-box">
        <img
          src={Plus}
          alt="x-mark"
          className="tips__icon"
        />
      </div>

      <span className="tips__text">
        on an image and click the left mouse button
      </span>

      <div className="tips__icon-box">
        <img
          src={Mouse}
          alt="mouse"
          className="tips__icon"
        />
      </div>
    </div>
  )
});
