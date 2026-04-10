import * as fs from "fs";

const usersTable = document.getElementById("users-table");
const addUserBtn = document.getElementById("btn-add-user");
const refreshUsersBtn = document.getElementById("btn-refresh-users");

const addPlayerBtn = document.getElementById("btn-add-player");
const playersTable = document.getElementById("players-table");
const refreshPlayersBtn = document.getElementById("btn-refresh-players");

const playerForm = document.getElementById("player-form");
const clubSelect = document.getElementById("player-club");

clubSelect.addEventListener("change", () => {
    const selectedClub = clubSelect.value;
    const logoPreview = document.getElementById("club-logo-preview");
    const logoImg = logoPreview.querySelector("img");
    if (selectedClub) {
        const logoPath = `../../src/uploads/clubs/${selectedClub}.png`;
        fs.access(logoPath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error("Грешка при достъп до логото на клуба:", err);
                logoImg.style.display = "none";
                logoPreview.querySelector("i").style.display = "block";
            } else {
                logoImg.src = logoPath;
                /* logoImg.style.display = "block";
                logoPreview.querySelector("i").style.display = "none"; */
            }
        });
    }
    else {
        logoImg.style.display = "none";
        logoPreview.querySelector("i").style.display = "block";
    }
});

if (playerForm) {
    const dir = "../../src/uploads/clubs";
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error("Грешка при четене на директорията:", err);
            return;
        }
        files.forEach(file => {
            const name = file.name; split(".")[0];
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            clubSelect.appendChild(option);
        });
    });

}

playerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const playerImg = document.getElementById("player-img");
    if (!playerImg.files || playerImg.files.length === 0) {
        alert("Моля, изберете снимка на играча.");
        return;
    }

    const dir = "../../src/uploads/clubs";
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error("Грешка при четене на директорията:", err);
            return;
        }
        files.forEach(file => {
            console.log(file);
        });
    const formData = new FormData(form);

    });
});

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
