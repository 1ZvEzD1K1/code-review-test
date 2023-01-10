import { addDays, chooseRandomly, formatDate, range } from '~/utils';

const baseDate = new Date('2022-01-01');

// TODO could we have more strict type here?
export type Colors = 'red' | 'green' | 'blue';
const colors: Colors[] = ['red', 'green', 'blue'];


export const dataSample = {
  start: '2022-01-01',
  end: '2022-01-03',
  color: 'red',
};


export interface Range {
  start: string;
  end: string;
  // TODO could we use stronger color type here?
  color: Colors;
}

// TODO could we use inferred items type here?
export interface Item extends Range {
  date: string;
  // TODO could we use stronger color type here?
  color: Colors;
}


// TODO could we type this stronger, so autocomplete by key works?
export const colorToClassName: Record<Colors, string> = {
  red: 'bg-red-300 text-red-900',
  green: 'bg-green-300 text-green-900',
  blue: 'bg-blue-300 text-blue-900',
};

// TODO could we make this range function infer the type, so we don't get any here?
export const itemsManufacture: Item[] = range(40, (index): Range => ({
  start: formatDate(addDays(baseDate, index)),
  end: formatDate(addDays(baseDate, index)),
  color: chooseRandomly(colors),
}));
