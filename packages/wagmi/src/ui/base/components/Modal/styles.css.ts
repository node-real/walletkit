import { style } from '@vanilla-extract/css';
import { cssVar } from '../../utils/css';
import { mobile } from '../../vanilla/index.css';

export const clsModal = style({
  zIndex: cssVar('modal', 'zIndices'),
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: cssVar('text'),
  margin: 0,
  padding: 0,
  transition: 'all 0.3s',
  boxSizing: 'border-box',
  '@media': mobile({
    alignItems: 'flex-end',
  }),
});

export const clsModalOverlay = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: cssVar('modalOverlay'),
});
