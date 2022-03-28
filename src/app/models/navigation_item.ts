export interface NavigationItem {
  name: string;
  icon?: string;
  url?: string;
  dataUrl?: string;
  isProtected?: boolean;
  isHiddenWhenLoggedIn?: boolean;
  items?: NavigationItem[];
}
