import { CenteredLayout } from '~/components';
import { QnaRender } from './QnaRender';
import { QnA } from './refactor-2.data.qna';
import { v4 as uuidv4 } from 'uuid';

export const Refactor2 = () => {
  return (
    <CenteredLayout className="gap-2">
      <div className="text-3xl mb-2">See the code</div>
      {QnA.map((item) => (
        <QnaRender
          key={uuidv4()}
          item={item}
        />
      ))}
    </CenteredLayout>
  );
};
