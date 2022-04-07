export interface NavigationItem {
  name: string;
  icon?: string;
  url?: string;
  title: string;
  dataUrl?: string;
  isProtected?: boolean;
  visibleWhenloggedIn?: boolean;
  items?: NavigationItem[];
}
