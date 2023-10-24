import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
}

export const Portal = (props: PortalProps) => {
  const { children } = props;

  const portal = useRef<HTMLDivElement>();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const host = document.body;

    portal.current = document.createElement('div');
    portal.current.setAttribute('class', 'wk-portal');

    host.appendChild(portal.current);
    forceUpdate({});

    const portalNode = portal.current;
    return () => {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, []);

  return portal.current ? createPortal(children, portal.current) : null;
};

Portal.displayName = 'Portal';
