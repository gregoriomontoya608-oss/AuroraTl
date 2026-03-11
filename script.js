const USER="Curado"
const PASS="Aurora123"

let currentMode="overall"
let admin=false

let players = JSON.parse(localStorage.getItem("players")) || []

const icons={
vanilla:"icons/vanilla.png",
uhc:"icons/uhc.png",
nether:"icons/nether.png",
smp:"icons/smp.png",
sword:"icons/sword.png",
mace:"icons/mace.png"
}

function login(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

if(u===USER && p===PASS){

admin=true
document.getElementById("addBtn").classList.remove("hidden")
document.getElementById("modeSelect").classList.remove("hidden")

render()

alert("Admin activado")

}else{

alert("Datos incorrectos")

}

}

function save(){
localStorage.setItem("players",JSON.stringify(players))
}

function changeMode(mode){

currentMode=mode

document.querySelectorAll(".mode").forEach(m=>m.classList.remove("active"))

event.target.classList.add("active")

render()

}

function render(){

const container=document.getElementById("players")

container.innerHTML=""

players.forEach(p=>{

let tiersHTML=""

if(currentMode==="overall"){

Object.keys(p.tiers || {}).forEach(mode=>{

tiersHTML+=`

<div class="badge">
<img class="modeIcon" src="${icons[mode]}">
${p.tiers[mode]}
</div>

`

})

}else{

if(!p.tiers || !p.tiers[currentMode]) return

tiersHTML=`

<div class="badge">
<img class="modeIcon" src="${icons[currentMode]}">
${p.tiers[currentMode]}
</div>

`

}

container.innerHTML+=`

<div class="player">

<div class="left">

<img class="skin" src="https://mc-heads.net/avatar/${p.nick}">
<div class="name">${p.nick}</div>

</div>

<div class="tiers">

${tiersHTML || "Sin tiers"}

</div>

${admin ? `
<div class="adminButtons">

<button onclick="editTier('${p.nick}')">✏</button>
<button onclick="deleteTier('${p.nick}')">❌</button>
<button onclick="deletePlayer('${p.nick}')">🗑</button>

</div>
` : ""}

</div>

`

})

}

function addTier(){

let nick=prompt("Nick jugador")
if(!nick) return

let tier=prompt("Tier (HT1 LT1 etc)")
if(!tier) return

let mode=document.getElementById("modeSelect").value

let player=players.find(p=>p.nick===nick)

if(!player){

player={nick:nick,tiers:{}}
players.push(player)

}

player.tiers[mode]=tier

save()
render()

}

function deletePlayer(nick){

players = players.filter(p => p.nick !== nick)

save()
render()

}

function deleteTier(nick){

let mode=currentMode

let player=players.find(p=>p.nick===nick)

if(!player || !player.tiers[mode]) return

delete player.tiers[mode]

save()
render()

}

function editTier(nick){

let mode=currentMode

let newTier = prompt("Nuevo tier")

let player=players.find(p=>p.nick===nick)

if(!player) return

player.tiers[mode]=newTier

save()
render()

}

function searchPlayer(){

let text=document.getElementById("search").value.toLowerCase()

const container=document.getElementById("players")
container.innerHTML=""

players
.filter(p=>p.nick.toLowerCase().includes(text))
.forEach(p=>{

container.innerHTML+=`

<div class="player">

<div class="left">

<img class="skin" src="https://mc-heads.net/avatar/${p.nick}">
<div class="name">${p.nick}</div>

</div>

</div>

`

})

}

render()
