import { Box, Button, Card, IconButton, Stack, Typography } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { EventItem } from './EventItem';
import { useDispatch } from 'react-redux';
import { DELETE_USER_WIDGET } from '../../../sagas/widgets/actions';
import ClearIcon from '@mui/icons-material/Clear';

const carIcon = (
  <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.3636 6.29414L16.9187 5.19648L16.1298 3.25C15.4525 1.5793 13.8371 0.5 12.0135 0.5H6.98646C5.16325 0.5 3.54746 1.5793 2.87019 3.25L2.08129 5.19648L1.63637 6.29414C0.681625 6.65234 0 7.55703 0 8.625V10.5C0 11.1297 0.243833 11.698 0.633333 12.1379V14.25C0.633333 14.9402 1.20056 15.5 1.9 15.5H3.16667C3.8661 15.5 4.43333 14.9402 4.43333 14.25V13H14.5667V14.25C14.5667 14.9402 15.1339 15.5 15.8333 15.5H17.1C17.7994 15.5 18.3667 14.9402 18.3667 14.25V12.1379C18.7562 11.6984 19 11.1301 19 10.5V8.625C19 7.55703 18.3184 6.65234 17.3636 6.29414ZM5.22223 4.17852C5.51079 3.4668 6.20944 3 6.98646 3H12.0135C12.7906 3 13.4892 3.4668 13.7778 4.17852L14.5667 6.125H4.43333L5.22223 4.17852ZM3.16667 10.4922C2.40667 10.4922 1.9 9.99375 1.9 9.24609C1.9 8.49844 2.40667 8 3.16667 8C3.92667 8 5.06667 9.12148 5.06667 9.86914C5.06667 10.6168 3.92667 10.4922 3.16667 10.4922ZM15.8333 10.4922C15.0733 10.4922 13.9333 10.6168 13.9333 9.86914C13.9333 9.12148 15.0733 8 15.8333 8C16.5933 8 17.1 8.49844 17.1 9.24609C17.1 9.99375 16.5933 10.4922 15.8333 10.4922Z"
      fill="#16615D"
    />
  </svg>
);

const workplaceIcon = (
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 15C4 15 3 15 3 14C3 13 4 9.99999 8 9.99999C12 9.99999 13 13 13 14C13 15 12 15 12 15H4ZM8 9.04999C8.66304 9.04999 9.29893 8.7866 9.76777 8.31775C10.2366 7.84891 10.5 7.21303 10.5 6.54999C10.5 5.88695 10.2366 5.25106 9.76777 4.78222C9.29893 4.31338 8.66304 4.04999 8 4.04999C7.33696 4.04999 6.70107 4.31338 6.23223 4.78222C5.76339 5.25106 5.5 5.88695 5.5 6.54999C5.5 7.21303 5.76339 7.84891 6.23223 8.31775C6.70107 8.7866 7.33696 9.04999 8 9.04999Z"
      fill="#16615D"
    />
    <path
      d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V11.5C0 11.8978 0.158035 12.2794 0.43934 12.5607C0.720644 12.842 1.10218 13 1.5 13H2.153C2.36209 12.2651 2.72551 11.5833 3.219 11H1V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H14C14.2652 1 14.5196 1.10536 14.7071 1.29289C14.8946 1.48043 15 1.73478 15 2V11H12.781C13.335 11.654 13.671 12.373 13.847 13H14.5C14.8978 13 15.2794 12.842 15.5607 12.5607C15.842 12.2794 16 11.8978 16 11.5V2C16 1.46957 15.7893 0.960859 15.4142 0.585786C15.0391 0.210714 14.5304 0 14 0H2Z"
      fill="#16615D"
    />
  </svg>
);

