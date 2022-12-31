import { useCallback, useState } from 'react';
import { CenteredLayout } from '~/components';
import { todosData } from './optimize-1.data.todosData';
import { Todo } from './Todo';
import { TodosData } from '~/types/TodosData';

export const Optimize1 = () => {
  const [todos, setTodos] = useState<TodosData[]>(todosData);

  const handleTodoClick = useCallback(
    (id: number) => (
      setTodos(current => (
        current
          .map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo)
    ))), [],
  );

  return (
    <CenteredLayout className="gap-4">
      <div className="text-3xl">It re-renders all items! =\</div>
      <div>We need to fix that</div>
      <ul>
        {todos.map((item) => (
          <Todo
            key={item.id}
            item={item}
            onClick={handleTodoClick}
          />
        ))}
      </ul>
    </CenteredLayout>
  );
};
