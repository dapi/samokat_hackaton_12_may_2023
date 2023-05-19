import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import { httpClient } from '../../services/HttpClient';
import { useDispatch } from 'react-redux';
import { ADD_USER_WIDGET } from '../../sagas/widgets/actions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type DialogTypePropType = {
  title: string;
};

type WidgetType = {
  id: number;
  name: string;
  description: string;
};

const DialogWidgetsAdd = ({ title }: DialogTypePropType) => {
  const [open, setOpen] = React.useState(false);
  const [widgets, setWidgets] = React.useState<WidgetType[]>([]);
  const [widget, setWidget] = React.useState<WidgetType | null>(widgets[0]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    httpClient.get('widgets').then((resp) => setWidgets(resp.data));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddWidget = () => {
    widget && dispatch(ADD_USER_WIDGET(widget.id));
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>Добавить виджет</MenuItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Autocomplete
            isOptionEqualToValue={(option: WidgetType, value: WidgetType) =>
              option.name === value.name
            }
            value={widget}
            onChange={(event, selectedWidget) => {
              setWidget(selectedWidget);
            }}
            id="combo-box-widgets"
            options={widgets}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Виджеты" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddWidget}>Добавить</Button>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { DialogWidgetsAdd };
