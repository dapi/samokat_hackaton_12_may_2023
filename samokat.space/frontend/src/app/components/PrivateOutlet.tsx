import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

const PrivateOutlet = () => {
  let access_token = useSelector((state: RootState) => state.currentUser.user.access_token);

  if (localStorage.getItem('access-token') && access_token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
export { PrivateOutlet };
