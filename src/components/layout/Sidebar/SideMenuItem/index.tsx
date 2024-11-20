type SideMenuItemProps = {
  menuIcon: string; // Icon name to display (e.g., material icon name)
  menuTitle: string; // Title text for the menu item
};

function SideMenuItem({ menuIcon, menuTitle }: SideMenuItemProps) {
  return (
    <div className="flex gap-2 items-center">
      {/* Render menu icon with specified name */}
      <span className="material-symbols-outlined text-base">{menuIcon}</span>

      {/* Render menu item title */}
      <p className="text-default text-sm">{menuTitle}</p>
    </div>
  );
}

export default SideMenuItem;
