import { useNavigationState } from '@react-navigation/native';

const useCurrentRoute = () => {
  const routes = useNavigationState(state => state.routes);
  return routes[routes.length - 1].name;
};

export default useCurrentRoute;
