import { Card, Paper, Stack, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { EventItem } from './EventItem';

const DAY_NAME = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const EventBox = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()));

  return (
    <Card sx={{ width: 500, height: 260, borderRadius: '16px', padding: '10px' }}>
      <Stack flexDirection="row" justifyContent="space-around" alignItems="stretch">
        <Stack width={350} paddingTop={2} spacing={1}>
          <Typography color="#FF335F" fontSize="18px" fontWeight="700">
            {date && DAY_NAME[date.day()]}
          </Typography>
          <Typography fontSize="28px" fontWeight="700">
            {date?.date()}
          </Typography>
          <EventItem title="Совещание с командой" time=" 18:00 - 18:30" />
          <EventItem title="Встреча с руководством" time=" 12:00 - 13:45" />
        </Stack>
        <DateCalendar value={date} onChange={(newValue) => setDate(newValue)} views={['day']} />
      </Stack>
    </Card>
  );
};

export { EventBox };
