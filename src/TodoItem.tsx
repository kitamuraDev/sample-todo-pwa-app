import { FC, memo } from 'react';

import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import UndoIcon from '@mui/icons-material/Undo';
import { Card, Typography, TextField } from '@mui/material';
import { pink, grey, lightBlue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

type Props = {
  todos: Todo[];
  filter: Filter;
  handleOnCheck: (id: Todo['id'], complated: Todo['complated']) => void;
  handleOnEdit: (id: Todo['id'], value: Todo['value']) => void;
  handleOnRemove: (id: Todo['id'], removed: Todo['removed']) => void;
};

const Container = styled('div')({
  margin: '0 auto',
  maxWidth: '640px',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
});

const TodoCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const Form = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  fontSize: '16px',
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const Button = styled('button')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}));

const Trash = styled('button')(() => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}));

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
    <Container>
      {FilteredTodos.map((todo) => (
        <TodoCard key={todo.id}>
          <Form>
            <TextField
              fullWidth
              variant='standard'
              value={todo.value}
              disabled={todo.complated || todo.removed}
              onChange={(e) => props.handleOnEdit(todo.id, e.target.value)}
            />
          </Form>
          <ButtonContainer>
            <Button
              aria-label='check'
              disabled={props.filter === 'removed'}
              onClick={() => props.handleOnCheck(todo.id, todo.complated)}
            >
              {todo.complated ? (
                <CheckIcon
                  sx={{
                    color: props.filter !== 'removed' ? pink.A200 : grey[500],
                  }}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  sx={{
                    color:
                      props.filter !== 'removed' ? lightBlue[500] : grey[500],
                  }}
                />
              )}
              <Typography
                sx={{
                  userSelect: 'none',
                  color:
                    todo.complated && props.filter !== 'removed'
                      ? pink.A200
                      : grey[500],
                }}
              >
                Done
              </Typography>
            </Button>
            <Trash
              aria-label='trash'
              onClick={() => props.handleOnRemove(todo.id, todo.removed)}
            >
              {todo.removed ? (
                <UndoIcon sx={{ color: lightBlue[500] }} />
              ) : (
                <DeleteIcon sx={{ color: grey[500] }} />
              )}
            </Trash>
          </ButtonContainer>
        </TodoCard>
      ))}
    </Container>
  );
});

export default TodoItem;
