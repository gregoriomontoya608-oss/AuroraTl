const USER="Curado"
const PASS="Aurora123"

const tierOrder=[
"HT1","LT1","LT2","HT2","HT3","LT3","HT4","LT4","HT5","LT5"
]

let players = JSON.parse(localStorage.getItem("players")) || []

let admin=false

function login(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

if(u===USER && p===PASS){

admin=true

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

list.forEach((p,index)=>{

let tiers=""

p.tiers.forEach((t,i)=>{

let color="tier"

if(t.includes("HT")) color="tier ht"
if(t==="LT3"||t==="LT4"||t==="LT5") color="tier high"

tiers+=`<div class="${color}">${t}</div>`

if(admin){

tiers+=`

<button onclick="tierUp(${index},${i})">⬆</button>
<button onclick="tierDown(${index},${i})">⬇</button>
<button onclick="editTier(${index},${i})">✏</button>

`

}

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

function tierUp(p,t){

let index=tierOrder.indexOf(players[p].tiers[t])

if(index>0){

players[p].tiers[t]=tierOrder[index-1]

}

save()
render()

}

function tierDown(p,t){

let index=tierOrder.indexOf(players[p].tiers[t])

if(index<tierOrder.length-1){

players[p].tiers[t]=tierOrder[index+1]

}

save()
render()

}

function editTier(p,t){

let newTier=prompt("Nuevo tier")

if(tierOrder.includes(newTier)){

players[p].tiers[t]=newTier

save()
render()

}

}

function searchPlayer(){

let text=document.getElementById("search").value.toLowerCase()

let filtered=players.filter(p=>p.nick.toLowerCase().includes(text))

render(filtered)

}

render()
