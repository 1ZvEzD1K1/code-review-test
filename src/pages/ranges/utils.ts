import { Colors } from '~/types/Colors';
import { addDays, chooseRandomly, formatDate, range } from '~/utils';

const baseDate = new Date('2022-01-01');

export const items = range(40, (index) => ({
  date: formatDate(addDays(baseDate, index)),
  color: chooseRandomly(Object.values(Colors)),
}));

export const dataSample = {
  start: '2022-01-01',
  end: '2022-01-03',
  color: 'red',
};

export const colorToClassName: Record<Colors, string> = {
  red: 'bg-red-300 text-red-900',
  green: 'bg-green-300 text-green-900',
  blue: 'bg-blue-300 text-blue-900',
};

