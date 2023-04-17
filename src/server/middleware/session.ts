import console from "console";
import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

// - Routes
// Als session NIET bestaat en de route is /login of /register, dan mag je door
// ALs je session BESTAAT en de route is /login of /register, dan mag je NIET door
router.use((request: Request, response: Response, next: NextFunction) => {
  const session = request.cookies["session"];

  const alwaysAllowed = request.path.startsWith("/api");
  const unAuthenicatedOnly = request.path === "/login" || request.path === "/register";

  console.log(`[${new Date().toISOString()}] ${request.method} ${request.path}`); // Logt de request

  if (session && unAuthenicatedOnly) {
    console.log("Redirecting to /");
    response.redirect("/");
    return;
  }

  if (!session && !alwaysAllowed && !unAuthenicatedOnly) {
    console.log("Redirecting to /login");
    response.redirect("/login");
    return;
  }

  next();
});

module.exports = router;