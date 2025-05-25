'use client';

import { MoreVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/locales/client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export interface Action {
  key: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  tooltipTitle?: string;
}

interface Props {
  actions: Action[];
}

const ActionsTableMenu = ({ actions }: Props) => {
  const t = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 ml-auto">
          <span className="sr-only">{t('common.openMenu')}</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map(action => (
          <TooltipProvider key={action.key} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <DropdownMenuItem
                    disabled={action.disabled}
                    aria-disabled={action.disabled}
                    key={action.key}
                    onClick={action.onClick}>
                    {action.label}
                  </DropdownMenuItem>
                </span>
              </TooltipTrigger>
              {action.tooltipTitle && action.disabled ? (
                <TooltipContent side="left">{action.tooltipTitle ?? ''}</TooltipContent>
              ) : null}
            </Tooltip>
          </TooltipProvider>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsTableMenu;
