---
'@totejs/walletkit': patch
---

Fixed `WalletConnect` automatic connection issue in the follow scenario: connect the WalletConnect -> close browser -> reopen browser -> disconnect -> select WalletConnect, will automatically connect.
