import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material';

const Events = () => {
  return (
    <Box sx={{ width: 500, borderRadius: '16px', backgroundColor: 'white', padding: '8px' }}>
      <Stack>
        <Box>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={2}>
            <Typography color="#FF335F" fontSize="18px" fontWeight="700">
              События
            </Typography>
            <Button variant="text" sx={{ color: '#226965' }}>
              Показать все
            </Button>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between">
            <Avatar
              alt="Какой-то чел"
              src="https://thumbs.dreamstime.com/b/%D1%8E-%D0%B8-%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-s-%D1%87%D0%B5-%D0%BE%D0%B2%D0%B5%D0%BA%D0%B0-69803479.jpg"
              sx={{ width: 70, height: 70 }}
            />
            <Stack alignItems="flex-start" spacing={1} paddingLeft={4}>
              <Typography variant="h1" sx={{ fontSize: '15px', fontWeight: '500' }}>
                Анонс корпоративной конференции
              </Typography>
              <Typography variant="h3" sx={{ color: '#16615D', fontSize: '15px' }}>
                Самокатов Николай - Главный специалист HR-службы
              </Typography>
              <Typography variant="h3" sx={{ fontSize: '13px' }}>
                Приглашаем сотрудников принять участие в корп. конференции компании. В программе
                выступления сотрудников с докладами, кофе-брейк, тематич ...
              </Typography>
              <Button variant="text" sx={{ color: '#226965' }}>
                Подробнее
              </Button>
            </Stack>
          </Stack>
          <Divider sx={{ marginTop: '5px', marginBottom: '25px' }} />
          <Stack flexDirection="row" justifyContent="flex-start">
            <Avatar
              alt="Какой-то чел"
              src="https://thumbs.dreamstime.com/b/%D1%8E-%D0%B8-%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-s-%D1%87%D0%B5-%D0%BE%D0%B2%D0%B5%D0%BA%D0%B0-69803479.jpg"
              sx={{ width: 70, height: 70 }}
            />
            <Stack alignItems="flex-start" spacing={1} paddingLeft={4}>
              <Typography variant="h1" sx={{ fontSize: '15px', fontWeight: '500' }}>
                Обращение директора
              </Typography>
              <Typography variant="h3" sx={{ color: '#16615D', fontSize: '15px' }}>
                Самокатов Николай - Директор
              </Typography>
              <Typography variant="h3" sx={{ fontSize: '13px' }}>
                Презентация стратегии компании на 2023 год для ...
              </Typography>
              <Button variant="text" sx={{ color: '#226965' }}>
                Подробнее
              </Button>
            </Stack>
          </Stack>
          <Divider sx={{ marginTop: '5px', marginBottom: '25px' }} />
          {/* <Stack flexDirection="row" justifyContent="space-between">
            <Avatar
              alt="Какой-то чел"
              src="data:image/jpeg;base64,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"
              sx={{ width: 70, height: 70 }}
            />
            <Stack alignItems="flex-start" spacing={1} paddingLeft={4}>
              <Typography variant="h1" sx={{ fontSize: '15px', fontWeight: '500' }}>
                Анонс корпоративной конференции
              </Typography>
              <Typography variant="h3" sx={{ color: '#16615D', fontSize: '15px' }}>
                Самокатов Николай - Главный специалист HR-службы
              </Typography>
              <Typography variant="h3" sx={{ fontSize: '13px' }}>
                Приглашаем сотрудников принять участие в корп. конференции компании. В программе
                выступления сотрудников с докладами, кофе-брейк, тематич ...
              </Typography>
              <Button variant="text" sx={{ color: '#226965' }}>
                Подробнее
              </Button>
            </Stack>
          </Stack> */}
        </Box>
      </Stack>
    </Box>
  );
};

export { Events };
