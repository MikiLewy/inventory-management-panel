'use client';

import { Box } from 'lucide-react';
import * as React from 'react';

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { SidebarItems } from '../molecules/sidebar-items';
import { Separator } from '../ui/separator';

export function Sidebar({ ...props }: React.ComponentProps<typeof SidebarComponent>) {
  return (
    <SidebarComponent collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Box size={16} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">STOQIO</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator />
      </SidebarHeader>
      <SidebarGroup>
        <SidebarContent>
          <SidebarItems />
        </SidebarContent>
      </SidebarGroup>
    </SidebarComponent>
  );
}
