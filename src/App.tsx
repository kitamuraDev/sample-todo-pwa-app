import { FC, useCallback, useRef, useState } from 'react';

import FormDialog from './FormDialog';
import SideBar from './SideBar';
import TodoItem from './TodoItem';
import ToolBar from './ToolBar';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpened, setDrawerOpened] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const onToggleDrawer = () => setDrawerOpened(!drawerOpened);
  const handleOnSort = (filterFlag: Filter) => {
    setFilter(filterFlag);
  };

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
      <ToolBar filter={filter} onToggleDrawer={onToggleDrawer} />
      <SideBar
        drawerOpened={drawerOpened}
        onToggleDrawer={onToggleDrawer}
        handleOnSort={handleOnSort}
      />
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
