import * as icon from '@totejs/icons';
import * as uikit from '@totejs/uikit';
import * as walletkit from '@totejs/walletkit';
import React from 'react';
import * as wagmi from 'wagmi';

import { chains } from '../../WalletKit/chains';

const scope = {
  React,
  chains,
  ...icon,
  ...uikit,
  ...React,
  ...walletkit,
  ...wagmi,
};

export default scope;
