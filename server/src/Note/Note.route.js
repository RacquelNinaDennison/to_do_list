import { Router } from "express";
import express from "express";

import { getUserNotes, sendUserNotes, deletedNote } from "./Note.controller.js";

export const noteRoute = Router();
noteRoute.use(express.json());
noteRoute.use(express.urlencoded({ extended: true }));

noteRoute.get("/note/:userId", getUserNotes);
noteRoute.post("/note/:userId", sendUserNotes);
noteRoute.delete("/note/:postId", deletedNote);

export default noteRoute;
