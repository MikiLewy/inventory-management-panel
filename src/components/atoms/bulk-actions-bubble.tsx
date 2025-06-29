'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { useI18n } from '@/locales/client';

import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

export interface BulkAction {
  key: string;
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  tooltip?: string;
  destructive?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectAll: () => void;
  isAllItemsSelected: boolean;
  actions: BulkAction[];
  allItemsCount: number;
  selectedItemsCount: number;
}

const BULK_ACTIONS_BUBBLE_WIDTH_WITHOUT_PADDING = 649;

const BulkActionsBubble = ({
  isOpen,
  onClose,
  actions,
  selectedItemsCount,
  onSelectAll,
  allItemsCount,
  isAllItemsSelected,
}: Props) => {
  const t = useI18n();

  const actionsContainerRef = useRef<HTMLDivElement | null>(null);
  const staticContainerRef = useRef<HTMLDivElement | null>(null);

  const [shouldDisplayScrollbar, setShouldDisplayScrollbar] = useState(false);

  const calculateIfScrollbarShouldBeDisplayed = useCallback(() => {
    if (!staticContainerRef?.current || !actionsContainerRef?.current) return false;

    const actionsContainerAvailableWidth =
      BULK_ACTIONS_BUBBLE_WIDTH_WITHOUT_PADDING - staticContainerRef?.current?.clientWidth;

    if (actionsContainerRef?.current?.clientWidth > actionsContainerAvailableWidth) {
      return true;
    }

    return false;
  }, []);

  useEffect(() => {
    if (actions.length > 0) {
      setShouldDisplayScrollbar(calculateIfScrollbarShouldBeDisplayed());
    }
  }, [actions, calculateIfScrollbarShouldBeDisplayed]);

  const renderActions = () => (
    <div className="flex flex-1 flex-row items-center">
      <div className="flex flex-1 flex-row items-center justify-end gap-4" ref={actionsContainerRef}>
        {actions?.map(action => (
          <Button
            key={action.key}
            variant="outline"
            size="default"
            onClick={action.onClick}
            disabled={action.disabled}
            className={cn(
              'text-sm font-semibold leading-6  min-w-max hover:text-gray-500 transition-colors duration-150 cursor-pointer ',
              action.destructive &&
                'text-[#D60021] dark:text-[#FFADA7] hover:text-red-700 bg-[#FFF2F0] dark:bg-[#360003] border-[#FFD3CE] dark:border-[#640009] hover:bg-red-500/10 dark:hover:bg-[#360003]/70 ',
            )}>
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center ">
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key={'bulk-actions-bubble'}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring' }}
            className={cn(
              'py-3 fixed z-50 bottom-15 w-full box-border border dark:shadow-sm shadow-xs max-w-[690px] flex items-center justify-between bg-popover text-popover-foreground rounded-2xl',
              `px-5`,
            )}>
            <div className="flex items-center gap-3 w-full  pr-6">
              <div className="flex items-center gap-1" ref={staticContainerRef}>
                <X
                  onClick={onClose}
                  size={18}
                  className="text-popover-foreground hover:text-gray-500 transition-colors duration-150 cursor-pointer"
                />
                <p className="text-popover-foreground text-sm font-normal leading-6 min-w-max">
                  {t('common.bulkActionsBubble.selected', {
                    count: selectedItemsCount,
                  })}
                </p>
              </div>
              {!isAllItemsSelected ? (
                <>
                  <p className="text-gray-400 text-sm font-normal leading-6 min-w-max h-full">|</p>
                  <p
                    className="text-sm font-normal leading-6 min-w-max text-blue-400 cursor-pointer hover:text-blue-500 transition-colors duration-150"
                    onClick={onSelectAll}>
                    {t('common.bulkActionsBubble.selectAll', {
                      count: allItemsCount,
                    })}
                  </p>
                </>
              ) : null}
            </div>
            {shouldDisplayScrollbar ? (
              <ScrollArea className="flex flex-1 flex-row overflow-y-auto p-0">{renderActions()}</ScrollArea>
            ) : (
              renderActions()
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default BulkActionsBubble;
