import clsx from 'clsx';
import untypedRanges from './ranges.json';
import { colorToClassName, dataSample, Item, Range, items, colors } from './utils';

const ranges = untypedRanges as Range[];

const transform = (items: Item[]) => {
  // TODO implement
  // ----------------------
  // DONE: use cycle
  const rangedListItems: Range[] = [];
  let currentItem: Item = items[0];

  for ( let i = 1; i < items.length ; i++ ) {
    const changeableItem: Range = {
      start: '',
      end: '',
      color: Object.values(colors)[0],
    };

    changeableItem.start = currentItem.date;
    changeableItem.color = currentItem.color;

    if (currentItem.color !== items[i].color) {
      changeableItem.end = items[i - 1].date;
      rangedListItems.push(changeableItem);
      currentItem = items[i];
    };
    
    if ( i === items.length - 1 ) {
      rangedListItems.push({
        start: currentItem.date,
        end: items[i].date,
        color: items[i].color,
      });
    }

  };

  return rangedListItems;
};

const RangesView = ({ ranges }: { ranges: Range[] }) => (
  <ul className="space-y-4">
    {ranges.map((item) => (
      <li
        key={item.start + item.end}
        className={clsx(
          'h-10 flex items-center justify-between px-5 rounded',
          colorToClassName[item.color],
        )}
      >
        <span>{item.start}</span>
        <span>{item.end}</span>
      </li>
    ))}
  </ul>
);

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
            className={clsx('h-10 flex items-center px-5 rounded', colorToClassName[item.color])}
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
