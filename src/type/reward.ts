import { z } from "zod";

export type Reward = {
    id: number;
    bg: string;
    icon: string;
    link: string;
    category: string;
    amount: number;
}

export const RewardSchema = z.object({
    bg: z.string(),
    icon: z.string(),
    link: z.string(),
    category: z.string(),
    amount: z.number(),
});