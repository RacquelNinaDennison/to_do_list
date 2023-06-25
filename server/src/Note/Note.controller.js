import { getNote, sendNote, deleteNote } from "./Note.service.js";

export const getUserNotes = async (req, res) => {
	const notesArray = await getNote(Number(req.params.userId));
	res.json({ notes: notesArray });
};

export const sendUserNotes = async (req, res) => {
	const notes = req.body;
	const sendNotes = await sendNote(notes, Number(req.params.userId));
	res.json({ status: sendNotes });
};

export const deletedNote = async (req, res) => {
	const updatedNotes = await deleteNote(Number(req.params.postId));
	if (updatedNotes) {
		res.json({ notes: updatedNotes, status: "1" });
	}
};
