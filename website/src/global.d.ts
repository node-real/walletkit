interface MenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  element?: any;
  redirect?: string;
  children?: MenuItem[];
}
