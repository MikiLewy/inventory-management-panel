'use client';

import { format, subDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ParserBuilder, SetValues, Values } from 'nuqs';
import * as React from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Props {
  value: Values<{ from: ParserBuilder<Date>; to: ParserBuilder<Date> }>;
  onChange: SetValues<{ from: ParserBuilder<Date>; to: ParserBuilder<Date> }>;
}

export function DateRangePicker({ value, onChange }: Props) {
  const [date, setDate] = React.useState<DateRange>({
    from: value.from ? new Date(value.from || new Date()) : subDays(new Date(), 30),
    to: value.to ? new Date(value.to || new Date()) : new Date(),
  });

  const handleSelect: SelectRangeEventHandler = (nextRange, selectedDay) => {
    setDate(range => {
      if (range?.from && range?.to) {
        return { from: selectedDay };
      }
      onChange({
        from: nextRange?.from ? new Date(nextRange.from || new Date()) : undefined,
        to: nextRange?.to ? new Date(nextRange.to || new Date()) : undefined,
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
          {date ? (
            <>
              {date.from ? format(date.from, 'PPP') : ''} - {date.to ? format(date.to, 'PPP') : ''}
            </>
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end" alignOffset={-8} sideOffset={10}>
        <Calendar mode="range" numberOfMonths={2} selected={date} showOutsideDays={false} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
