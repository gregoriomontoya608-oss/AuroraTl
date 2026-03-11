const USER="Curado"
const PASS="Aurora123"

let currentMode="overall"
let admin=false

let players=JSON.parse(localStorage.getItem("players"))||[]

function login(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

if(u===USER && p===PASS){

admin=true

document.getElementById("addBtn").classList.remove("hidden")

render()

alert("Admin activado")

}else{

alert("incorrecto")

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

Object.keys(p.tiers||{}).forEach(mode=>{

let tier=p.tiers[mode]

let color=tier.toLowerCase().includes("ht")?"ht":"lt"

tiersHTML+=`<div class="tier ${color}"><span class="modeName">${mode}</span> ${tier}</div>`

})

}else{

if(!p.tiers[currentMode]) return

let tier=p.tiers[currentMode]

let color=tier.toLowerCase().includes("ht")?"ht":"lt"

tiersHTML=`<div class="tier ${color}"><span class="modeName">${currentMode}</span> ${tier}</div>`

}

container.innerHTML+=`

<div class="player">

<div class="left">

<img class="skin" src="https://mc-heads.net/avatar/${p.nick}">
<div>${p.nick}</div>

</div>

<div class="tiers">${tiersHTML}</div>

${admin?`

<div class="adminButtons">

<button onclick="editTier('${p.nick}')">✏</button>
<button onclick="deleteTier('${p.nick}')">❌</button>
<button onclick="deletePlayer('${p.nick}')">🗑</button>

</div>

`:""}

</div>

`

})

}

function addTier(){

let nick=prompt("Nick jugador")

let mode=prompt("Modo (vanilla uhc nether smp sword mace)")

let tier=prompt("Tier (HT1 LT1 etc)")

if(!nick||!mode||!tier) return

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

players=players.filter(p=>p.nick!==nick)

save()

render()

}

function deleteTier(nick){

let mode=prompt("Modalidad a borrar")

let player=players.find(p=>p.nick===nick)

if(!player||!player.tiers[mode]) return

delete player.tiers[mode]

save()

render()

}

function editTier(nick){

let mode=prompt("Modalidad")

let tier=prompt("Nuevo tier")

let player=players.find(p=>p.nick===nick)

if(!player) return

player.tiers[mode]=tier

save()

render()

}

function searchPlayer(){

let text=document.getElementById("search").value.toLowerCase()

const container=document.getElementById("players")

container.innerHTML=""

players.filter(p=>p.nick.toLowerCase().includes(text)).forEach(p=>{

container.innerHTML+=`

<div class="player">

<div class="left">

<img class="skin" src="https://mc-heads.net/avatar/${p.nick}">
<div>${p.nick}</div>

</div>

</div>

`

})

}

render()
