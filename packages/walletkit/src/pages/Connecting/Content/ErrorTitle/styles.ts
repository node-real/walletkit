import { cssVar, x } from '../../../../utils/css';

export const styles = {
  errorTitle: x({
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '22px',
    alignItems: 'center',
    justifyContent: 'center',
    color: cssVar('error'),
    gap: 3,
  }),
};
