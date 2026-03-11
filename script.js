let USER="admin"
let PASS="aurora"

let admin=false

let currentMode="overall"

let players=[

{
nick:"Curada",
tiers:{
sword:"HT1",
uhc:"LT1"
}
}

]


function toggleLogin(){

document.getElementById("loginBox").classList.toggle("hidden")

}


function login(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

if(u===USER && p===PASS){

admin=true

document.getElementById("addBtn").classList.remove("hidden")

alert("Admin activado")

render()

}else{

alert("Datos incorrectos")

}

}


function setMode(mode){

currentMode=mode

render()

}


function addPlayer(){

if(!admin)return

let nick=prompt("Nick jugador")

let mode=prompt("Modo (sword/uhc/vanilla/smp/nethpot/mace/mazo)")

let tier=prompt("Tier (HT1 LT1 HT2 LT2 HT3 LT3 HT4 LT4 HT5 LT5)")

let player=players.find(p=>p.nick==nick)

if(player){

player.tiers[mode]=tier

}else{

let obj={

nick:nick,

tiers:{}

}

obj.tiers[mode]=tier

players.push(obj)

}

render()

}


function render(){

let container=document.getElementById("players")

container.innerHTML=""

let search=document.getElementById("search").value.toLowerCase()

players.forEach((p)=>{

if(!p.nick.toLowerCase().includes(search))return

let tierList=""

for(let mode in p.tiers){

if(currentMode!="overall" && currentMode!=mode) continue

tierList+=p.tiers[mode]+" "+mode.toUpperCase()+" | "

}

if(tierList==="") return

tierList=tierList.slice(0,-3)

let div=document.createElement("div")

div.className="player"

div.innerHTML=`

<div class="playerInfo">

<img src="https://crafatar.com/avatars/${p.nick}?size=40&overlay" class="head">

<b>${p.nick}</b>

</div>

<div class="tiers">

${tierList}

</div>

`

container.appendChild(div)

})

}

render()
