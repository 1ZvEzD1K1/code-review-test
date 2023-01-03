import { memo, useCallback, useState } from 'react';
import { CenteredLayout } from '~/components';
import { useRenderHighlight } from '~/utils';
import css from './optimize-1.module.scss';

const todosData = [
  { id: 1, text: 'run a marathon', done: false },
  { id: 2, text: 'ride an elephant', done: false },
  { id: 3, text: 'swim with a fish', done: false },
];

// TODO Fix all list re-rendering when only one component is changed :(
// ---------------------------------
// DONE: use React.memo() with custom comparison function as the second argument

interface TodoProps {
  text: string;
  done: boolean;
  onClick: () => void;
};

const Todo: React.FC<TodoProps> = ({ text, done, onClick }) => {
  const ref = useRenderHighlight(css.render);
  return (
    <li ref={ref} onClick={onClick} className={css.listItem}>
      {done ? '[x]' : '[ ]'} {text}
    </li>
  );
};

// custom comparison function as the second argument of React.memo().

const areEqual = (prevProps: TodoProps, nextProps: TodoProps) : boolean => {
  const result = prevProps.done === nextProps.done;
  return result;
};

const TodoMemo: React.FC<TodoProps> = memo( Todo, areEqual );

export const Optimize1 = () => {
  const [todos, setTodos] = useState(todosData);

  const handleTodoClick = useCallback(
    (id: number) => {
      setTodos( prev => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
    },
    [],
  );

  return (
    <CenteredLayout className="gap-4">
      <div className="text-3xl">It re-renders all items! =\</div>
      <div>We need to fix that</div>
      <ul>
        {todos.map((item) => (
          <TodoMemo
            key={item.id}
            text={item.text}
            done={item.done}
            onClick={() => handleTodoClick(item.id)}
          />
        ))}
      </ul>
    </CenteredLayout>
  );
};
