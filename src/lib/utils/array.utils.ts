export const pick = <T>(arr: T[], seed: number): T => arr[seed % arr.length];
