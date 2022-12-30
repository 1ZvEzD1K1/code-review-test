import { memo, useCallback, useState } from 'react';
import { CenteredLayout } from '~/components';
import { useRenderHighlight } from '~/utils';
import css from './optimize-1.module.scss';

interface ITodo {
  id: number;
  text: string;
  done: boolean;
}

const todosData: ITodo[] = [
  { id: 1, text: 'run a marathon', done: false },
  { id: 2, text: 'ride an elephant', done: false },
  { id: 3, text: 'swim with a fish', done: false },
];

interface TodoProps {
  id: number;
  text: string;
  done: boolean;
  onClick: (id: number) => void;
}

const Todo = memo(({ id, text, done, onClick }: TodoProps) => {
  const ref = useRenderHighlight(css.render);
  return (
    <li ref={ref} onClick={() => onClick(id)} className={css.listItem}>
      {done ? '[x]' : '[ ]'} {text}
    </li>
  );
});

export const Optimize1 = () => {
  const [todos, setTodos] = useState<ITodo[]>(todosData);

  const handleTodoClick = useCallback((id: number) => {
    setTodos((oldtodos: ITodo[]) =>
      oldtodos.map((todo: ITodo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }, []);

  return (
    <CenteredLayout className="gap-4">
      <div className="text-3xl">{'Now it is working better :)'}</div>
      <div>{'A problem has been fixed'}</div>
      <ul>
        {todos.map((item) => (
          <Todo
            key={item.id}
            id={item.id}
            text={item.text}
            done={item.done}
            onClick={handleTodoClick}
          />
        ))}
      </ul>
    </CenteredLayout>
  );
};