const peoplesIcon = (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="21" height="21" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_27_606" transform="scale(0.0104167)" />
      </pattern>
      <image
        id="image0_27_606"
        width="96"
        height="96"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAHQUlEQVR4nO1dW4wURRRtQIwBFWGnanYJBp+J4jO+4yNGTYyKjw+dwG7f231vLxmUqOCPX4ZV8RFU1A8S9MfHh/FHosZgiFER1GCMxkiQiBF/QDQCKhpFZAFze9ZlgZ3dnq7q7tmZOkklk8zu3nPvqaquW1111/McHBwcHBwcHBwcHBwcHBwcHByaHGWAyR1heJY0+Vw0n/ZAX994xRBogo81Y79mPDjQ5PM6zQHIzxRNsyXREc2drhjXDwl6vfapCsPOovm2FMoAWhH+kCD4cVOEW7qq3SWvZVGpTNCEPYrhLc2wTTHu1Qw/KcY1JYb7bc/JmmF10uAfarDKJge1oHK8Jn+h+Djg694B39/U7HdLTLw8oKnnPMWwcUTnCbeXIn+2FXuhf0Pjwa+1chRcZ4NDmeA2RfjziKOOcUM5CM7xsoQO/Ss0wR8JA9CvCENjmwyvpBVAE75kal8xsCbYn9Dm7jLD5V4W6GRWMvQaCYAM044ILzGxqwi3pBaA4XsT2+Xe4DJN8G+Dom+fjtjh2YZifD5lINYZ2v07rQDyuya2NcMnqewSPutZRbU6UTP8ljYQnb14dlrTimBXegFgZ1q75QjONZj6fp9VqRyb1vbRQWC8Ov00gAdlZWRg+/PUAhB+ltauZlxk4rMiuDKt7WHI+N2GZJ5Ja1sxPmxge3F6u7DMxOdyCHO9ZhFAMz5tkoTp5CuvodPAnyYZsXQaIwEI56S1fTSZMLzKaASEeJ+JfU3+whSj7t68bWY2BckDRR4sacnIjmWeqzDFsMzUXif7swwE+FUWLp5NKILnUpEh+Mgahwho5IxUtgggsGVvYNc112deXcjmliQZDRL5p0T+Rdb3ZDgATfiqiBs3yZYj8OU7m7Y6yb+0tufTiACwbUZv7zQvC0iaLel2QjL9KkT0xjhUBHTEu4eR2m4RLVNCsuGkCL4erReoEG7yWgQlwls04Y+j+PyVScLZGPr6xss6VzOs1IRb42FKuF0xfiCrj65qdZLXYigDTJbVnPg4uB1NuFViEC853Zs4BwcHh2zRd+0x8RsywqWK4TVNsFZa7TMule/kZ5wMljG1WpmiGB+XDDNJFqoIHpvm+yc6ISygTDhHEe5oPBvFHYqw0rIizAzD4+L1MeNiTbhcETwqu6ZTwvAkSybGKcYlmvGAwZ7MAeElf8sGIfEtPg0ivhIuF98lBhILL9cjKQwPyNumYXsewx7ZC+mIohNMzKha8NMG/sgtEREhNWQ6k9eMsrVSx2eJxaLMj6ZIMqIJ3k3kNMPGzqhnZio7hHMMe/4wIyHddFQOw1MU4TfJ7MCq7M6pxucy5RBSAz2PYWOjI2GqPHBTzPkJRsEvjT6YB3p+wuAPirDS1pR3GGS3MZXzBE81ZIfxCdvBP9QhcEkjXGTaKfxt2CCZ0U7D1R8Fe6RXJz99gUmWmmlHwa6keYI8cOvN+QmE3uDZRIm6zzRxPGmP0AbHEG0fVzQ+iBAEpxsHfpAM4R15rEK0ZLMZC6AJnsxlFRb5txsH/lBg/HmGAqxI6PTrWQsg2xaJuBCsMBppDL2eLWiGqpkA+GIiOwRrsxcA1yThIpzNbEHVOPC5C8DwRdYCiI0kXJwA7ARwI4BbZwraUZteRm6K4K/MnwGxjSRcTLPxJhKgPRs4AbQToOheiG4EFB8IdFNQ8cHA9n4GKIJNktiMrQab2i4Tbia0ZSbcTHACFIzWEoBxffwixPa1nSxQrU4UrglL4+QjQFwvwYjMYNutCd8oEUalqt/lNQmEi3ASbg1cQBml0wHbIxj5sy0JMLQd0IxfyjHC+EZhXuVeBJXKBLEptoWD5SMwcStxcLM1vrp3brmBiiFpe8xOCciUnp6pXkaQu1ux4HUOlVlrBPvlfrNV8orgw0xJ8/8NNk+b58+wSl7OGxGdrBm/y8MHxfi+bf5eifxrshiqengRVtvmrxjfy4U7wX6rl7QPc4LgkXwEQKMKK8NdLMyLtybo87JE7TR0ts8DbbnYRe1CYfY9XxM85OUBuQsrB1EbuD9b6DpaZ/lCiXCfxKIUhhd7eUNKc5UJrtcUzJeyMorhBUX4ttTpGby+OsYFUAPXUcWn2DfxUUroUDBffM+kPJntWnNSfUpFwY1Sx0ExPCiFN2SloJtEAOFS4yTcIBCuwlm4e60KxXBBswigg+B8r90gSZFuEgGyTP6aGmrEYyj5CCAcvHaFZthctACa8FuvXaHiwhcFj4Astg3GCvSIZYlzGwEve+0KVdsOLnoENHRvrKWgGO4pWgAd4d1eu6LMeGvRAtgqsz8mocLwwqIFkITQa1d0SSXGggVo+r2cjDGufjIWgC0jcZnL+kmY/VvtYwm6tq195NJwX9o6E/XqPdS2jY8S4B2v3aG557Qj/kNSfxYrE0W4YOj7C/nPHOV5cKptO2MSXdXqJMXBXXIfWfXCGVnZkb8d24jgzlYsreng4ODg4ODg4ODg4ODgjY7/AD4PMu3VNFGOAAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);

