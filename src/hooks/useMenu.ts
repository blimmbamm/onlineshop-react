import { MouseEvent, useState } from "react";

export default function useMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function handleOpenMenu(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  return {
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
  };
}

export function useDialog(toggleCallback: () => void) {
  const [open, setOpen] = useState(false);

  function toggle() {
    toggleCallback();
    setOpen((prevOpen) => !prevOpen);
  }

  return {
    open,
    toggle,
  };
}
