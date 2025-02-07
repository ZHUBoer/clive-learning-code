import { useCallback, useState } from 'react';

// https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node

/**
 * 自定义Hook，用于获取和设置DOM元素的引用
 * @returns 一个包含当前DOM元素引用和更新该引用的函数的元组
 */

export default function useDomRefCallback(): [HTMLElement, React.Dispatch<React.SetStateAction<HTMLElement>>] {
  const [refCurrent, setRefCurrent] = useState<HTMLElement>();

  useCallback((dom: HTMLElement) => {
    if (dom) setRefCurrent(dom);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // @ts-ignore
  return [refCurrent, setRefCurrent];
}
