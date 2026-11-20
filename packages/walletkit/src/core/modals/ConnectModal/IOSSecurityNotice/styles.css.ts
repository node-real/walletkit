import { style } from '@vanilla-extract/css';
import { cssVar } from '@/core/base/utils/css';
import { mobile } from '@/core/base/vanilla/index.css';
import { clsNoWalletButton } from '@/core/modals/ConnectModal/HomeView/GridLayout/styles.css';

export const clsHeader = style({
  alignItems: 'center',
  gap: 9,
  margin: 0,
  '@media': mobile({ fontSize: 22, lineHeight: '27px' }),
});

export const clsBody = style({
  display: 'grid',
  alignContent: 'start',
  alignItems: 'stretch',
  gap: 18,
  marginTop: 20,
  textAlign: 'left',
  color: cssVar('text'),
  overscrollBehavior: 'contain',
  scrollbarWidth: 'thin',
  '@media': mobile({ gap: 16 }),
});

export const clsRiskPanel = style({
  position: 'relative',
  zIndex: 0,
  padding: '14px 16px',
  border: `1px solid ${cssVar('border')}`,
  borderRadius: cssVar('common', 'radii'),
  background: cssVar('modalBackground'),
  minWidth: 0,
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
    background: cssVar('error'),
    opacity: 0.08,
    pointerEvents: 'none',
    zIndex: -1,
  },
});

export const clsIcon = style({ flexShrink: 0 });

export const clsShield = style([clsIcon, { color: cssVar('error') }]);

export const clsRiskCopy = style({
  fontSize: 15,
  lineHeight: 1.55,
  '@media': mobile({ fontSize: 14 }),
});

const focusVisible = { outline: `2px solid ${cssVar('primary')}`, outlineOffset: -2 };

export const clsLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  marginTop: 10,
  padding: '4px 0',
  color: cssVar('text'),
  fontSize: 14,
  fontWeight: 600,
  textDecoration: 'underline',
  textUnderlineOffset: 3,
  ':focus-visible': focusVisible,
});

export const clsCheckbox = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 11,
  fontSize: 14,
  lineHeight: 1.6,
  cursor: 'pointer',
});

export const clsCheckboxInput = style({
  flexShrink: 0,
  width: 20,
  height: 20,
  margin: '1px 0 0',
  accentColor: cssVar('primaryActive'),
  ':focus-visible': focusVisible,
});

export const clsActions = style({ marginTop: 0, gap: 12 });

const clsAction = style([
  clsNoWalletButton,
  {
    width: 'auto',
    ':focus-visible': focusVisible,
  },
]);

export const clsCancel = style([clsAction, { minWidth: 108 }]);

export const clsContinue = style([
  clsAction,
  {
    flex: 1,
    selectors: {
      '&:disabled, &:disabled:hover, &:disabled:active': {
        background: cssVar('noWalletButtonBackground'),
        borderColor: cssVar('noWalletButtonBorder'),
        color: cssVar('disabled'),
        cursor: 'not-allowed',
      },
    },
  },
]);
