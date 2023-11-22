import { MOBILE_MEDIA } from '@/base/constant';
import { cssVar } from '@/base/utils/css';
import { style } from '@vanilla-extract/css';

export const clsFooter = style({
  marginTop: 0,
  '@media': {
    [MOBILE_MEDIA]: {
      marginBottom: -16,
    },
  },
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
