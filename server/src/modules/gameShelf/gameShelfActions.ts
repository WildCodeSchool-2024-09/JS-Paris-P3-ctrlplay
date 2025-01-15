import type { RequestHandler } from "express";
import gameRepository from "../game/gameRepository";
import userRepository from "../user/userRepository";
import gameShelfRepository from "./gameShelfRepository";

const add: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const user = await userRepository.read(userId);
		if (!user) {
			res.status(404).json({ error: "User not found." });
		}

		const game = await gameRepository.read(gameId);
		if (!game) {
			res.status(404).json({ error: "Game not found." });
		}

		const alreadyExists = await gameShelfRepository.exists(userId, gameId);
		if (alreadyExists) {
			res
				.status(409)
				.json({ error: "Game already exists in the user's library." });
		}

		await gameShelfRepository.create({ userId, gameId });

		res
			.status(201)
			.json({ message: "Game added to user library successfully." });
	} catch (err) {
		next(err);
	}
};

export default { add };
