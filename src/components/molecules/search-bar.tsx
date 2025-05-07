'use client';

import { FocusEvent, useEffect, useState } from 'react';
import { useRef } from 'react';

import { useDebounce } from '@/hooks/use-debounce';

import { Input, InputProps } from '../ui/input';

interface Props extends InputProps {
  query: string;
  handleChangeQuery: (query: string) => void;
}

const SearchBar = ({ query, handleChangeQuery, ...other }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [tempValue, setTempValue] = useState('');
  const [autoFocus, setAutoFocus] = useState(false);

  const debouncedRequest = useDebounce(() => {
    handleChangeQuery(tempValue);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value);
    debouncedRequest();
  };

  const handleFocus = (): void => {
    setAutoFocus(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement, Element>): void => {
    /*
     There is a situation where an input goes from not disabled to disabled and DOM emits a blur
     event, with event as undefined. This means, that sometimes we'll receive an React Synthetic
     event and sometimes undefined because when DOM triggers the event, React is unaware of it,
     or it simply does not emit the event. To bypass this behaviour, we store a local variable
     that acts as autofocus.
     */

    if (event) {
      setAutoFocus(false);
    }
  };

  useEffect(() => {
    setTempValue(query);
  }, []);

  useEffect(() => {
    if (autoFocus && inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Input
      placeholder="Search"
      {...other}
      value={tempValue}
      ref={inputRef}
      onBlur={e => handleBlur(e)}
      onChange={handleChange}
      onFocus={handleFocus}
      className="max-w-md"
    />
  );
};

export default SearchBar;
