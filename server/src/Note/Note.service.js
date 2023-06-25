import { prisma } from "../../utils.js";

export const getNote = async (id) => {
	const notes = await prisma.note.findMany({
		where: {
			userId: id,
		},
	});
	return notes;
};

export const sendNote = async (note, id) => {
	const createdNote = await prisma.note.create({
		data: {
			title: note.title,
			content: note.content,
			userId: id,
		},
	});
	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});
	if (createdNote) {
		return 1;
	}
};
