import { getLoggedInUser } from '@/server/utils/get-logged-in-user';

import LanguageSwitcher from '../atoms/language-switcher';
import { ThemeSwitcher } from '../atoms/theme-switcher';
import UserAvatar from '../atoms/user-avatar';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';

const Navbar = async () => {
  const user = await getLoggedInUser();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <nav className="flex grow h-[50px] items-center gap-3 justify-between ">
          <SidebarTrigger className="ml-2" />
          <div className="flex items-center gap-3 px-6">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <UserAvatar email={user?.email || ''} />
          </div>
        </nav>
      </header>
      <Separator />
    </>
  );
};

export default Navbar;
