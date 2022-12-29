import { addDays, chooseRandomly, colors, formatDate, range } from '~/utils';

const baseDate = new Date('2022-01-01');

// TODO could we make this range function infer the type, so we don't get any here?
export const items: Item[] = range(
  40,
  (index: number): Item => ({
    date: formatDate(addDays(baseDate, index)),
    color: chooseRandomly(Object.values(colors)),
  }),
);

export const dataSample = {
  start: '2022-01-01',
  end: '2022-01-03',
  color: 'red',
};

// TODO could we use inferred items type here?
//!Done
export interface Item {
  date: string;
  // TODO could we use stronger color type here?
  //!Done
  color: colors;
}

export interface Range {
  start: string;
  end: string;
  // TODO could we use stronger color type here?
  //!Done
  color: colors;
}

// TODO could we type this stronger, so autocomplete by key works?
//! Done
export enum colorToClassName {
  red = 'bg-red-300 text-red-900',
  green = 'bg-green-300 text-green-900',
  blue = 'bg-blue-300 text-blue-900',
}
