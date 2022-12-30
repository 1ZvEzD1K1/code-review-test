import { addDays, chooseRandomly, formatDate, range } from '~/utils';

const baseDate = new Date('2022-01-01');

// TODO could we have more strict type here?

export enum Colors {
  red = 'red',
  green = "green",
  blue = "blue"
}

const colors = Object.values(Colors).filter(value => isNaN(Number(value)));

// TODO could we make this range function infer the type, so we don't get any here?
export const items: Item[] = range(40, (index) => ({
  date: formatDate(addDays(baseDate, index)),
  color: chooseRandomly(colors),
} as Item));

export const dataSample = {
  start: '2022-01-01',
  end: '2022-01-03',
  color: 'red',
};


// TODO could we use inferred items type here?
export interface Item {
  date: string;
  // TODO could we use stronger color type here?
  //* Done?
  color: Colors;
}

export interface Range {
  start: string;
  end: string;
  // TODO could we use stronger color type here?
  //* Done?
  color: Colors;
}


// TODO could we type this stronger, so autocomplete by key works?
export const colorToClassName: Record<Colors, string> = {
  red: 'bg-red-300 text-red-900',
  green: 'bg-green-300 text-green-900',
  blue: 'bg-blue-300 text-blue-900',
};

//? It's more complex for me to keep it here
export const transformItemsToRanges = (items: Item[]) => {
  // TODO implement
  //* Done?
  return items.reduce((acc, { date, color }) => {
    const initialRange: Range = {
      start: date,
      end: date,
      color: color,
    };
    //? prevent first element error
    if (!acc.length) {
      return [initialRange];
    }

    const lastAccItem = acc[acc.length - 1];

    if (lastAccItem.color === color) {
      lastAccItem['end'] = date;
      return acc;
    }

    return [...acc, initialRange];
  }, [] as Range[]);
};
