import { FC } from 'react';

const App: FC = () => (
  <div>
    <form onSubmit={(e) => e.preventDefault()}>
      <input type='text' value='' onChange={(e) => e.preventDefault()} />
      <input type='submit' value='追加' onSubmit={(e) => e.preventDefault()} />
    </form>
  </div>
);

export default App;