type ReserveMeetingRoomType = {
  title: string;
  free: string;
  widgetId: number;
};

const ReserveWidget = ({ title, free, widgetId }: ReserveMeetingRoomType) => {
  const icon =
    title === 'Парковка' ? carIcon : title === 'Переговорки' ? peoplesIcon : workplaceIcon;

  const dispatch = useDispatch();
  const handlerDeleteWidget = () => {
    dispatch(DELETE_USER_WIDGET(widgetId));
  };
  return (
    <Card
      sx={{
        width: 350,
        height: 350,
        borderRadius: '16px',
        padding: '15px',
        position: 'relative',
      }}>
      <Box sx={{ position: 'absolute', top: '0px', right: '5px' }}>
        <IconButton aria-label="delete" size="small">
          <ClearIcon onClick={handlerDeleteWidget} />
        </IconButton>
      </Box>
      <Stack flexDirection="column" justifyContent="space-around" height="100%">
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
          <Stack flexDirection="row">
            {icon}
            <Typography component="div" marginLeft={1}>
              {title}
            </Typography>
          </Stack>
          <Button variant="text" sx={{ color: '#226965' }}>
            Перейти
          </Button>
        </Stack>
        <Box>
          {title === 'Переговорки' ? (
            <>
              <EventItem title="Встреча с руководством" time=" 18:00 - 18:30" />
              <EventItem title="Митинг с командой" time=" 10:00 - 11:30" />
            </>
          ) : title === 'Парковка' ? (
            <>
              <EventItem title="Парковка №1 / Место 12" time=" 09:00 - 18:30" />
            </>
          ) : title === 'Рабочее место' ? (
            <>
              <EventItem title="Томск / Samokat.tech / OpenSpace" time=" 11:15 - 18:30" />
              <EventItem title="Томск / Samokat.tech / Кабинет №27" time=" 10:00 - 19:30" />
            </>
          ) : (
            <></>
          )}
        </Box>

        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ bottom: 0 }}>
          <Button variant="text" sx={{ color: '#226965' }} startIcon={<ControlPointIcon />}>
            Забронировать
          </Button>
          <Typography>Свободно {free}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export { ReserveWidget };
