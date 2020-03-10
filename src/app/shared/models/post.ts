import { RateLimit } from './rate-limit';

export interface Post {
    id: number;
    user_id: string;
    title: string;
    body: string;
    rateLimit: RateLimit;
}