import { addDays, chooseRandomly, formatDate, range } from '~/utils';

const baseDate = new Date('2022-01-01');

// TODO could we have more strict type here?
// const colors = ['red', 'green', 'blue'];
// --------------
// DONE: use enum
export enum colors {
  red = 'red',
  green = 'green',
  blue = 'blue',
};

// TODO could we make this range function infer the type, so we don't get any here?
// --------------
// DONE: use Object.values(enum)
export const items: Item[] = range(40, (index) => ({
  date: formatDate(addDays(baseDate, index)),
  color: chooseRandomly(Object.values(colors)),
}));

export const dataSample = {
  start: '2022-01-01',
  end: '2022-01-03',
  color: 'red',
};

// TODO could we use inferred items type here?
// --------------
// DONE: use enum instead of type string
export interface Item {
  date: string;
  // TODO could we use stronger color type here?
  color: colors;
}

export interface Range {
  start: string;
  end: string;
  // TODO could we use stronger color type here?
  // --------------
  // DONE: use enum instead of type string
  color: colors;

}


// TODO could we type this stronger, so autocomplete by key works?
// export const colorToClassName: Record<string, string> = {
// --------------
// DONE: use enum instead of var
export enum colorToClassName {
  red = 'bg-red-300 text-red-900',
  green = 'bg-green-300 text-green-900',
  blue = 'bg-blue-300 text-blue-900',
};

