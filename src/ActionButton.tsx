/* eslint-disable react/jsx-no-useless-fragment */
import { FC, memo } from 'react';

import CreateIcon from '@mui/icons-material/CreateRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';

const FabButton = styled(Fab)({
  position: 'fixed',
  right: 15,
  bottom: 15,
});

type Props = {
  todos: Todo[];
  filter: Filter;
  alertOpened: boolean;
  formDialogOpened: boolean;
  onToggleAlert: () => void;
  onToggleFormDialog: () => void;
};

const ActionButton: FC<Props> = memo((props) => {
  const removed = props.todos.filter((todo) => todo.removed).length === 0;

  return (
    <>
      {props.filter === 'removed' ? (
        <FabButton
          aria-label='delete-button'
          color='secondary'
          onClick={props.onToggleAlert}
          disabled={removed || props.alertOpened}
        >
          <DeleteIcon />
        </FabButton>
      ) : (
        <FabButton
          aria-label='add-button'
          color='secondary'
          onClick={props.onToggleFormDialog}
          disabled={props.filter === 'checked' || props.formDialogOpened}
        >
          <CreateIcon />
        </FabButton>
      )}
    </>
  );
});

export default ActionButton;
