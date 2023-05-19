import { Grid } from '@mui/material';
import { ReserveWidget } from '../components/widgets/ReserveWidget';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { GET_USER_WIDGETS } from '../../sagas/widgets/actions';

const HomePage = () => {
  const { widgets } = useSelector((state: RootState) => state.userWidgets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GET_USER_WIDGETS());
  }, []);
  return (
    <>
      <Grid justifyContent="center" container spacing={{ md: 12, lg: 12, xl: 12 }}>
        {widgets.map((widget, index) => (
          <Grid key={widget.id} item xs={12} md={6} xl={5}>
            <ReserveWidget widgetId={widget.id} title={widget.name} free="3/20" />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export { HomePage };
