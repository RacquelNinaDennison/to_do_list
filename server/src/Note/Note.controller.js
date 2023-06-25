import { getNote, sendNote } from "./Note.service.js";

export const getUserNotes = async (req, res) => {
	const notesArray = await getNote(Number(req.params.userId));
	res.json({ notes: notesArray });
};

export const sendUserNotes = async (req, res) => {
	const notes = req.body;
	const sendNotes = await sendNote(notes, Number(req.params.userId));
	res.json({ status: sendNotes });
};
