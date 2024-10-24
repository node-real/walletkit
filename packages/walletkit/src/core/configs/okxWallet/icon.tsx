export const OkxWalletTransparentIcon = (props: SVGIconProps) => {
  return <OkxWalletIcon width={40} height={40} {...props} />;
};

export const OkxWalletIcon = (props: SVGIconProps) => {
  return (
    <svg width="40" height="40" viewBox="0 0 68 68" fill="none" {...props}>
      <path
        d="M0 18.1333C0 8.11857 8.11857 0 18.1333 0H49.8667C59.8814 0 68 8.11857 68 18.1333V49.8667C68 59.8814 59.8814 68 49.8667 68H18.1333C8.11857 68 0 59.8814 0 49.8667V18.1333Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2812 13.2812H27.0938V27.0938H13.2812V13.2812ZM40.9062 27.0938H27.0938V40.9062H13.2812V54.7188H27.0938V40.9062H40.9062V54.7188H54.7188V40.9062H40.9062V27.0938ZM40.9062 27.0938V13.2812H54.7188V27.0938H40.9062Z"
        fill="white"
      />
    </svg>
  );
};
