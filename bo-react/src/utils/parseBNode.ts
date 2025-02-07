import React, { ReactElement, ReactNode } from 'react';
import isFunction from 'lodash/isFunction';
import { BNode } from '../components/common';
import log from '../components/log';

// 解析 BNode 数据结构
export default function parseTNode(
  renderNode: BNode | BNode<any> | undefined,
  renderParams?: any,
  defaultNode?: ReactNode,
): ReactNode {
  let node: ReactNode = null;

  if (typeof renderNode === 'function') {
    node = renderNode(renderParams);
  } else if (renderNode === true) {
    node = defaultNode;
  } else if (renderNode !== null) {
    node = renderNode ?? defaultNode;
  }
  return node as ReactNode;
}

/**
 * 解析各种数据类型的 BNode
 * 函数类型：content={(props) => <Icon></Icon>}
 * 组件类型：content={<Button>click me</Button>} 这种方式可以避免函数重复渲染，对应的 props 已经注入
 * 字符类型
 */
export function parseContentTNode<T>(bnode: BNode<T>, props: T) {
  if (isFunction(bnode)) return bnode(props) as ReactNode;
  if (!bnode || ['string', 'number', 'boolean'].includes(typeof bnode)) return bnode as ReactNode;
  try {
    return React.cloneElement(bnode as ReactElement, { ...(props || {}) });
  } catch (e) {
    log.warn('parseContentTNode', `${bnode} is not a valid ReactNode`);
    return null;
  }
}
