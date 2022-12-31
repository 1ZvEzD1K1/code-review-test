import { FC, memo } from 'react';
import { TodosData } from '~/types/TodosData';
import { useRenderHighlight } from '~/utils';
import css from '../optimize-1.module.scss';

type Props = {
  item: TodosData;
  onClick: (id: number) => void;
}

export const Todo: FC<Props> = memo(({
  item, onClick,
}) => {
  const {id, text, done} = item;
  const ref = useRenderHighlight(css.render);

  return (
    <li
      ref={ref}
      onClick={() => onClick(id)}
      className={css.listItem}
    >
      {done ? '[x]' : '[ ]'} {text}
    </li>
  );
});

