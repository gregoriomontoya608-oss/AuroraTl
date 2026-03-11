AuroraTL
<!DOCTYPE html>
<html>
<head>
<title>Tier List PvP Editable</title>
<style>
  body { background:#121212; color:#fff; font-family: Arial; }
  table { border-collapse: collapse; width: 90%; margin: auto; }
  th, td { border: 1px solid #444; padding: 10px; text-align: center; }
  input, select { padding: 5px; margin: 5px; }
  button { padding: 6px 12px; }
</style>
</head>
<body>

<h1 style="text-align:center;">Tier List PvP Editable</h1>

<table id="playersTable">
  <thead>
    <tr>
      <th>Jugador</th>
      <th>Puntos</th>
      <th>Tier</th>
      <th>Acción</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

<div style="text-align:center; margin-top:20px;">
  <input type="text" id="nameInput" placeholder="Nombre jugador" />
  <input type="number" id="pointsInput" placeholder="Puntos" />
  <select id="tierSelect">
    <option value="S">S</option>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
    <option value="D">D</option>
  </select>
  <button onclick="addPlayer()">Añadir jugador</button>
</div>

<script>
let players = [];

function renderTable() {
  const tbody = document.querySelector('#playersTable tbody');
  tbody.innerHTML = '';
  players.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.points}</td>
      <td>${p.tier}</td>
      <td><button onclick="removePlayer(${i})">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function addPlayer() {
  const name = document.getElementById('nameInput').value.trim();
  const points = Number(document.getElementById('pointsInput').value);
  const tier = document.getElementById('tierSelect').value;

  if (!name || isNaN(points)) {
    alert('Por favor completa todos los campos correctamente.');
    return;
  }

  players.push({name, points, tier});
  renderTable();
  document.getElementById('nameInput').value = '';
  document.getElementById('pointsInput').value = '';
}

function removePlayer(index) {
  players.splice(index, 1);
  renderTable();
}

renderTable();
</script>

</body>
</html>
