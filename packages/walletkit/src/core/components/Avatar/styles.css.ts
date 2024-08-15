import { style } from '@vanilla-extract/css';

export const clsAvatar = style({
  width: 24,
  height: 24,
  borderRadius: '100%',
  overflow: 'hidden',
});

export const clsAvatarImg = style({
  width: '100%',
  height: '100%',
});

export const clsAvatarDefault = style({
  width: '100%',
  height: '100%',
  background: `linear-gradient(180deg,#007aff 0%, #5856d6 100%)`,
});
