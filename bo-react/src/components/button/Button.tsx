import React, { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import useDomRefCallback from '../../hooks/useDomRefCallback';
import { Loading } from 'tdesign-react';
import { BorButtonProps } from './type';
import { buttonDefaultProps } from './defaultProps';
import parseBNode from '../../utils/parseBNode';
import useDefaultProps from '../../hooks/useDefaultProps';

export interface ButtonProps
  extends BorButtonProps,
  Omit<React.AllHTMLAttributes<HTMLElement>, 'content' | 'shape' | 'size' | 'type'> { }

const Button = forwardRef((originProps: ButtonProps, ref: React.ForwardedRef<HTMLElement>) => {
  const props = useDefaultProps(originProps, buttonDefaultProps);
  const {
    type,
    theme,
    variant,
    icon,
    disabled,
    loading,
    size,
    block,
    ghost,
    shape,
    children,
    content,
    className,
    suffix,
    href,
    tag,
    onClick,
    ...buttonProps
  } = props;


  const [btnDom, setRefCurrent] = useDomRefCallback();

  const renderChildren = content ?? children;

  let iconNode = icon;
  if (loading) iconNode = <Loading loading={loading} inheritColor={true} />;

  const renderTheme = useMemo(() => {
    if (!theme) {
      if (variant === 'base') return 'primary';
      return 'default';
    }
    return theme;
  }, [theme, variant]);

  const renderTag = useMemo(() => {
    if (!tag && href && !disabled) return 'a';
    if (!tag && disabled) return 'div';
    return tag || 'button';
  }, [tag, href, disabled]);

  // https://zh-hans.react.dev/reference/react/createElement
  return React.createElement(
    renderTag,
    {
      ...buttonProps,
      href,
      type,
      ref: ref || setRefCurrent,
      disabled: disabled || loading,
      className: classNames(
        className,
        [
          `bor-button`,
          `bor-button--theme-${renderTheme}`,
          `bor-button--variant-${variant}`,
        ],
        {
          [`bor-button--shape-${shape}`]: shape !== 'rectangle',
          [`bor-button--ghost`]: ghost,
          [`bor-is-loading`]: loading,
          [`bor-is-disabled`]: disabled,
          [`bor-size-s`]: size === 'small',
          [`bor-size-l`]: size === 'large',
          [`bor-size-full-width`]: block,
        },
      ),
      onClick: !disabled && !loading ? onClick : undefined,
    },
    <>
      {iconNode}
      {renderChildren && <span className={`bor-button__text`}>{renderChildren}</span>}
      {suffix && <span className={`bor-button__suffix`}>{parseBNode(suffix)}</span>}
    </>,
  );
});

Button.displayName = 'Button';

export default Button;
