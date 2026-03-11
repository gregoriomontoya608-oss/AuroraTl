const USER="Curado"
const PASS="kleiver"

let players = JSON.parse(localStorage.getItem("players")) || []

function login(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

if(u===USER && p===PASS){

document.getElementById("addBtn").classList.remove("hidden")

alert("Admin activado")

}else{

alert("Datos incorrectos")

}

}

function save(){

localStorage.setItem("players",JSON.stringify(players))

}

function render(list=players){

const container=document.getElementById("players")

container.innerHTML=""

list.forEach(p=>{

let tiers=""

p.tiers.forEach(t=>{

let color="tier"

if(t.includes("HT")) color="tier ht"
if(t==="LT3"||t==="LT4"||t==="LT5") color="tier high"

tiers+=`<div class="${color}">${t}</div>`

})

container.innerHTML+=`

<div class="player">

<div class="left">

<img class="skin" src="https://mc-heads.net/avatar/${p.nick}">
<div class="name">${p.nick}</div>

</div>

<div>

${tiers}

</div>

</div>

`

})

}

function addTier(){

let nick=prompt("Nick jugador")

let tier=prompt("Tier")

let player=players.find(p=>p.nick===nick)

if(!player){

player={nick:nick,tiers:[]}

players.push(player)

}

player.tiers.push(tier)

save()
render()

}

function searchPlayer(){

let text=document.getElementById("search").value.toLowerCase()

let filtered=players.filter(p=>p.nick.toLowerCase().includes(text))

render(filtered)

}

render()
