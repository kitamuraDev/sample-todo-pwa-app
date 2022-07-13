import { FC, memo } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import CreateIcon from '@mui/icons-material/CreateRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ShareIcon from '@mui/icons-material/Share';
import SubjectIcon from '@mui/icons-material/Subject';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { indigo, lightBlue, pink } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import pjson from '../package.json';

const DrawerList = styled('div')(() => ({
  width: 250,
}));

const DrawerHeader = styled('div')(() => ({
  height: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  backgroundColor: indigo[500],
  color: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

const IconUnChecked = styled(RadioButtonUncheckedIcon)(() => ({
  color: lightBlue[500],
}));

const IconCompleted = styled(CheckCircleIcon)(() => ({
  color: pink.A200,
}));

type Props = {
  drawerOpened: boolean;
  onToggleQR: () => void;
  onToggleDrawer: () => void;
  handleOnSort: (filter: Filter) => void;
};

const SideBar: FC<Props> = memo((props) => (
  <Drawer
    variant='temporary'
    open={props.drawerOpened}
    onClose={props.onToggleDrawer}
  >
    <DrawerList role='presentation' onClick={props.onToggleDrawer}>
      <DrawerHeader>
        <DrawerAvatar>
          <CreateIcon />
        </DrawerAvatar>
        <p>TODO v{pjson.version}</p>
      </DrawerHeader>
      <List>
        <ListItem
          button
          onClick={() => props.handleOnSort('all')}
          aria-label='all'
        >
          <ListItemIcon>
            <SubjectIcon />
          </ListItemIcon>
          <ListItemText secondary='すべてのタスク' />
        </ListItem>
        <ListItem
          button
          onClick={() => props.handleOnSort('unchecked')}
          aria-label='incomplete'
        >
          <ListItemIcon>
            <IconUnChecked />
          </ListItemIcon>
          <ListItemText secondary='現在のタスク' />
        </ListItem>
        <ListItem
          button
          onClick={() => props.handleOnSort('checked')}
          aria-label='complete'
        >
          <ListItemIcon>
            <IconCompleted />
          </ListItemIcon>
          <ListItemText secondary='完了したタスク' />
        </ListItem>
        <ListItem
          button
          onClick={() => props.handleOnSort('removed')}
          aria-label='removed'
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText secondary='ごみ箱' />
        </ListItem>
        <Divider />
        <ListItem button onClick={props.onToggleQR} aria-label='share'>
          <ListItemIcon>
            <ShareIcon />
          </ListItemIcon>
          <ListItemText secondary='このアプリを共有' />
        </ListItem>
      </List>
    </DrawerList>
  </Drawer>
));

export default SideBar;
