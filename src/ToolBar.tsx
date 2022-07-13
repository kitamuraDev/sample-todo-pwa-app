import { FC, memo } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

type Props = {
  filter: Filter;
};

const ToolBar: FC<Props> = memo((props) => {
  const translator = (arg: Filter) => {
    switch (arg) {
      case 'all':
        return 'すべてのタスク';
      case 'unchecked':
        return '現在のタスク';
      case 'checked':
        return '完了したタスク';
      case 'removed':
        return 'ごみ箱';
      default:
        return 'TODO';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography>{translator(props.filter)}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default ToolBar;
