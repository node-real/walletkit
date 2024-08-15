import { ComplexStyleRule } from '@vanilla-extract/css';
import { MOBILE_MEDIA } from '../constant';

export function hover(props: ComplexStyleRule): any {
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
  };
}

export function mobile(props: ComplexStyleRule): any {
  return {
    [MOBILE_MEDIA]: {
      ...props,
    },
  };
}
