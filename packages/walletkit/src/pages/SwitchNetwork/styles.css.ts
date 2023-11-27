import { mobile } from '@/base/vanilla/index.css';
import { cssVar } from '@/index';
import { style } from '@vanilla-extract/css';

export const clsNoNavHeader = style({
  '@media': mobile({
    marginTop: -8,
  }),
});

export const clsBody = style({
  '@media': mobile({
    marginTop: 24,
  }),
});

export const clsFooter = style({
  marginTop: 0,
  '@media': mobile({
    marginBottom: -16,
  }),
});

export const clsDescription = style({
  lineHeight: '19px',
  fontSize: 16,
  textAlign: 'center',
  fontWeight: 400,
  color: cssVar('textSecondary'),
  marginBottom: 24,
});

export const clsChains = style({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  lineHeight: 1.5,
  width: '100%',
  maxHeight: 320,
});

export const clsOrSeparator = style({
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '19px',
  textAlign: 'center',
  margin: '16px 0',
  color: cssVar('disabled'),
});
