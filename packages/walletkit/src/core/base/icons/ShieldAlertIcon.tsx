export const ShieldAlertIcon = (props: SVGIconProps) => {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="m12 2 8 3v6c0 5-4.6 8.8-8 11-3.4-2.2-8-6-8-11V5l8-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12 7v6m0 3v.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
