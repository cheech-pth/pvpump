'use client';

import {
  FireIcon,
} from '@heroicons/react/24/outline';
import { GiWhaleTail } from "react-icons/gi";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Active Trades', href: '/dashboard', icon: FireIcon },
  { name: 'Whale Wallets', href: '/dashboard/whales', icon: GiWhaleTail }
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md font-mars-red bg-dark-theme-300 p-3 text-sm font-medium hover:bg-dark-theme-400 hover:text-dark-theme-100 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-dark-theme-300 text-dark-theme-100': pathname == link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block font-mars-red">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
