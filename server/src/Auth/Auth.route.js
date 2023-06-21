import { Router } from "express";
import express from "express";

import { createUser, checkUser } from "./Auth.controller.js";

export const authRoute = Router();
authRoute.use(express.json());
authRoute.use(express.urlencoded({ extended: true }));
authRoute.post("/auth/", checkUser);
authRoute.post("/auth/register", createUser);

export default authRoute;
