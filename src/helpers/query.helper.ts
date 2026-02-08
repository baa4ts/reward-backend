type LimitOptions = { defaultLimit?: number; maxLimit?: number };

export function parseLimit(limitParam: unknown, options: LimitOptions = {}): number {
    const { defaultLimit = 10, maxLimit = 50 } = options;

    const limit = Math.abs(Number(limitParam));

    if (!Number.isInteger(limit) || limit === 0) {
        return defaultLimit;
    }

    return Math.min(limit, maxLimit);
}
