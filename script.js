let USER="admin"
let PASS="aurora"

let admin=false

let mode="overall"

let players=[]


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


function setMode(m){

mode=m

render()

}


function addPlayer(){

if(!admin){

alert("Solo admin")

return

}

let nick=prompt("Nick jugador")

let m=prompt("Modo (vanilla/uhc/nethpot/smp/sword/mace/mazo)")

let tier=prompt("Tier (HT1 LT1 HT2 LT2 HT3 LT3 HT4 LT4 HT5 LT5)")

players.push({nick,mode:m,tier})

render()

}


function changeTier(i){

if(!admin)return

let tier=prompt("Nuevo tier")

players[i].tier=tier

render()

}


function deletePlayer(i){

if(!admin)return

players.splice(i,1)

render()

}


function searchPlayer(){

render()

}


function render(){

let container=document.getElementById("players")

container.innerHTML=""

let search=document.getElementById("search").value.toLowerCase()

players.forEach((p,i)=>{

if(mode!="overall" && p.mode!=mode)return

if(!p.nick.toLowerCase().includes(search))return

let div=document.createElement("div")

div.className="player"

div.innerHTML=`

<div>

<b>${p.nick}</b>

<br>

${p.mode}

</div>

<div class="tier ${p.tier.toLowerCase()}">

${p.tier}

</div>

<div class="controls">

${admin?`<button onclick="changeTier(${i})">EDIT</button>
<button onclick="deletePlayer(${i})">X</button>`:""}

</div>

`

container.appendChild(div)

})

}
