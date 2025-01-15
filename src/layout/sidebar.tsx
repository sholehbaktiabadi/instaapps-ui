import {Listbox, ListboxItem} from "@nextui-org/react";

export default function SideBar() {
  const items = [
    {
      key: "profile",
      label: "Profile",
      route: '/profile'
    },
  ];

  return (
      <Listbox items={items} className="border-e-1 border-slate-500 h-full">
        {(item) => (
          <ListboxItem
          >
            {item.label}
          </ListboxItem>
        )}
      </Listbox>
  );
}
