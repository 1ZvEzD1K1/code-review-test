import { useRef } from 'react';

export const useRenderHighlight = (className: string) => {
  // TODO fix any
  const ref = useRef<any>(null);

  if (ref.current) {
    ref.current.classList.add(className);
    setTimeout(() => {
      if (ref.current) {
        ref.current.classList.remove(className);
      }
    }, 200);
  }

  return ref;
};

// TODO fix any
export const range = <T>(n: number, fn: (n: number) => T) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(fn(i + 1));
  }
  return result;
};

// TODO fix any
export const chooseRandomly = (items: any[]) => items[Math.floor(Math.random() * items.length)];

export const addDays = (date: Date, amount: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amount);
  return newDate;
};

export const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const capitalize = (string: string) => string
  .split(' ')
  .map(word => word[0].toLocaleUpperCase() + word.slice(1).toLocaleLowerCase())
  .join(' ');

export const makeArrayFromEnum = (enumObj: { [key: string | number]: any }) => Object.values(enumObj).filter(value => isNaN(Number(value)));
export const replacePunctuation = (string: string) => string.replace(/[-.,_:;]/g, ' ');
