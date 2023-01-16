import { useEffect, useState } from 'react';
import { CenteredLayout } from '~/layouts';

// TODO how can we optimize, prevent re-rendering ExpensiveComponent
// by changing component structure ?

const ExpensiveComponent = () => {
  const now = performance.now();
  //! 🚩🚩🚩🚩🚩🚩🚩🚩🚩
  // while (performance.now() - now < 100) {}
  return <div>Ohh.. so expensive</div>;
};

export const Optimize2 = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      //? Why should we add one more listener on ComponentWillUnMount ?
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="h-[1000vh] bg-gradient-to-tr from-gray-100 to-gray-200 bg-repeat bg-[length:100%_8px]">
      <CenteredLayout className="gap-4 fixed top left-1/2 -translate-x-1/2">
        <div className="text-3xl">See the code</div>
        <div>{scrollTop} px</div>
        <ExpensiveComponent />
      </CenteredLayout>
    </div>
  );
};
