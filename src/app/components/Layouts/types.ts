export interface LayoutsTopBarProps {
  toogleSidebar?: () => void;
  openAccountMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sideBarVisible?: boolean;
  dontShowSnackMenu?: boolean;
}

export interface AccountMenuProps {
  onLogout: () => void;
  closeAccountMenu: () => void;
  accountMenuAnchor: null | HTMLElement;
  fullName: String | undefined;
}
