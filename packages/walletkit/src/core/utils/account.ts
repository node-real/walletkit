export function truncateAddress(address?: string) {
  if (!address) return '';
  let addr = address?.replace(/^0x/, '');

  const head = addr.substring(0, 4);
  const tail = addr.substring(addr.length - 4, addr.length);

  if (addr.length > head.length + tail.length) {
    addr = `${head}...${tail}`;
  }

  return address.startsWith('0x') ? `0x${addr}` : addr;
}

export function truncateName(name = '', maxLength = 20) {
  if (name.length > maxLength) {
    return name.slice(0, maxLength) + '...';
  } else {
    return name;
  }
}

export function toPrecision(number: number, precision = 1) {
  return number
    .toString()
    .replace(new RegExp(`(.+\\.\\d{${precision}})\\d+`), '$1')
    .replace(/(\.[1-9]*)0+$/, '$1')
    .replace(/\.$/, '');
}

export function formatBalance(balance: any): string {
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
