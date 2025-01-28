import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type GameType from "../../interface/GameType";
class gameRepository {
	async readAll(
		filters: {
			genre?: string;
			device?: string;
			tag?: string;
			publisher?: string;
		} = {},
	) {
		const conditions: string[] = [];
		const values: (string | number)[] = [];
		if (filters.genre) {
			conditions.push("genres LIKE ?");
			values.push(`%${filters.genre}%`);
		}
		if (filters.device) {
			conditions.push("devices LIKE ?");
			values.push(`%${filters.device}%`);
		}
		if (filters.tag) {
			conditions.push("tags LIKE ?");
			values.push(`%${filters.tag}%`);
		}
		if (filters.publisher) {
			conditions.push("publishers LIKE ?");
			values.push(`%${filters.publisher}%`);
		}
		const HavingClause =
			conditions.length > 0 ? `HAVING (${conditions.join(" AND ")})` : "";
		const query = `
        SELECT g.*, GROUP_CONCAT(DISTINCT ge.name ORDER BY ge.name SEPARATOR ', ') AS genres, GROUP_CONCAT(DISTINCT d.name ORDER BY d.name SEPARATOR ', ') AS devices, GROUP_CONCAT(DISTINCT tag.name ORDER BY tag.name SEPARATOR ', ') AS tags, GROUP_CONCAT(DISTINCT publisher.name ORDER BY publisher.name SEPARATOR ', ') AS publishers
        FROM game g
        LEFT JOIN game_genre AS gg ON gg.game_id = g.id
        LEFT JOIN genre ge ON gg.genre_id = ge.id
        LEFT JOIN game_device AS gd ON gd.game_id = g.id
        LEFT JOIN device d ON gd.device_id = d.id
        LEFT JOIN game_tag AS gt ON gt.game_id = g.id
        LEFT JOIN tag ON gt.game_id = tag.id
        LEFT JOIN game_publisher AS gp ON gp.game_id = g.id
        LEFT JOIN publisher ON gp.game_id = publisher.id
        GROUP BY g.id
        ${HavingClause}
        `;
		const [rows] = await databaseClient.query<Rows>(query, values);
		return rows as GameType[];
	}

	async read(id: number) {
		const [[game]] = await databaseClient.query<Rows>(
			"SELECT * FROM game WHERE game.id = ?",
			[id],
		);
		return game;
	}

	async readAllReco(
		userId: number,
		devices: string[],
		genres: string[],
		tags: string[],
	) {
		const devicesQuery = devices.map((device) => `"${device}"`).join(", ");

		const conditions: string[] = [];
		const values = [userId, devicesQuery];

		genres.map((genre) => {
			conditions.push("(CASE WHEN genres LIKE ? THEN 1 ELSE 0 END)");
			values.push(`%${genre}%`);
		});

		tags.map((tag) => {
			conditions.push("(CASE WHEN tags LIKE ? THEN 1 ELSE 0 END)");
			values.push(`%${tag}%`);
		});

		devices.map((device) => {
			conditions.push("(CASE WHEN devices LIKE ? THEN 1 ELSE 0 END)");
			values.push(`%${device}%`);
		});

		const matches = conditions.join(" + ");

		const query = `WITH filtered_games AS (SELECT g.*, 
			GROUP_CONCAT(DISTINCT ge.name ORDER BY ge.name SEPARATOR ', ') AS genres, 
			GROUP_CONCAT(DISTINCT d.name ORDER BY d.name SEPARATOR ', ') AS devices, 
			GROUP_CONCAT(DISTINCT tag.name ORDER BY tag.name SEPARATOR ', ') AS tags, 
			GROUP_CONCAT(DISTINCT publisher.name ORDER BY publisher.name SEPARATOR ', ') AS publishers
		FROM game g 
		LEFT JOIN game_genre AS gg ON gg.game_id = g.id 
		LEFT JOIN genre ge ON gg.genre_id = ge.id 
		LEFT JOIN game_device AS gd ON gd.game_id = g.id 
		LEFT JOIN device d ON gd.device_id = d.id 
		LEFT JOIN game_tag AS gt ON gt.game_id = g.id 
		LEFT JOIN tag ON gt.tag_id = tag.id 
		LEFT JOIN game_publisher AS gp ON gp.game_id = g.id 
		LEFT JOIN publisher ON gp.publisher_id = publisher.id 
		LEFT JOIN game_shelf gs ON gs.game_id = g.id 
		WHERE gs.user_id != ? 
			AND d.name IN ( ${devicesQuery} ) 
		GROUP BY g.id) 
		
		SELECT filtered_games.*,
		(${matches}) AS match_score
		FROM filtered_games
		ORDER BY match_score DESC`;

		const [games] = await databaseClient.query<Rows>(query, values);

		return games;
	}
}
export default new gameRepository();
