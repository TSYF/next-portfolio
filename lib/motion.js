export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function smoothStep(value) {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
}

export function getHeroFrame(value, mobile = false) {
  const progress = clamp(value);
  const eased = smoothStep(progress);
  const startClip = mobile ? [42, 5, 5, 48] : [13, 4.5, 9, 55];
  const [top, right, bottom, left] = startClip.map((part) => part * (1 - eased));
  const radius = (mobile ? 120 : 190) * (1 - eased);
  const translateX = mobile ? 0 : 8 * (1 - eased);
  const translateY = mobile ? 42 * (1 - eased) : 0;
  const scale = mobile ? 1.02 + 0.12 * (1 - eased) : 1.02 + 0.07 * (1 - eased);

  return {
    progress,
    expanded: progress > 0.58,
    clip: `inset(${top.toFixed(2)}% ${right.toFixed(2)}% ${bottom.toFixed(2)}% ${left.toFixed(2)}% round ${radius.toFixed(1)}px ${radius.toFixed(1)}px ${(radius * 0.26).toFixed(1)}px ${(radius * 0.26).toFixed(1)}px)`,
    imageTransform: `translate3d(${translateX.toFixed(2)}%, ${translateY.toFixed(2)}%, 0) scale(${scale.toFixed(3)})`,
  };
}

export function getServiceFrame(value, count = 3) {
  const progress = clamp(value);
  const step = progress * Math.max(count - 1, 1);
  const opacities = Array.from({ length: count }, (_, index) => clamp(1 - Math.abs(step - index)));

  return {
    progress,
    activeIndex: Math.round(step),
    opacities,
    radius: `${(44 + progress * 104).toFixed(1)}px ${(96 - progress * 52).toFixed(1)}px ${(44 + progress * 104).toFixed(1)}px ${(96 - progress * 52).toFixed(1)}px`,
  };
}
