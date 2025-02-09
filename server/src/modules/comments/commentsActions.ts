import type { RequestHandler } from "express";
import type { RowDataPacket } from "mysql2";
import commentsRepository from "./commentsRepository";

const browse: RequestHandler = async (req, res, next) => {
	try {
		const gameId = Number(req.params.gameId);
		const comments = (await commentsRepository.readAllByGameId(
			gameId,
		)) as RowDataPacket[];

		if (comments.length === 0) res.sendStatus(404);
		else res.json(comments);
	} catch (err) {
		next(err);
	}
};

const add: RequestHandler = async (req, res, next) => {
	try {
		const { user_id, game_id, content } = req.body;

		if (!user_id || !game_id || !content.trim()) {
			res.status(400).json({ error: "All fields are required" });
		}

		const newComment = await commentsRepository.add(user_id, game_id, content);
		res.json(newComment);
	} catch (err) {
		next(err);
	}
};

const remove: RequestHandler = async (req, res, next) => {
	try {
		const commentId = Number(req.params.commentId);

		const deleted = await commentsRepository.remove(commentId);
		if (!deleted) res.sendStatus(404);
		else res.json({ message: "Comment deleted" });
	} catch (err) {
		next(err);
	}
};

export default { browse, add, remove };
