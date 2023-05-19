import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { PersonalArea } from './widgets/PersonalArea';
import { EventBox } from './widgets/EventBox';
import { Events } from './widgets/Events';

const Layout = () => {
  return (
    <Box sx={{ paddingTop: 10, backgroundColor: '#F8F9FC', height: '100vh' }}>
      <Stack flexDirection="row" justifyContent="space-between">
        <Outlet />
        <Stack marginRight={4} spacing={2}>
          <PersonalArea />
          <EventBox />
          <Events />
        </Stack>
      </Stack>
    </Box>
  );
};

export { Layout };
