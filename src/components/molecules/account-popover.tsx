'use client';

import { LogOut } from 'lucide-react';
import { Fragment } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/features/auth/api/actions/auth';
import { useUser } from '@/features/auth/providers/auth-providers';
import { useI18n } from '@/locales/client';

import UserAvatar from '../atoms/user-avatar';

const AccountPopover = () => {
  const t = useI18n();

  const user = useUser();

  const dropdownItems = [
    {
      key: 'logout',
      label: t('common.logout'),
      icon: LogOut,
      onClick: () => logout(),
    },
  ];

  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar email={user?.email || ''} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {dropdownItems?.map(({ key, icon: Icon, label, onClick }) => (
            <Fragment key={key}>
              <DropdownMenuItem onClick={onClick} className="cursor-pointer mt-1">
                <Icon /> {label}
              </DropdownMenuItem>
            </Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccountPopover;
