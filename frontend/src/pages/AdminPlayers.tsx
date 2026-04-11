import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from ".";

const playersUrl = `${BASE_URL}/players`;

import type { PlayerDTO } from ".";

const AdminPlayers: React.FC = () => {
	const [players, setPlayers] = React.useState<PlayerDTO[]>([]);

	React.useEffect(() => {
		fetch(playersUrl)
			.then((response) => response.json())
			.then((data: PlayerDTO[]) => {
				console.log("Fetched players:", data);
				setPlayers(data);
			})
			.catch((err) => console.error(err));
  }, []);
  
	async function deletePlayer(id: string) {
		if (window.confirm("Сигурни ли сте, че искате да изтриете този играч?")) {
			try {
				const response = await fetch(`${playersUrl}/${id}`, {
					method: "DELETE",
				});
				if (response.ok) {
					setPlayers(players.filter((p) => p.id !== id));
					toast.success("Играчът беше изтрит успешно.");
				} else {
					toast.error("Грешка при изтриването на играча.");
				}
			} catch (err) {
				console.error("Error deleting player:", err);
				toast.error("Грешка при изтриването на играча.");
			}
		}
	}

	return (
		<section className="data-section">
			<div className="section-header">
				<h2>База данни с играчи</h2>
				<div className="header-actions">
					<Link to="/admin/players/add" className="btn-add">
						<i className="fas fa-plus"></i> Добави нов играч
					</Link>
				</div>
			</div>
			<div className="table-responsive">
				<table className="admin-table">
					<thead>
						<tr>
							<th>Снимка</th>
							<th>Име</th>
							<th>Клуб</th>
							<th>Лого на клуб</th>
							<th>Последователи</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{players.map((p) => {
							return (
								<tr key={p.id}>
									<td>
										<img
											src={p.playerImg}
											alt={p.name}
											className="table-img"
										/>
									</td>
									<td>{p.name}</td>
									<td>{p.club}</td>
									<td>
										<img
											src={p.clubImg}
											alt={p.club}
											className="club-logo-sm"
										/>
									</td>
									<td>{p.users.length}</td>
									<td className="actions">
										<Link
											to={`/admin/players/update/${p.id}`}
											className="btn-edit"
											title="Редактирай"
										>
											<i className="fas fa-edit"></i>
										</Link>
										<button
											className="btn-delete"
											title="Изтрий"
											onClick={() => deletePlayer(p.id)}
										>
											<i className="fas fa-trash"></i>
										</button>
									</td>{" "}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default AdminPlayers;
