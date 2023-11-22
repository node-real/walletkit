import { StyleRule } from '@vanilla-extract/css';
import { MOBILE_MEDIA } from '../constant';

export function hover(props: StyleRule) {
  return {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        ...props,
      },
    },
    screen: {
      ':active': {
        ...props,
      },
    },
  } as StyleRule['@media'];
}

export function mobile(props: StyleRule) {
  return {
    [MOBILE_MEDIA]: {
      ...props,
    },
  };
}
