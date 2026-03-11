const USER="Curado"
const PASS="Aurora123"

let currentMode="overall"

let players = JSON.parse(localStorage.getItem("players")) || []

let admin=false

function login(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

if(u===USER && p===PASS){

admin=true

document.getElementById("addBtn").classList.remove("hidden")
document.getElementById("modeSelect").classList.remove("hidden")

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

players.forEach((p,index)=>{

let tier=p.tiers[currentMode]

if(!tier) return

let color="tier"

if(tier.includes("HT")) color="tier ht"
if(tier==="LT3"||tier==="LT4"||tier==="LT5") color="tier high"

container.innerHTML+=`

<div class="player">

<div class="left">

<img class="skin" src="https://mc-heads.net/avatar/${p.nick}">
<div class="name">${p.nick}</div>

</div>

<div class="${color}">
${tier}
</div>

</div>

`

})

}

function addTier(){

let nick=prompt("Nick jugador")

let tier=prompt("Tier")

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

function searchPlayer(){

let text=document.getElementById("search").value.toLowerCase()

let filtered=players.filter(p=>p.nick.toLowerCase().includes(text))

renderFiltered(filtered)

}

function renderFiltered(list){

const container=document.getElementById("players")

container.innerHTML=""

list.forEach(p=>{

let tier=p.tiers[currentMode]

if(!tier) return

container.innerHTML+=`

<div class="player">

<div class="left">

<img class="skin" src="https://mc-heads.net/avatar/${p.nick}">
<div class="name">${p.nick}</div>

</div>

<div class="tier">
${tier}
</div>

</div>

`

})

}

render()
