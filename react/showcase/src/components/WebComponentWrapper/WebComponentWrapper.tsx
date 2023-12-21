import React, { useRef, useEffect, FunctionComponent } from 'react';

interface WebComponentWrapperProps {
  tagName: keyof JSX.IntrinsicElements;
  [key: string]: any;
}

const WebComponentWrapper: FunctionComponent<WebComponentWrapperProps> = ({ tagName, ...props }) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      Object.entries(props).forEach(([key, value]) => {
        console.log({ key, value})
        if (typeof value === 'boolean') {
          element.setAttribute(key, JSON.stringify(value));
        } else {
          // Here we need to handle assignment of properties properly
          element.setAttribute(key, value);
        }
      });
    }
  }, [props, tagName]);

  const TagName = tagName as keyof JSX.IntrinsicElements;
  return React.createElement(TagName as string, { ref, ...props });
};

export default WebComponentWrapper;
