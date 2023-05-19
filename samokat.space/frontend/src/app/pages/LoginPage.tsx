import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { RootState } from '../../redux/store';
import { SIGNIN } from '../../sagas/auth/actions';
import ErrorMessage from '../components/ErrorMessage';

const LoginSchema = yup
  .object({
    email: yup.string().required('Введите Email').email('Неверный формат Email'),
    password: yup
      .string()
      .required('Введите пароль')
      .min(5, 'Пароль должен содержать не менее 5 символов')
      .max(40, 'Пароль должен содержать не более 40 символов'),
  })
  .required();

const LoginPage = () => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(LoginSchema) });

  const { user, error } = useSelector((state: RootState) => state.currentUser);

  const onSubmit = (data: any) => dispatch(SIGNIN(data.email, data.password));

  if (user.access_token) return <Navigate to="/home" />;

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ width: '100%', height: '100vh' }}
      spacing={10}>
      <Typography variant="h1">Вход в Samokat.Space</Typography>
      <Box
        sx={{
          width: '40%',
        }}>
        {error && <ErrorMessage error={error} visible />}

        <Stack spacing={1}>
          <Typography color="#d32f2f" fontSize={12} textAlign="right">
            <>{errors.email?.message}</>
          </Typography>
          <TextField
            {...register('email')}
            error={!!errors.email?.message}
            label="Email адрес"
            type="email"
          />

          <Typography color="#d32f2f" fontSize={12} textAlign="right">
            <>{errors.password?.message}</>
          </Typography>
          <TextField
            {...register('password')}
            error={!!errors.password?.message}
            label="Пароль"
            type="password"
          />

          <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={!isValid}>
            SIGN IN
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export { LoginPage };
