import { FC, memo } from 'react';

import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';
import { QRCode } from 'react-qrcode-logo';

const TodoBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
}));

type Props = {
  open: boolean;
  onToggleQR: () => void;
};

const QRcode: FC<Props> = memo((props) => (
  <TodoBackdrop open={props.open} onClick={props.onToggleQR}>
    <QRCode value='https://kitamuradev.github.io/sample-todo-pwa-app' />
  </TodoBackdrop>
));

export default QRcode;
