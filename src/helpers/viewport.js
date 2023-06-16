function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  let result = false;
  if (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  ) {
    result = true;
  }
  return result;
}

export { isInViewport };
