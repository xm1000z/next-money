import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { isPaid } from './subscription';
import { checkPaidSubscription } from './middleware'; // Ajusta la ruta según la ubicación de tu middleware

const app = express();

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/blog",
  "/docs",
  "/guides",
  "/pricing",
  "/terms",
  "/privacy",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register", "/auth/error"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/app";

async function checkPaidSubscription(req: Request, res: Response, next: NextFunction) {
  const userId = req.user.id; // Asumiendo que el ID del usuario está disponible en req.user

  if (await isPaid(userId)) {
    next();
  } else {
    res.status(403).send('Access denied. Please subscribe to access this page.');
  }
}

export { checkPaidSubscription };

// Rutas protegidas
app.get('/protected-page', checkPaidSubscription, (req, res) => {
  res.send('Welcome to the protected page!');
});

// Otras rutas y configuración de la aplicación
