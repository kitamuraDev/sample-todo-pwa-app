import { FC, memo } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

type Props = {
  alertOpened: boolean;
  onToggleAlert: () => void;
  handleOnEmpty: () => void;
};

const Alert = styled(Dialog)(() => ({
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const AlertDialog: FC<Props> = memo((props) => (
  <Alert open={props.alertOpened} onClose={props.onToggleAlert}>
    <DialogTitle>アラート</DialogTitle>
    <DialogContent>
      <DialogContentText>本当にごみ箱を完全に空にしますか？</DialogContentText>
      <DialogContentText>この操作は取り消しできません。</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color='primary' aria-label='cancel' onClick={props.onToggleAlert}>
        キャンセル
      </Button>
      <Button
        color='secondary'
        aria-label='ok'
        autoFocus
        onClick={() => {
          props.onToggleAlert();
          props.handleOnEmpty();
        }}
      >
        OK
      </Button>
    </DialogActions>
  </Alert>
));

export default AlertDialog;
