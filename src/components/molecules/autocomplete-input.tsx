'use client';
import { Command as CommandPrimitive } from 'cmdk';
import Image from 'next/image';
import { useState, useRef, useEffect, useMemo, useLayoutEffect } from 'react';

import { useDebounce } from '@/hooks/use-debounce';

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverAnchor, PopoverContent } from '../ui/popover';
import { Skeleton } from '../ui/skeleton';

type Props<T extends { id: number; [key: string]: string | number }> = {
  name: string;
  onSelectedValueChange: (value: T) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: T[];
  label: string;
  required?: boolean;
  isLoading?: boolean;
  isDirty?: boolean;
  emptyMessage?: string;
  placeholder?: string;
  errorMessage?: string;
};

export function AutocompleteInput<T extends { id: number; [key: string]: string | number }>({
  name,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  label,
  isLoading,
  required,
  emptyMessage,
  placeholder,
  errorMessage,
  ...props
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number>();

  useEffect(() => {
    if (popoverWidth === undefined && inputRef.current) {
      setPopoverWidth(inputRef.current.offsetWidth);
    }
  }, [popoverWidth]);

  const onSelectItem = (inputValue: T) => {
    onSelectedValueChange(inputValue);
    setValue(inputValue.title as string);
    setOpen(false);
    setIsFocused(false);
  };

  const [value, setValue] = useState(() => searchValue || '');

  const debouncedRequest = useDebounce(() => {
    onSearchValueChange(value);
  });

  const handleSearchValueChange = (searchValue: string) => {
    setValue(searchValue);
    debouncedRequest();
  };

  const shouldOpenPopover = useMemo(
    () => searchValue.length > 0 && !isLoading && items.length > 0,
    [searchValue, isLoading, items],
  );

  useEffect(() => {
    if (shouldOpenPopover && isFocused) {
      setOpen(true);
    }
  }, [shouldOpenPopover, isFocused]);

  useLayoutEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  const isInvalid = useMemo(() => value?.length <= 0 && isTouched, [value, isTouched]);

  return (
    <div ref={inputRef} className="flex flex-col gap-2  w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <Label className={'data-[error=true]:text-destructive w-fit'} data-error={isInvalid}>
          {label} {required ? '*' : ''}
        </Label>
        <Command className="dark:bg-none" shouldFilter={false}>
          <div className="flex flex-col gap-2 bg-none">
            <PopoverAnchor asChild>
              <Input
                {...props}
                name={name}
                aria-label={label}
                value={value}
                autoFocus={false}
                aria-invalid={isInvalid}
                onChange={e => handleSearchValueChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  setIsTouched(true);
                }}
                placeholder={placeholder}
              />
            </PopoverAnchor>
            {isInvalid ? (
              <p data-slot="form-message" className={'text-destructive text-sm'}>
                {errorMessage}
              </p>
            ) : null}
          </div>
          <PopoverContent
            asChild
            onOpenAutoFocus={e => e.preventDefault()}
            side="bottom"
            align="start"
            style={popoverWidth ? { width: popoverWidth } : undefined}
            className="min-w-[200px] p-0">
            <CommandList>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {open ? (
                <CommandGroup>
                  {items.map(option => (
                    <CommandItem
                      key={option.id}
                      value={option.id.toString()}
                      onMouseDown={e => e.preventDefault()}
                      onSelect={() => onSelectItem(option)}>
                      {option.imageUrl && (
                        <Image
                          src={option.imageUrl as string}
                          alt={option.title as string}
                          width={120}
                          height={120}
                          className="mr-2 rounded-md object-contain object-center min-w-[45px] min-h-[45px] max-w-[45px] max-h-[45px]"
                        />
                      )}
                      {option.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading ? <CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty> : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
