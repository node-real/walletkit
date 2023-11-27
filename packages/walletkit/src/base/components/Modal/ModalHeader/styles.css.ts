import { mobile } from '@/base/vanilla/index.css';
import { style } from '@vanilla-extract/css';

export const clsModalHeader = style({
  fontWeight: 600,
  display: 'flex',
  fontSize: 24,
  lineHeight: '29px',
  justifyContent: 'center',
  textAlign: 'center',
  '@media': mobile({
    fontSize: 18,
    lineHeight: '22px',
  }),
});
