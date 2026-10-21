export interface StackConfig {
  baseTop: number;
  step: number;
  maxStrips: number;
  radius: number;
  tallThreshold: number;
}

export function getStackConfig(): StackConfig {
  if (typeof window === 'undefined') {
    return { baseTop: 24, step: 88, maxStrips: 4, radius: 24, tallThreshold: 1.6 };
  }
  const w = window.innerWidth;
  if (w < 640) {
    // Mobile phones: prevent viewport trapping by releasing tall cards into static flow
    return { baseTop: 8, step: 36, maxStrips: 2, radius: 16, tallThreshold: 0.95 };
  } else if (w < 1024) {
    // Tablets: balanced stacking with moderate steps
    return { baseTop: 16, step: 64, maxStrips: 3, radius: 20, tallThreshold: 1.25 };
  }
  // Desktops & Laptops: full cinematic 3D layered stacking
  return { baseTop: 24, step: 88, maxStrips: 4, radius: 24, tallThreshold: 1.6 };
}
