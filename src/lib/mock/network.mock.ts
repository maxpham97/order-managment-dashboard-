const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export const networkDelay = () => delay(300 + Math.random() * 500);

export const maybeThrow = () => {
    if (Math.random() < 0.05) {
        throw new Error("Network error: request failed (mock ~5% rate)");
    }
};
