import { style } from '@vanilla-extract/css';

export const navbar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '16px 24px 0',
  width: '100%',
});
