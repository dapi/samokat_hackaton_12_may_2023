import { Paper, Typography } from '@mui/material';
type EventTimeType = {
  title: string;
  time: string;
};

const EventItem = ({ title, time }: EventTimeType) => {
  return (
    <Paper sx={{ backgroundColor: '#F8F9FC', paddingLeft: '8px', marginTop: '12px' }}>
      <Typography color="#16615D" fontWeight="600">
        {title}
      </Typography>
      <Typography color="#16615D" fontWeight="600">
        {time}
      </Typography>
    </Paper>
  );
};

export { EventItem };
