import { FC, memo } from 'react';

type Props = {
  todos: Todo[];
  filter: Filter;
  handleOnCheck: (id: Todo['id'], complated: Todo['complated']) => void;
  handleOnEdit: (id: Todo['id'], value: Todo['value']) => void;
  handleOnRemove: (id: Todo['id'], removed: Todo['removed']) => void;
};

const TodoItem: FC<Props> = memo((props) => {
  const FilteredTodos = props.todos.filter((todo) => {
    switch (props.filter) {
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

  return (
    <ul>
      {FilteredTodos.map((todo) => (
        <li key={todo.id}>
          <input
            type='checkbox'
            checked={todo.complated}
            disabled={todo.removed}
            onChange={() => props.handleOnCheck(todo.id, todo.complated)}
          />
          <input
            type='text'
            value={todo.value}
            disabled={todo.complated || todo.removed}
            onChange={(e) => props.handleOnEdit(todo.id, e.target.value)}
          />
          <button
            type='button'
            onClick={() => props.handleOnRemove(todo.id, todo.removed)}
          >
            {todo.removed ? '復元' : '削除'}
          </button>
        </li>
      ))}
    </ul>
  );
});

export default TodoItem;
