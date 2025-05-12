'use client';

import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DayPickerSingleProps, SelectSingleEventHandler } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { dateFormats } from '@/constants/date-formats';
import { cn } from '@/lib/utils';

import { formatDate } from '../atoms/format-date';

interface Props extends Omit<DayPickerSingleProps, 'mode'> {
  value: Date;
  onChange: SelectSingleEventHandler;
  dateFormat?: string;
}

export function DatePicker({ value, onChange, dateFormat, ...other }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}>
          <CalendarIcon />
          {value ? (
            formatDate(
              value,
              dateFormat ? dateFormat : `${dateFormats.monthLong} ${dateFormats.day}, ${dateFormats.year}`,
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 pointer-events-auto">
        <Calendar
          {...other}
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          disabled={{ after: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
}
