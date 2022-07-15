import { FC, memo } from 'react';

import { Box, Button, Dialog, DialogActions, TextField } from '@mui/material';

type Props = {
  input: React.RefObject<HTMLInputElement>;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formDialogOpened: boolean;
  onToggleFormDialog: () => void;
};

const FormDialog: FC<Props> = memo((props) => (
  <Dialog
    fullWidth
    open={props.formDialogOpened}
    onClose={props.onToggleFormDialog}
  >
    <form onSubmit={(e) => props.handleOnSubmit(e)}>
      <Box sx={{ margin: '1em' }}>
        <TextField
          autoFocus
          variant='standard'
          label='タスクを入力'
          inputRef={props.input}
          sx={{
            width: '100%',
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
          }}
        />
        <DialogActions>
          <Button
            aria-label='add'
            type='submit'
            color='secondary'
            onClick={() => props.handleOnSubmit}
          >
            追加
          </Button>
        </DialogActions>
      </Box>
    </form>
  </Dialog>
));

export default FormDialog;
