'use client';

import { ReactNode } from 'react';

import {
  Dialog as DialogUi,
  DialogDescription,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { LoadingButton } from '../atoms/loading-button';
import { Button } from '../ui/button';

export interface DialogActions {
  open: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
}

interface Props extends DialogActions {
  children?: ReactNode;
  title: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isSubmitButtonDisabled?: boolean;
  isSubmitButtonLoading?: boolean;
  scrollable?: boolean;
  actionsSlot?: ReactNode;
}

const Dialog = ({
  children,
  open,
  onClose,
  onSubmit,
  title,
  description,
  cancelButtonText,
  confirmButtonText,
  isSubmitButtonDisabled,
  isSubmitButtonLoading,
  scrollable,
  actionsSlot,
}: Props) => {
  return (
    <DialogUi open={open} onOpenChange={onClose} defaultOpen={open} aria-hidden={!open}>
      <DialogContent
        aria-describedby={description}
        className={cn(scrollable ? 'overflow-y-auto max-h-[550px] sm:max-h-[700px]' : '', 'lg:max-w-xl ')}>
        <DialogHeader className="flex flex-col gap-2 p-1">
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <div className="overflow-x-auto p-1">{children}</div>
        <DialogFooter className="mt-4 gap-2 p-1">
          {actionsSlot}
          {onClose ? (
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {cancelButtonText ? cancelButtonText : 'Cancel'}
              </Button>
            </DialogClose>
          ) : null}
          {onSubmit ? (
            <LoadingButton disabled={isSubmitButtonDisabled} loading={isSubmitButtonLoading} onClick={onSubmit}>
              {confirmButtonText ? confirmButtonText : 'Confirm'}
            </LoadingButton>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </DialogUi>
  );
};

export default Dialog;
