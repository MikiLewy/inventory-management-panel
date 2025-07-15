'use client';

import { Calendar as CalendarIcon } from 'lucide-react';
import { ParserBuilder, SetValues, Values } from 'nuqs';
import * as React from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCurrentLocale, useI18n } from '@/locales/client';

import { formatDate } from '../atoms/format-date';

interface Props {
  value: Values<{ from: ParserBuilder<Date>; to: ParserBuilder<Date> }>;
  onChange: SetValues<{ from: ParserBuilder<Date>; to: ParserBuilder<Date> }>;
}

export function DateRangePicker({ value, onChange }: Props) {
  const locale = useCurrentLocale();
  const t = useI18n();

  const [date, setDate] = React.useState<DateRange>({
    from: value?.from ? new Date(value.from || new Date()) : undefined,
    to: value?.to ? new Date(value.to || new Date()) : undefined,
  });

  const handleSelect: SelectRangeEventHandler = (nextRange, selectedDay) => {
    setDate(range => {
      if (range?.from && range?.to) {
        return { from: selectedDay };
      }
      onChange({
        from: nextRange?.from ? new Date(nextRange?.from || new Date()) : undefined,
        to: nextRange?.to ? new Date(nextRange?.to || new Date()) : undefined,
      });
      return nextRange as DateRange;
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground min-w-max justify-start text-left font-normal">
          <CalendarIcon />
          {date?.from || date?.to ? (
            <>
              {date?.from ? formatDate(date?.from || new Date(), 'PPP', locale) : ''} -{' '}
              {date?.to ? formatDate(date?.to || new Date(), 'PPP', locale) : ''}
            </>
          ) : (
            <span>{t('statistics.selectDate')}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end" alignOffset={-8} sideOffset={10}>
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={date ? { from: date.from || undefined, to: date.to || undefined } : undefined}
          showOutsideDays={false}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
