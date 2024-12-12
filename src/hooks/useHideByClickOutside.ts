import { useEffect, useRef } from 'react';

const useHideByClickOutside = (onClose: () => void, targetName: string) => {
  const modalRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        modalRef.current.parentNode !== target.closest(targetName)
      ) {
        onClose();
      }
    }

    console.log("!!!!!!!!!!!!!!!!!! 5");
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return modalRef;
};

export { useHideByClickOutside };
