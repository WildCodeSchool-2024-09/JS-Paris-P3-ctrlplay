import { useCallback, useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

import "./FiltersGame.css";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

type ObjectMultiSelect = { value: string; label: string };

type FiltersState = {
	genres: string[];
	devices: string[];
	tags: string[];
	publishers: string[];
};

function FilterGame() {
	const { selectedFilters, setSelectedFilters, setSearchQuery } = useSearch();
	const [showFilters, setShowFilters] = useState(false);
	const toggleFilters = () => {
		setShowFilters(!showFilters);
	};
	const navigate = useNavigate();

	const [filters, setFilters] = useState<FiltersState>({
		genres: [],
		devices: [],
		tags: [],
		publishers: [],
	});

	const getFilters = useCallback((property: string) => {
		fetch(`${import.meta.env.VITE_API_URL}/api/${property}`)
			.then((res) => res.json())
			.then((data) =>
				setFilters((prevFilter) => ({ ...prevFilter, [property]: data })),
			);
	}, []);

	useEffect(() => {
		["genres", "devices", "tags", "publishers"].forEach(getFilters);
	}, [getFilters]);

	const optionsTags = filters.tags.map((tag) => ({
		label: `#${tag.split(" ").join("").toLowerCase()}`,
		value: tag,
	}));

	const optionsPublishers = filters.publishers.map((publisher) => ({
		label: publisher,
		value: publisher,
	}));

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked, name } = event.target;
		setSearchQuery("");

		setSelectedFilters((prev: FiltersState) => ({
			...prev,
			[name]: checked
				? [...prev[name as keyof FiltersState], value]
				: prev[name as keyof FiltersState].filter(
						(selection: string) => selection !== value,
					),
		}));
		navigate("/results");
	};

	return (
		<div className={`filter ${showFilters}`}>
			<div className="title-filters">
				<p
					onKeyUp={(e) => {
						if (e.key === " " || e.key === "enter") toggleFilters;
					}}
					onClick={toggleFilters}
					className="toggle-filters"
				>
					{showFilters ? "Hide filters" : "Show filters"}
				</p>
				{showFilters && <h3 className="filters-game">Filters</h3>}
			</div>

			{showFilters && (
				<>
					<div className="game-genre">
						<p className="filter-genre">Genre</p>
						<div className="checkbox-genre">
							{filters.genres.map((genre) => (
								<label className="check-genre" key={genre}>
									<input
										className="custom-checkbox"
										type="checkbox"
										name="genres"
										value={genre}
										onChange={handleCheckboxChange}
									/>
									{genre}
								</label>
							))}
						</div>
					</div>

					<div className="game-device">
						<p className="filter-device">Device</p>
						<div className="checkbox-device">
							{filters.devices.map((device) => (
								<label className="check-device" key={device}>
									<input
										className="custom-checkbox"
										type="checkbox"
										name="devices"
										value={device}
										onChange={handleCheckboxChange}
									/>
									{device}
								</label>
							))}
						</div>
					</div>

					<div className="tag-publisher-box">
						<div className="game-tags">
							<p className="filter-tag">Tags</p>
							<MultiSelect
								className="custom-multiselect"
								options={optionsTags}
								hasSelectAll={false}
								value={selectedFilters.tags.map((tag) => ({
									label: `#${tag.split(" ").join("").toLowerCase()}`,
									value: tag,
								}))}
								onChange={(selectedTags: ObjectMultiSelect[]) => {
									setSelectedFilters((prev) => ({
										...prev,
										tags: selectedTags.map((tag) => tag.value),
									}));
									setSearchQuery("");
									navigate("/results");
								}}
								labelledBy="Select"
							/>
						</div>

						<div className="game-publisher">
							<p className="filter-publisher">Publisher</p>
							<MultiSelect
								className="custom-multiselect"
								options={optionsPublishers}
								hasSelectAll={false}
								value={selectedFilters.publishers.map((publisher) => ({
									label: publisher,
									value: publisher,
								}))}
								onChange={(selectedPublishers: ObjectMultiSelect[]) => {
									setSelectedFilters((prev) => ({
										...prev,
										publishers: selectedPublishers.map(
											(publisher) => publisher.value,
										),
									}));
									setSearchQuery("");
									navigate("/results");
								}}
								labelledBy="Select"
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default FilterGame;
