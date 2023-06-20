import { Router } from 'express';
import passport from 'passport';
import express from 'express';

import { createUser, getUser } from '../controllers/auth.controller';
import { verifyUser } from '../lib/auth';

export const authRoute = Router();
authRoute.use(express.json());
authRoute.use(express.urlencoded({ extended: true }));

// in postman, this says signup in the route

authRoute.post('/auth/signin', passport.authenticate('signin'), getUser);
authRoute.post('/auth/signup', createUser);

authRoute.get('/testing', verifyUser, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});