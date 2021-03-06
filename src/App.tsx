import { FC, useCallback, useEffect, useRef, useState } from 'react';

import localforage from 'localforage';

import ActionButton from './ActionButton';
import AlertDialog from './AlertDialog';
import FormDialog from './FormDialog';
import { isTodos } from './lib/isTodos';
import QRcode from './QRcode';
import SideBar from './SideBar';
import TodoItem from './TodoItem';
import ToolBar from './ToolBar';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [QROpened, setQROpened] = useState(false);
  const [formDialogOpened, setFormDialogOpened] = useState(false);
  const [alertOpened, setAlertOpened] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const onToggleDrawer = () => setDrawerOpened(!drawerOpened);
  const onToggleQR = () => setQROpened(!QROpened);
  const onToggleFormDialog = () => setFormDialogOpened(!formDialogOpened);
  const onToggleAlert = () => setAlertOpened(!alertOpened);

  // マウント時に indexedDB からデータを読み込み、stateに保存
  useEffect(() => {
    localforage
      .getItem('TodoStore')
      .then((values) => isTodos(values) && setTodos(values))
      .catch((e) => console.error(e));
  }, []);
  // todosに変化が起こったとき（crud操作）にindexedDBへstateの情報をセット
  useEffect(() => {
    localforage.setItem('TodoStore', todos).catch((e) => console.error(e));
  }, [todos]);

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
      setFormDialogOpened(false);
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
        onToggleQR={onToggleQR}
        onToggleDrawer={onToggleDrawer}
        handleOnSort={handleOnSort}
      />
      <QRcode open={QROpened} onToggleQR={onToggleQR} />
      <FormDialog
        input={input}
        handleOnSubmit={handleOnSubmit}
        formDialogOpened={formDialogOpened}
        onToggleFormDialog={onToggleFormDialog}
      />
      <AlertDialog
        alertOpened={alertOpened}
        onToggleAlert={onToggleAlert}
        handleOnEmpty={handleOnEmpty}
      />
      <TodoItem
        todos={todos}
        filter={filter}
        handleOnCheck={handleOnCheck}
        handleOnEdit={handleOnEdit}
        handleOnRemove={handleOnRemove}
      />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpened={alertOpened}
        formDialogOpened={formDialogOpened}
        onToggleAlert={onToggleAlert}
        onToggleFormDialog={onToggleFormDialog}
      />
    </>
  );
};

export default App;
