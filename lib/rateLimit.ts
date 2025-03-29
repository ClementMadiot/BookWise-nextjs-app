import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from "@upstash/redis"
import config from "@/lib/config";


// Create a new ratelimiter, that allows 5 requests per minute
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: config.env.upstash.redisUrl,
    token: config.env.upstash.redisToken,
  }),
  limiter: Ratelimit.fixedWindow(5, '1m'),
  analytics: true,
  prefix: '@upstash/ratelimit',
})

export default ratelimit



