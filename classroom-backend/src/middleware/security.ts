import { Request, Response, NextFunction } from "express";
import aj from "../config/arcjet.js";
import { slidingWindow, ArcjetNodeRequest } from "@arcjet/node";

const securityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.NODE_ENV === "test") return next();

  try {
    const role: RateLimitRole = req.user?.role ?? "guest";

    let limit: number;
    let message: string;

    switch (role) {
      case "admin":
        limit = 20; // Very high limit for admins
        message = "Admin rate limit exceeded. Please try again later.";
        break;
      case "teacher":
      case "student":
        limit = 10; // Strict limit for students
        message = "User rate limit exceeded. Please try again later.";
        break;
      default:
        limit = 5; // Very strict limit for guests
        message = "Guest rate limit exceeded. Please try again later.";
        break;
    }

    const client = aj.withRule(
      slidingWindow({
        mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
        interval: "60s", // Time window in seconds
        max: limit, // Max requests per IP in the time window
      }),
    );

    const arcjetRequest: ArcjetNodeRequest = {
      headers: req.headers,
      method: req.method,
      url: req.originalUrl ?? req.url,
      socket: {
        remoteAddress: req.socket.remoteAddress ?? req.ip ?? "0.0.0.0",
      },
    };

    const decision = await client.protect(arcjetRequest);

    if (decision.isDenied() && decision.reason.isBot()) {
      return res.status(403).json({
        error: "Forbidden",
        message:
          "Your request was blocked because it was identified as coming from a bot.",
      });
    }
    if (decision.isDenied() && decision.reason.isShield()) {
      return res.status(403).json({
        error: "Forbidden",
        message: "Your request was blocked by our security system.",
      });
    }
    if (decision.isDenied() && decision.reason.isRateLimit()) {
      return res.status(429).json({
        error: "Too many requests",
        message,
      });
    }

    next();
  } catch (e) {
    console.error("Security middleware error:", e);
    res.status(500).json({
      error: "Internal server error",
      message: "Something went wrong with the security checks.",
    });
  }
};

export default securityMiddleware;
