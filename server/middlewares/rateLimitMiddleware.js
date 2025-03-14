const requestLimits = new Map(); // Store IP + session-based tracking

export const rateLimitMiddleware = (req, res, next) => {
  const userIP = req.ip;
  const currentTime = Date.now();

  if (requestLimits.has(userIP)) {
    const { lastRequestTime } = requestLimits.get(userIP);
    if (currentTime - lastRequestTime < 60000) { // 1-minute cooldown
      return res.status(429).json({ message: "Too many requests. Try again later." });
    }
  }

  requestLimits.set(userIP, { lastRequestTime: currentTime });
  next();
};
