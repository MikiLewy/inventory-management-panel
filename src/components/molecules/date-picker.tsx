'use client';

import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DayPickerProps } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { dateFormats } from '@/constants/date-formats';
import { useI18n } from '@/locales/client';

import { formatDate } from '../atoms/format-date';

function formatDateToInput(date: Date | undefined) {
  if (!date) {
    return '';
  }
  const formattedValue = formatDate(date, `${dateFormats.month} ${dateFormats.day} ${dateFormats.year}`)
    .replace(/[^\d]/g, '')
    .slice(0, 8);

  if (formattedValue.length >= 4) {
    const day = formattedValue.slice(0, 2);
    const month = formattedValue.slice(2, 4);
    const year = formattedValue.slice(4, 8);
    const result = day + (month ? '/' + month : '') + (year ? '/' + year : '');

    return result;
  }
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

interface Props extends Omit<DayPickerProps, 'mode'> {
  value: Date | undefined;
  label: string;
  onChange: (date: Date | undefined) => void;
}

export function DatePicker({ value, label, onChange }: Props) {
  const t = useI18n();

  const [open, setOpen] = React.useState(false);

  const [tempValue, setTempValue] = React.useState(formatDateToInput(value));

  const [month, setMonth] = React.useState<Date | undefined>(value);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={tempValue}
          placeholder="MM/DD/YYYY"
          className="bg-background pr-10"
          onChange={e => {
            const inputValue = e.target.value;

            const digitsOnly = inputValue.replace(/\D/g, '');

            let formattedValue = '';
            if (digitsOnly.length >= 1) {
              formattedValue = digitsOnly.slice(0, 2);
              if (digitsOnly.length >= 3) {
                formattedValue += '/' + digitsOnly.slice(2, 4);
                if (digitsOnly.length >= 5) {
                  formattedValue += '/' + digitsOnly.slice(4, 8);
                }
              }
            }

            setTempValue(formattedValue);

            // Try to parse the date
            if (formattedValue.length === 10) {
              const date = new Date(formattedValue);
              if (isValidDate(date)) {
                onChange?.(date);
                setMonth(date);
              }
            }
          }}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }

            if (
              [
                'Backspace',
                'Delete',
                'Tab',
                'Escape',
                'Enter',
                'ArrowLeft',
                'ArrowRight',
                'ArrowUp',
                'ArrowDown',
              ].includes(e.key)
            ) {
              return;
            }

            if (!/[\d/]/.test(e.key)) {
              e.preventDefault();
            }

            const currentValue = e.currentTarget.value;
            const cursorPosition = e.currentTarget.selectionStart || 0;
            if (e.key === '/' && currentValue[cursorPosition - 1] === '/') {
              e.preventDefault();
            }
          }}
          onPaste={e => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData('text');
            const filteredText = pastedText.replace(/[^\d/]/g, '');

            const currentValue = e.currentTarget.value;
            const cursorPosition = e.currentTarget.selectionStart || 0;
            const newValue =
              currentValue.slice(0, cursorPosition) +
              filteredText +
              currentValue.slice(e.currentTarget.selectionEnd || cursorPosition);

            const formattedValue = newValue.replace(/[^\d]/g, '').slice(0, 8);
            if (formattedValue.length >= 4) {
              const day = formattedValue.slice(0, 2);
              const month = formattedValue.slice(2, 4);
              const year = formattedValue.slice(4, 8);
              const result = day + (month ? '/' + month : '') + (year ? '/' + year : '');
              setTempValue(result);
            } else {
              setTempValue(formattedValue);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button id="date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">{t('common.selectDate')}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={date => {
                onChange?.(date);
                setTempValue(formatDateToInput(date));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
