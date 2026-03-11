const ADMIN_PASSWORD = "AuroraAdmin123"

let players = JSON.parse(localStorage.getItem("aurora_players")) || []

function login(){

const pass=document.getElementById("adminPass").value

if(pass===ADMIN_PASSWORD){

document.getElementById("adminControls").classList.remove("hidden")
document.getElementById("loginPanel").style.display="none"

}else{

alert("Contraseña incorrecta")

}

}

function save(){
localStorage.setItem("aurora_players",JSON.stringify(players))
}

function getIcon(mode){

if(mode==="Mazo") return "⚒"
if(mode==="Diapot") return "🧪"
if(mode==="Sword") return "⚔"
if(mode==="CPvP") return "🛡"
if(mode==="Nethepot") return "🔥"
if(mode==="UHC") return "❤"
if(mode==="SMP") return "🌍"

}

function render(){

const container=document.getElementById("players")
container.innerHTML=""

players.forEach((p,index)=>{

let tiersHTML=""

p.tiers.forEach(t=>{

tiersHTML+=`<div class="tier">${t.mode} ${t.tier}</div>`

})

container.innerHTML+=`

<div class="player">

<div class="left">

<img class="skin" src="https://mc-heads.net/avatar/${p.nick}">

<div class="name">${p.nick}</div>

</div>

<div class="modes">
${tiersHTML}
</div>

<button class="delete" onclick="removePlayer(${index})">Eliminar</button>

</div>

`

})

}

function addTier(){

const nick=document.getElementById("nick").value
const tier=document.getElementById("tier").value
const mode=document.getElementById("mode").value

if(nick==="") return

let player=players.find(p=>p.nick.toLowerCase()===nick.toLowerCase())

if(!player){

player={
nick:nick,
tiers:[]
}

players.push(player)

}

player.tiers.push({mode,tier})

save()
render()

}

function removePlayer(i){

players.splice(i,1)

save()
render()

}

render()
