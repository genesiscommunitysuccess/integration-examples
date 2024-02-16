import { layoutComponentName, layoutNameByRouteMap } from '../config';
import { LayoutComponentName } from '../types/layout';

const getLayoutNameByRoute = (route: string): LayoutComponentName => {
  const currentLayoutName = layoutNameByRouteMap.get(route);

  if (currentLayoutName) {
    return currentLayoutName;
  }

  return layoutComponentName.default;
};

export default getLayoutNameByRoute;
