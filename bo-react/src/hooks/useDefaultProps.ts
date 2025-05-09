import { useMemo } from 'react';

// defaultProps 将于 19.0.0 废弃，故需实现 hook 在组件内部兼容
// https://github.com/facebook/react/pull/16210
export default function useDefaultProps<T>(originalProps: T, defaultProps: Record<PropertyKey, any>): T {
  return useMemo<T>(() => {
    // eslint-disable-next-line
    const props = Object.assign({}, originalProps);
    Object.keys(defaultProps).forEach((key) => {
      // https://github.com/facebook/react/blob/main/packages/react/src/jsx/ReactJSXElement.js#L733-L740

      // @ts-ignore
      if (props[key] === undefined) {
        // @ts-ignore
        props[key] = defaultProps[key];
      }
    });
    return props;
  }, [originalProps, defaultProps]);
}
