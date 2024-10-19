
import NavLinks from '@/app/ui/dashboard/nav-links';
import { ConnectionManager } from '@/app/components/ConnectionManager';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-dark-theme-100">
      <div
        className="mb-2 flex items-end justify-center rounded-md bg-dark-theme-300 p-2 hover:bg-dark-theme-400"
      >
        <div className="w-32 text-dark-theme-100 font-semibold md:w-40">
        <ConnectionManager />
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}
