import { cssVar, x } from '../../../../utils/css';

export const styles = {
  description: x({
    display: 'flex',
    maxWidth: 340,
    marginTop: 8,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: '22px',
    fontWeight: 400,
    color: cssVar('textSecondary'),
  }),
};
