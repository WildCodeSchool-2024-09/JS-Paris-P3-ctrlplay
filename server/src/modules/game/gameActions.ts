import type { RequestHandler } from "express";

import deviceRepository from "../device/deviceRepository";
import genreRepository from "../genre/genreRepository";
import publisherRepository from "../publisher/publisherRepository";
import tagRepository from "../tag/tagRepository";
import gameRepository from "./gameRepository";

const browseGame: RequestHandler = async (req, res, next) => {
	try {
		const items = await gameRepository.readAll(req.query);

		const modifiedGame = items.map((game) => {
			const { description, ...rest } = game;
			return rest;
		});

		res.json(modifiedGame);
	} catch (err) {
		next(err);
	}
};

const read: RequestHandler = async (req, res, next) => {
	try {
		const gameId = Number(req.params.id);
		const game = await gameRepository.read(gameId);

		game.devices = await deviceRepository.readAllByGameId(gameId);
		game.genre = await genreRepository.readAllByGameId(gameId);
		game.tags = await tagRepository.readAllByGameId(gameId);
		game.publishers = await publisherRepository.readAllByGameId(gameId);

		if (!game) res.sendStatus(404);
		else res.json(game);
	} catch (err) {
		next(err);
	}
};

export default { browseGame, read };
