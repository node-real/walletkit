import { style } from '@vanilla-extract/css';
import { cssVar } from '@/core/base/utils/css';
import { hover } from '@/core/base/vanilla/index.css';

export const clsFooter = style({
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
});

export const clsContainer = style({
  alignItems: 'center',
});

export const clsOfficialButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  gap: 4,
  cursor: 'pointer',
});

export const clsCopyButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  height: 36,
  padding: '0 12px',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  cursor: 'pointer',
  border: '1px solid',
  borderRadius: cssVar('common', 'radii'),
  borderColor: cssVar('border'),
  background: 'transparent',
  color: cssVar('text'),
  '@media': hover({
    background: cssVar('border'),
    color: cssVar('text'),
  }),
});
