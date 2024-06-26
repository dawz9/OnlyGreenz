const teams = [
    { name: "Team 1", members: ["Bahm", "Lelo"], scores: [{ player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }] },
    { name: "Team 2", members: ["Riley", "Lucas"], scores: [{ player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }] },
    { name: "Team 3", members: ["Ian", "Daws"], scores: [{ player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }] },
    { name: "Team 4", members: ["Shed", "Ryan"], scores: [{ player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }, { player1: Array(9).fill(0), player2: Array(9).fill(0), total: 0 }] }
];

function login() {
    const username = document.getElementById("username").value;
    if (username) {
        document.getElementById("login-section").classList.remove("visible");
        document.getElementById("team-setup-section").classList.add("visible");
        loadTeamNames();
    } else {
        alert("Please enter a username");
    }
}

function logout() {
    document.getElementById("login-section").classList.add("visible");
    document.getElementById("scoreboard-section").classList.remove("visible");
}

function loadTeamNames() {
    const teamNamesContainer = document.getElementById("team-names");
    teamNamesContainer.innerHTML = "";
    teams.forEach((team, index) => {
        const teamDiv = document.createElement("div");
        teamDiv.innerHTML = `
            <h3>${team.name}</h3>
            <input type="text" id="team-name-${index}" value="${team.name}" readonly>
        `;
        teamNamesContainer.appendChild(teamDiv);
    });
}

function startScoring() {
    document.getElementById("team-setup-section").classList.remove("visible");
    document.getElementById("scoreboard-section").classList.add("visible");
    loadScores();
}

function loadScores() {
    const teamsContainer = document.getElementById("teams");
    teamsContainer.innerHTML = "";
    teams.forEach((team, index) => {
        for (let round = 0; round < 4; round++) {
            const teamDiv = document.createElement("div");
            teamDiv.innerHTML = `
                <h3>${team.name} - Round ${round + 1}</h3>
                <p>Members: ${team.members.join(", ")}</p>
                <table>
                    <tr>
                        <th>Hole</th>
                        ${[...Array(9)].map((_, i) => `<th>${i + 1}</th>`).join('')}
                    </tr>
                    <tr>
                        <td>${team.members[0]}</td>
                        ${[...Array(9)].map((_, i) => `<td><input type="number" id="score-${index}-round-${round}-player1-${i}" value="${team.scores[round].player1[i]}" onchange="updateScore(${index}, ${round}, 'player1', ${i})"></td>`).join('')}
                    </tr>
                    <tr>
                        <td>${team.members[1]}</td>
                        ${[...Array(9)].map((_, i) => `<td><input type="number" id="score-${index}-round-${round}-player2-${i}" value="${team.scores[round].player2[i]}" onchange="updateScore(${index}, ${round}, 'player2', ${i})"></td>`).join('')}
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td colspan="9"><input type="number" id="total-${index}-round-${round}" value="${team.scores[round].total}" onchange="updateTotalScore(${index}, ${round})"></td>
                    </tr>
                </table>
            `;
            teamsContainer.appendChild(teamDiv);
        }
    });
}

function updateScore(teamIndex, round, player, hole) {
    const score = document.getElementById(`score-${teamIndex}-round-${round}-${player}-${hole}`).value;
    teams[teamIndex].scores[round][player][hole] = parseInt(score) || 0;
}

function updateTotalScore(teamIndex, round) {
    const totalScore = document.getElementById(`total-${teamIndex}-round-${round}`).value;
    teams[teamIndex].scores[round].total = parseInt(totalScore) || 0;
}
