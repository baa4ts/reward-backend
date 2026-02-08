import { rewardTable } from "../DB/schema";

export type Reward = {
    id: number;
    bg: string;
    icon: string;
    link: string;
    category: string;
    amount: number;
}

export type Reward_DB = InferModel<typeof rewardTable>;