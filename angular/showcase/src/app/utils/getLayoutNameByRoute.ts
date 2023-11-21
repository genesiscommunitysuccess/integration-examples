import { layoutComponentName } from '../config';
import { LayoutComponentName } from '../types/layout';

const LayoutNameByRouteMap: Map<string, LayoutComponentName> = new Map([
  ['/auth', layoutComponentName.blank],
]);

const getLayoutNameByRoute = (route: string): LayoutComponentName => {
  const currentLayoutName = LayoutNameByRouteMap.get(route);

  if (currentLayoutName) {
    return currentLayoutName;
  }

  return layoutComponentName.default;
};

export default getLayoutNameByRoute;
