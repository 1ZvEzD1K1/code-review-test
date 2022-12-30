import React from 'react';
import QnA, { TQnA } from '../QnA/QnA';

type Props = {
  data: TQnA[];
};

const QnAList = ({ data }: Props) => {
  return (
    <>
      {data.map((el) => {
        return <QnA {...el} />;
      })}
    </>
  );
};

export default React.memo(QnAList);
