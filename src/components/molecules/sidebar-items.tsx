'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { routes } from '@/constants/routes';
import { useCurrentLocale, useI18n } from '@/locales/client';

export function SidebarItems() {
  const t = useI18n();
  const locale = useCurrentLocale();

  const pathname = usePathname();

  return (
    <SidebarMenu>
      {routes.map(item => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild tooltip={t(item.title)} isActive={pathname.includes(item.href)}>
            <Link href={`/${locale}${item.href}`} prefetch>
              <item.icon />
              <span>{t(item.title)}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
