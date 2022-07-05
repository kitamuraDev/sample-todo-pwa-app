import { FC, useCallback, useEffect, useRef, useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
  complated: boolean;
  removed: boolean;
};

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const FilteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed; // 未削除
      case 'checked':
        return todo.complated && !todo.removed; // 完了済み かつ 未削除
      case 'unchecked':
        return !todo.complated && !todo.removed; // 未完了 かつ 未削除
      case 'removed':
        return todo.removed; // 削除済み
      default:
        return todo;
    }
  });

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

  return (
    <div>
      <select
        defaultValue='all'
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
        <option value='all'>すべてのタスク</option>
        <option value='checked'>完了したタスク</option>
        <option value='unchecked'>現在のタスク</option>
        <option value='removed'>ごみ箱</option>
      </select>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input
          type='text'
          ref={input}
          disabled={filter === 'checked' || filter === 'removed'}
        />
        <input
          type='submit'
          value='追加'
          disabled={filter === 'checked' || filter === 'removed'}
          onSubmit={(e) => e.preventDefault()}
        />
      </form>

      <ul>
        {FilteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type='checkbox'
              checked={todo.complated}
              disabled={todo.removed}
              onChange={() => handleOnCheck(todo.id, todo.complated)}
            />
            <input
              type='text'
              value={todo.value}
              disabled={todo.complated || todo.removed}
              onChange={(e) => handleOnEdit(todo.id, e.target.value)}
            />
            <button
              type='button'
              onClick={() => handleOnRemove(todo.id, todo.removed)}
            >
              {todo.removed ? '復元' : '削除'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
