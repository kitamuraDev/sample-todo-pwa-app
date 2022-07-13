import { FC, useCallback, useRef, useState } from 'react';

import FormDialog from './FormDialog';
import TodoItem from './TodoItem';
import ToolBar from './ToolBar';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const input = useRef<HTMLInputElement>(null);

  const handleOnSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // 空文字 || スペースを含む空文字をsubmitさせない
      if (!input.current?.value.trim()) {
        input.current!.value = '';

        return;
      }

      setTodos([
        {
          value: input.current.value,
          id: new Date().getTime(),
          complated: false,
          removed: false,
        },
        ...todos,
      ]);
      input.current.value = '';
    },
    [todos],
  );

  const handleOnEdit = useCallback(
    (id: Todo['id'], value: Todo['value']) => {
      const newTodos = todos.map((todo) => {
        const copyOfTodo = todo;
        if (todo.id === id) copyOfTodo.value = value;

        return copyOfTodo;
      });

      setTodos(newTodos);
    },
    [todos],
  );

  const handleOnCheck = useCallback(
    (id: Todo['id'], complated: Todo['complated']) => {
      const newTodos = todos.map((todo) => {
        const copyOfTodo = todo;
        if (todo.id === id) copyOfTodo.complated = !complated;

        return copyOfTodo;
      });

      setTodos(newTodos);
    },
    [todos],
  );

  const handleOnRemove = useCallback(
    (id: Todo['id'], removed: Todo['removed']) => {
      const newTodos = todos.map((todo) => {
        const copyOfTodo = todo;
        if (todo.id === id) copyOfTodo.removed = !removed;

        return copyOfTodo;
      });

      setTodos(newTodos);
    },
    [todos],
  );

  const handleOnEmpty = useCallback(() => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  }, [todos]);

  return (
    <>
      <ToolBar filter={filter} />
      <select
        defaultValue='all'
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
        <option value='all'>すべてのタスク</option>
        <option value='checked'>完了したタスク</option>
        <option value='unchecked'>現在のタスク</option>
        <option value='removed'>ごみ箱</option>
      </select>
      <button
        type='button'
        onClick={() => handleOnEmpty()}
        disabled={todos.filter((todo) => todo.removed).length === 0}
      >
        ごみ箱を空にする
      </button>
      <FormDialog input={input} handleOnSubmit={handleOnSubmit} />
      <TodoItem
        todos={todos}
        filter={filter}
        handleOnCheck={handleOnCheck}
        handleOnEdit={handleOnEdit}
        handleOnRemove={handleOnRemove}
      />
    </>
  );
};

export default App;
