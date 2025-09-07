'use client';

import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { logout } from '@/features/auth/api/actions/auth';
import { executeServerAction } from '@/features/auth/utils/execute-server-action';
import { useCurrentLocale, useI18n } from '@/locales/client';

import { Separator } from '../ui/separator';
import { SidebarFooter as SidebarFooterUi, SidebarMenuItem } from '../ui/sidebar';
import { SidebarMenuButton } from '../ui/sidebar';

const SidebarFooter = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();

  return (
    <SidebarFooterUi className="mt-auto list-none">
      <Separator />
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={t('routes.settings')} isActive={false}>
          <Link href={`/${currentLocale}/settings`} prefetch>
            <Settings />
            <span>{t('routes.settings')}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="cursor-pointer"
          asChild
          onClick={() => executeServerAction(logout)}
          tooltip={t('routes.logout')}
          isActive={false}>
          <div>
            <LogOut />
            <span>{t('routes.logout')}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarFooterUi>
  );
};

export default SidebarFooter;
