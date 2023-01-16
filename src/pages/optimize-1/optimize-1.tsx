import { useCallback, useState } from 'react';
import { CenteredLayout } from '~/layouts';
import { Todo } from '~/components/Todo/Todo';

export interface ITodo {
  id: number,
  text: string,
  done: boolean
}

const todosData = [
  { id: 1, text: 'run a marathon', done: false },
  { id: 2, text: 'ride an elephant', done: false },
  { id: 3, text: 'swim with a fish', done: false },
];

// TODO Fix all list re-rendering when only one component is changed :(
//* Done(?)

export const Optimize1 = () => {
  const [todos, setTodos] = useState<ITodo[]>(todosData);
  const handleTodoClick = useCallback(
    (id: number) => {
      setTodos(prevTodos => prevTodos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
    },
    [todos],
  );

  return (
    <CenteredLayout className='gap-4'>
      <div className='text-3xl'>It re-renders all items! =\</div>
      <div>We need to fix that</div>
      <ul>
        { todos.map((item) => (
          <Todo
            key={ item.id }
            text={ item.text }
            done={ item.done }
            onClick={ () => handleTodoClick(item.id) }
          />
        )) }
      </ul>
    </CenteredLayout>
  );
};
