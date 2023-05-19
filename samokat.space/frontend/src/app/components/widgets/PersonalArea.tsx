import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { RootState } from '../../../redux/store';
import { setCurrentUser, userInfoInitialState } from '../../../redux/slices/currentUser/slice';
import { DialogWidgetsAdd } from '../DialogWidgetsAdd';
import { setUserWidgets } from '../../../redux/slices/userWidgets/slice';

const PersonalArea = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setCurrentUser(userInfoInitialState));
    dispatch(setUserWidgets([]));
  };

  const { user } = useSelector((state: RootState) => state.currentUser);

  return (
    <Card sx={{ width: 500, height: 160, borderRadius: '16px' }}>
      <Stack flexDirection="row" justifyContent="flex-end">
        <div>
          <IconButton aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}>
            <DialogWidgetsAdd title="Добавление виджетов" />
            <MenuItem onClick={handleLogout}>Выйти</MenuItem>
          </Menu>
        </div>
      </Stack>
      <Stack flexDirection="row" justifyContent="space-around" alignItems="center">
        <Avatar alt={user.name} src={user.imgUrl} sx={{ width: 100, height: 100 }} />
        <CardContent>
          <Typography variant="h3" sx={{ color: '#16615D', fontSize: '15px' }}>
            {user.email}
          </Typography>
          <Typography variant="h1" sx={{ fontSize: '28px', fontWeight: 400 }}>
            {user.name}
          </Typography>
          <Typography variant="h3" sx={{ color: '#16615D', fontSize: '15px' }}>
            {user.jobTitle}
          </Typography>
        </CardContent>
      </Stack>
    </Card>
  );
};

export { PersonalArea };
