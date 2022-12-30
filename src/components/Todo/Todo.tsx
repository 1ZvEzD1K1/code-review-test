import React, { memo } from 'react';
import { useRenderHighlight } from '~/utils';
import css from '~/pages/optimize-1/optimize-1.module.scss';

export interface TodoProps {
  text: string;
  done: boolean;
  onClick: () => void;
}

export const Todo = memo(({ text, done, onClick }: TodoProps) => {
    const ref = useRenderHighlight(css.render);
    return (
      <li ref={ ref } onClick={ onClick } className={ css.listItem }>
        { done ? '[x]' : '[ ]' } { text }
      </li>
    );
  }, (prevProps, nextProps) => {
    //? props have the same keys, so we can take any of them
    const isPropsValuesEqual = (Object.keys(prevProps) as Array<keyof TodoProps>)
      .reduce((acc: boolean[], key: keyof TodoProps) => {
        //? to avoid callbacks props such as onClick, onSubmit, etc
        if (!key.match(/on[A-Z]+.*/g)) {
          const isValueEquals = prevProps[key] === nextProps[key];
          return isValueEquals ? acc : [...acc, isValueEquals];
        }

        return acc;
      }, []);
    //? if final array isn't empty, props was changed
    return !isPropsValuesEqual.length;
  },
);

