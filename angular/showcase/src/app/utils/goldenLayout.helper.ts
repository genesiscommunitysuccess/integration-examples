const ERROR_PREFIX = 'Golden layout helper - ';

export const setComponentItemsMap = (
  layoutNativeElement: any,
  componentMapInstance: Map<string, any>,
): Function => {
  if (!layoutNativeElement.layout) {
    throw new Error(`${ERROR_PREFIX} - layout is not defined`);
  }

  const componentSetter = ({ _target: componentItem }: any) => {
    componentMapInstance.set(componentItem.componentName, componentItem);
  };

  layoutNativeElement.layout.on('componentCreated', componentSetter);

  return () => layoutNativeElement.layout.off('componentCreated', componentSetter);
};

export const getElementByTagFromComponent = (componentInstance: any, tag: string): any => {
  if (componentInstance) {
    const { _element } = componentInstance;
    const element = _element.getElementsByTagName(tag)[0];

    return element;
  }

  throw new Error(`${ERROR_PREFIX} - component instance is not defined`);
};
