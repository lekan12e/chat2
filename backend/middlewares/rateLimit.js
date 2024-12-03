import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 requests per window
  message: {
    status: 429,
    error: "Too many requests. Please try again after 15 minutes.",
  },
});

export default limiter;
