import { addDays, chooseRandomly, formatDate, range } from '~/utils';

const baseDate = new Date('2022-01-01');

export enum EColors {
  red = 'red',
  green = 'green',
  blue = 'blue',
}

const colors: EColors[] = Object.values(EColors)

export const items: Item[] = range<Item>(40, (index: number) => ({
  date: formatDate(addDays(baseDate, index)),
  color: chooseRandomly<EColors>(colors),
}));

export interface Item {
  date: string;
  color: EColors;
}

export interface Range {
  start: string;
  end: string;
  color: EColors;
}

export const dataSample: Range = {
  start: '2022-01-01',
  end: '2022-01-03',
  color: EColors.red,
};

export const colorToClassName: Record<EColors, string> = {
  [EColors.red]: 'bg-red-300 text-red-900',
  [EColors.green]: 'bg-green-300 text-green-900',
  [EColors.blue]: 'bg-blue-300 text-blue-900',
};
