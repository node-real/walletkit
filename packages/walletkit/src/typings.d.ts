interface Window {
  ethereum: any;
  trustWallet: any;
  trustwallet: any;
  tokenpocket: any;
  okexchain: any;
  bitkeep: any;
}

declare module '@metamask/jazzicon';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type SVGIconProps = React.SVGProps<SVGSVGElement>;
