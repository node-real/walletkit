import { FetchBalanceResult } from 'wagmi/actions';

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export function truncateAddress(address?: string, separator = '...') {
  if (!address) return '';
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}${separator}${match[2]}`;
}

export function truncateENSName(ensName = '', maxLength = 20) {
  if (ensName.length > maxLength) {
    return ensName.replace('.eth', '').slice(0, maxLength) + '...';
  } else {
    return ensName;
  }
}

export function toPrecision(number: number, precision = 1) {
  return number
    .toString()
    .replace(new RegExp(`(.+\\.\\d{${precision}})\\d+`), '$1')
    .replace(/(\.[1-9]*)0+$/, '$1')
    .replace(/\.$/, '');
}

export function formatBalance(balance: FetchBalanceResult): string {
  let number = parseFloat(balance.formatted);

  let result = String(number);
  if (number < 1) {
    result = toPrecision(number, 4);
  } else if (number < 10 ** 2) {
    result = toPrecision(number, 4);
  } else if (number < 10 ** 4) {
    result = new Intl.NumberFormat().format(parseFloat(toPrecision(number, 4)));
  } else {
    const decimalsDivisor = 10 ** 1;
    const units = ['k', 'm', 'b', 't'];

    for (let i = units.length - 1; i >= 0; i--) {
      const size = 10 ** ((i + 1) * 3);

      if (size <= number) {
        number = (number * decimalsDivisor) / size / decimalsDivisor;

        result = toPrecision(number, 4) + units[i];

        break;
      }
    }
  }

  return `${result} ${balance.symbol}`;
}
