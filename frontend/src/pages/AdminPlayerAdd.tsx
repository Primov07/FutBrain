import React from "react";
import { Link } from "react-router-dom";

interface Club {
	name: string;
	url: string;
}

const BASE_URL: string = import.meta.env.VITE_API_URL.toString();

const AdminPlayerAdd: React.FC = () => {
	const url: string = `${BASE_URL}/clubs`;
	const [clubs, setClubs] = React.useState<Club[]>([]);
  const [selectedClub, setSelectedClub] = React.useState<Club | null>(null);
  const [playerName, setPlayerName] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);

	React.useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((data: Club[]) => {
				console.log("Fetched clubs:", data);
				setClubs(data);
			})
			.catch((err) => console.error(err));
	}, []);

	const handleClubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const clubName : string = event.target.value;
    const club: Club | null = clubs.find((c) => c.name === clubName) || null;
		setSelectedClub(club);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData(e.currentTarget);
    const clubName = selectedClub!.name;
    
    const response = await fetch(`${BASE_URL}/players/`, {
      method: "POST",
      body: formData
    })

    response.json();
  };

	return (
		<>
			<div className="section-header">
				<h2>Добави нов играч</h2>
			</div>

			<div className="admin-form-container">
				<form
					className="admin-form"
          id="player-form"
          onSubmit={handleSubmit}
				>
					<div className="form-group">
						<label htmlFor="player-name">Име на играча</label>
						<input
							type="text"
              id="player-name"
              name="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
							placeholder="Въведете име..."
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="player-club">Клуб</label>
						<select
							id="player-club"
							required
              defaultValue=""
              name="club"
              value={selectedClub?.name}
							onChange={handleClubChange}
						>
							<option
								value=""
								disabled
							>
								Изберете клуб...
							</option>
							{clubs.map((club) => (
								<option
									key={club.name}
									value={club.name}
								>
									{club.name}
								</option>
							))}
						</select>
					</div>

					<div className="form-group club-preview-container">
						<label>Лого на избрания клуб</label>
						<div
							className="club-logo-display"
							id="club-logo-preview"
						>
							{selectedClub ?
								<img
									src={`${selectedClub.url}`}
									alt={`${selectedClub.name}`}
								/>
							:	<p>Няма избран клуб</p>}
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="player-img">Снимка на играча</label>
						<div className="file-input-wrapper">
							<button
								type="button"
								className="btn-file"
							>
								<i className="fas fa-upload"></i> Избери снимка
							</button>
							<input
								type="file"
                id="player-img"
                name="playerImg"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
							/>
						</div>
					</div>

					<div className="form-actions">
						<button
							type="submit"
							className="btn-save"
						>
							Запази играча
						</button>
						<Link
							to="/admin/players"
							className="btn-cancel"
						>
							Отказ
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default AdminPlayerAdd;
