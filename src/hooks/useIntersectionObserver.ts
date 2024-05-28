import { useEffect, useRef } from 'react';

interface IntersectionObserverOptionType {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}
interface IntersectionObserverType {
  callback: () => void;
  option?: IntersectionObserverOptionType;
}

export const useIntersectionObserver = ({
  callback,
  option = {},
}: IntersectionObserverType) => {
  const ref = useRef(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting) {
      callback();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
      ...option,
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return ref;
};
