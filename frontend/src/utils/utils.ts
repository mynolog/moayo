export const debounce = (fn: () => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
