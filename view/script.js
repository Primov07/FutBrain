const usersTable = document.getElementById("users-table");
const addUserBtn = document.getElementById("btn-add-user");
const refreshUsersBtn = document.getElementById("btn-refresh-users");

const addPlayerBtn = document.getElementById("btn-add-player");
const playersTable = document.getElementById("players-table");
const refreshPlayersBtn = document.getElementById("btn-refresh-players");

refreshUsersBtn.addEventListener("click", async () => {
	await fetchUsers();
});

async function fetchUsers() {
	const users = await fetch("/users").then((res) => res.json());
	users.forEach((user) => {
		const newRow = usersTable.insertRow();
		//const idCell = newRow.insertCell(0);
        const usernameCell = newRow.insertCell(0);
		const emailCell = newRow.insertCell(1);
		const roleCell = newRow.insertCell(2);
		const actionsCell = newRow.insertCell(3);
		//idCell.textContent = user.id;
		usernameCell.textContent = user.username;
		emailCell.textContent = user.email;
        if (user.isAdmin) roleCell.textContent = "Администратор";
        else roleCell.textContent = "Потребител";
		actionsCell.innerHTML = `
            <button class="btn-edit"><i class="fas fa-edit"></i></button>
            <button class="btn-delete"><i class="fas fa-trash"></i></button>
        `;
	});
}


/* addUserBtn.addEventListener("click", () => {
	const newRow = usersTable.insertRow();
	const idCell = newRow.insertCell(0);
	const usernameCell = newRow.insertCell(1);
	const emailCell = newRow.insertCell(2);
	const roleCell = newRow.insertCell(3);
	const actionsCell = newRow.insertCell(4);
}); */