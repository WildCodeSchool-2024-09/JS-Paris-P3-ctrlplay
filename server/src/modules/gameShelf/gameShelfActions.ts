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

		const user = await userRepository.read(Number(userId));
		if (!user) {
			res.status(404).json({ error: "User not found." });
		}

		const game = await gameRepository.read(Number(gameId));
		if (!game) {
			res.status(404).json({ error: "Game not found." });
		}

		const alreadyExists = await gameShelfRepository.exists(
			Number(userId),
			Number(gameId),
		);
		if (alreadyExists) {
			res
				.status(409)
				.json({ error: "Game already exists in the user's library." });
		}

		await gameShelfRepository.create(userId, gameId);

		res
			.status(201)
			.json({ message: "Game added to user library successfully." });
	} catch (err) {
		next(err);
	}
};

const remove: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const user = await userRepository.read(Number(userId));
		if (!user) {
			res.status(404).json({ error: "User not found." });
		}

		const game = await gameRepository.read(Number(gameId));
		if (!game) {
			res.status(404).json({ error: "Game not found." });
		}

		const exists = await gameShelfRepository.exists(
			Number(userId),
			Number(gameId),
		);
		if (!exists) {
			res.status(404).json({ error: "Game not found in the user's library." });
		}

		await gameShelfRepository.delete(Number(userId), Number(gameId));

		res
			.status(200)
			.json({ message: "Game removed from user library successfully." });
	} catch (err) {
		next(err);
	}
};

const exists: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.params;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const exists = await gameShelfRepository.exists(
			Number(userId),
			Number(gameId),
		);

		res.status(200).json({ exists });
	} catch (err) {
		next(err);
	}
};

const isFavorite: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.params;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const exists = await gameShelfRepository.isFavorite(
			Number(userId),
			Number(gameId),
		);

		res.status(200).json({ isFavorite: exists });
	} catch (err) {
		next(err);
	}
};

const updateFavorite: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;

		if (!userId || !gameId) {
			res.status(400).json({
				error: "userId, gameId are required.",
			});
		} else {
			const user = await userRepository.read(userId);
			if (!user) {
				res.status(404).json({ error: "User not found." });
			} else {
				const game = await gameRepository.read(gameId);
				if (!game) {
					res.status(404).json({ error: "Game not found." });
				} else {
					const alreadyExists = await gameShelfRepository.exists(
						userId,
						gameId,
					);
					if (!alreadyExists) {
						await gameShelfRepository.create(userId, gameId);
					}

					const isFavorite = await gameShelfRepository.isFavorite(
						userId,
						gameId,
					);

					await gameShelfRepository.updateFavorite(userId, gameId, isFavorite);

					res.status(200).json({
						message: "game add to favorite successfully",
					});
				}
			}
		}
	} catch (err) {
		next(err);
	}
};
const removeFavorite: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const user = await userRepository.read(Number(userId));
		if (!user) {
			res.status(404).json({ error: "User not found." });
		}

		const game = await gameRepository.read(Number(gameId));
		if (!game) {
			res.status(404).json({ error: "Game not found." });
		}

		const favorites = await gameShelfRepository.readAllByUser(Number(userId));
		const isFavorite = favorites.some(
			(favGame) => Number(favGame.id) === Number(gameId),
		);
		if (!isFavorite) {
			res.status(404).json({
				error:
					"this game is not marked as favorite, cannot be removed from your list.",
			});
		}

		await gameShelfRepository.delete(Number(userId), Number(gameId));

		res
			.status(200)
			.json({ message: "Game removed from user favorite successfully." });
	} catch (err) {
		next(err);
	}
};
const isToDo: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.params;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const exists = await gameShelfRepository.isToDo(
			Number(userId),
			Number(gameId),
		);

		res.status(200).json({ isToDo: exists });
	} catch (err) {
		next(err);
	}
};

const updateToDo: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;

		if (!userId || !gameId) {
			res.status(400).json({
				error: "userId, gameId are required.",
			});
		} else {
			const user = await userRepository.read(userId);
			if (!user) {
				res.status(404).json({ error: "User not found." });
			} else {
				const game = await gameRepository.read(gameId);
				if (!game) {
					res.status(404).json({ error: "Game not found." });
				} else {
					const alreadyExists = await gameShelfRepository.exists(
						userId,
						gameId,
					);
					if (!alreadyExists) {
						await gameShelfRepository.create(userId, gameId);
					}

					const isToDo = await gameShelfRepository.isToDo(userId, gameId);

					await gameShelfRepository.updateToDo(userId, gameId, isToDo);

					res.status(200).json({
						message: "game add to your to do list successfully",
					});
				}
			}
		}
	} catch (err) {
		next(err);
	}
};
const removeToDo: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const user = await userRepository.read(Number(userId));
		if (!user) {
			res.status(404).json({ error: "User not found." });
		}

		const game = await gameRepository.read(Number(gameId));
		if (!game) {
			res.status(404).json({ error: "Game not found." });
		}

		const toDo = await gameShelfRepository.readAllByUser(Number(userId));
		const isToDo = toDo.some(
			(favGame) => Number(favGame.id) === Number(gameId),
		);
		if (!isToDo) {
			res.status(404).json({
				error:
					"this game is not marked as in to do, cannot be removed from your list.",
			});
		}

		await gameShelfRepository.delete(Number(userId), Number(gameId));

		res.status(200).json({ message: "Game removed from your to do list." });
	} catch (err) {
		next(err);
	}
};
export default {
	add,
	remove,
	exists,
	updateFavorite,
	isFavorite,
	removeFavorite,
	updateToDo,
	isToDo,
	removeToDo,
};
