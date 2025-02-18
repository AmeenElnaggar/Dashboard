import { StoreInterface } from '../store';

export const sidenavSelector = (state: StoreInterface) => {
  return state.sidenav.visible;
};
