import { FC, memo } from 'react';

type Props = {
  input: React.RefObject<HTMLInputElement>;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FormDialog: FC<Props> = memo((props) => (
  <form onSubmit={(e) => props.handleOnSubmit(e)}>
    <input type='text' ref={props.input} />
    <input type='submit' value='追加' />
  </form>
));

export default FormDialog;
