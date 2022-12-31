import clsx from 'clsx';
import { Colors } from '~/types/Colors';
import { Item } from '~/types/Item';
import { Range } from '~/types/Ranges';
import untypedRanges from './ranges.json';
import { RangesView } from './RangesView';
import { colorToClassName, dataSample, items } from './utils';

const ranges = untypedRanges as Range[];

const transform = (items: Item[]): Range[] => {
  const newRanges = [];
  let item = {
    start: '',
    end: '',
    color: Colors.GREEN,
  }

  for (let i = 0; i < items.length; i++) {
    const current = items[i];

    if (!item.start) {
      item.start = current.date;
      item.color = current.color;
    }

    if (current.color === item.color) {
      item.end = current.date;
    } else {
      newRanges.push(item);
      item = {
        start: current.date,
        end: current.date,
        color: current.color,
      }
    }
  }
  newRanges.push(item);

  return newRanges;
};

export const Ranges = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-4 grid grid-cols-3 gap-8">
      <div className="col-span-3">
        <h2 className="text-2xl mb-4">Convert adjacent items of same type into ranges</h2>
        <p>The data of individual item should look like this: </p>
        <pre>{JSON.stringify(dataSample, null, 2)}</pre>
      </div>

      <h3 className="text-xl font-bold row-start-2">Discretes</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.date}
            className={clsx(
              'h-10 flex items-center px-5 rounded',
              colorToClassName[item.color],
            )}
          >
            {item.date}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-bold row-start-2">Ranges example</h3>
      <RangesView ranges={ranges} />

      <h3 className="text-xl font-bold row-start-2">Ranges implementation</h3>
      <RangesView ranges={transform(items)} />
    </div>
  );
};
