import React from 'react';
import { RouterActions } from 'src/features/router/interface';
import { useActions } from 'typeless';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: any;
  //
}

export const Link = ({ href, onClick, children, ...others }: LinkProps) => {
  const { push } = useActions(RouterActions);
  return (
    <a
      {...others}
      onClick={e => {
        e.preventDefault();
        if (href) {
          push(href);
        }
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}
    </a>
  );
};
