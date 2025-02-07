import { Box } from '@/core/base/components/Box';

import { cx } from '@/core/base/utils/css';
import { clsContent, clsReloadBtn } from './style.css';
import { Link } from '@/core/base/components/Link';

export function Reload() {
  return (
    <Box className={cx('wk-reload-wrapper', clsContent)}>
      No response on wallet?
      <Box>
        <Link
          className={cx('wk-reload', clsReloadBtn)}
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload
        </Link>
      </Box>
    </Box>
  );
}
