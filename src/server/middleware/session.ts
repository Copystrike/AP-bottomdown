import console from "console";
import express, { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils";

const router = express.Router();

// - Routes
// Als session NIET bestaat en de route is /login of /register, dan mag je door
// ALs je session BESTAAT en de route is /login of /register, dan mag je NIET door
router.use((request: Request, response: Response, next: NextFunction) => {
  const hasValidSession = verifyToken(request, response);

  const alwaysAllowed = request.path.startsWith("/favicon.ico") || request.path.startsWith("/api/login") || request.path.startsWith("/api/register");
  const unAuthenicatedOnly = request.path === "/login" || request.path === "/register";

  console.log(`[${new Date().toISOString()}] ${request.method} ${request.path}`); // Logt de request

  if (hasValidSession && unAuthenicatedOnly) {
    response.redirect("/");
    return;
  }

  if (!hasValidSession && !alwaysAllowed && !unAuthenicatedOnly) {
    response.redirect("/login");
    return;
  }

  next();
});

module.exports = router;
