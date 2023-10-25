import { style } from '@vanilla-extract/css';
import { cssVar } from '../../../utils/css';

export const divider = style({
  display: 'flex',
  position: 'relative',
  margin: '24px auto',
  alignItems: 'center',
  justifyContent: 'center',
});

export const dividerLine = style({
  background: cssVar('border'),
  height: 1,
  position: 'absolute',
  left: 0,
  width: '100%',
  top: '50%',
  transform: 'translateY(-50%)',
});

export const dividerText = style({
  position: 'relative',
  zIndex: 1,
  padding: '0 16px',
  background: cssVar('modalBackground'),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: cssVar('textSecondary'),
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '22px',
});
