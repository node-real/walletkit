import { cssVar } from '@/core/base/utils/css';
import { mobile } from '@/core/base/vanilla/index.css';
import { style } from '@vanilla-extract/css';

export const clsFooter = style({
  marginTop: 0,
  '@media': mobile({
    marginBottom: -16,
  }),
});

export const clsAvatar = style({
  width: 100,
  height: 100,
  marginBottom: 24,
});

export const clsInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginBottom: 24,
});

export const clsBalance = style({
  color: cssVar('textSecondary'),
  fontSize: 16,
  lineHeight: '19px',
  fontWeight: 400,
});
