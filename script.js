let USER="admin"
let PASS="aurora"

let admin=false
let currentMode="overall"

let players = JSON.parse(localStorage.getItem("auroraPlayers")) || []

const tierPoints={

"LT5":1,
"HT5":2,
"LT4":3,
"HT4":5,
"LT3":10,
"HT3":13,
"LT2":15,
"HT2":20,
"LT1":25,
"HT1":30

}

function savePlayers(){
localStorage.setItem("auroraPlayers",JSON.stringify(players))
}

function toggleLogin(){
document.getElementById("loginBox").classList.toggle("hidden")
}

function login(){

let u=document.getElementById("user").value
let p=document.getElementById("pass").value

if(u===USER && p===PASS){

admin=true

document.getElementById("addBtn").classList.remove("hidden")

render()

}

}

function setMode(mode){

currentMode=mode
render()

}

function addPlayer(){

if(!admin) return

let nick=prompt("Nick jugador")
if(!nick) return

let mode=prompt("Modo (sword/uhc/vanilla/smp/nethpot/mace/axe)").toLowerCase()
if(!mode) return

let tier=prompt("Tier (HT1 LT1 HT2 LT2 HT3 LT3 HT4 LT4 HT5 LT5)").toUpperCase()
if(!tier) return

let player=players.find(p=>p.nick.toLowerCase()==nick.toLowerCase())

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

savePlayers()
render()

}

function deletePlayer(index){

if(!admin) return

players.splice(index,1)

savePlayers()
render()

}

function deleteTier(playerIndex,mode){

if(!admin) return

delete players[playerIndex].tiers[mode]

savePlayers()
render()

}

function getPoints(player){

let total=0

for(let mode in player.tiers){

let tier=player.tiers[mode]

if(tierPoints[tier]){
total+=tierPoints[tier]
}

}

return total

}

function tierColor(tier){

if(tier=="HT1") return "#ff4d4d"
if(tier=="LT1") return "#ff7a7a"

if(tier=="HT2") return "#ff944d"
if(tier=="LT2") return "#ffb366"

if(tier=="HT3") return "#ffd700"
if(tier=="LT3") return "#ffe066"

if(tier=="HT4") return "#66ccff"
if(tier=="LT4") return "#99ddff"

if(tier=="HT5") return "#aaaaaa"
if(tier=="LT5") return "#777777"

return "white"

}

function render(){

let container=document.getElementById("players")
container.innerHTML=""

let search=document.getElementById("search").value.toLowerCase()

let sorted=[...players]

if(currentMode=="overall"){
sorted.sort((a,b)=>getPoints(b)-getPoints(a))
}

sorted.forEach((p,index)=>{

if(!p.nick.toLowerCase().includes(search)) return

let tierHTML=""

for(let mode in p.tiers){

if(currentMode!="overall" && currentMode!=mode) continue

let tier=p.tiers[mode]
let color=tierColor(tier)

tierHTML+=`<span style="color:${color};font-weight:bold">
${tier} ${mode.toUpperCase()} </span>`

if(admin){
tierHTML+=` <button onclick="deleteTier(${players.indexOf(p)},'${mode}')">❌</button>`
}

tierHTML+=" "

}

if(tierHTML==="") return

let medal=""

if(currentMode=="overall"){
if(index==0) medal="🥇"
if(index==1) medal="🥈"
if(index==2) medal="🥉"
}

let div=document.createElement("div")
div.className="player"

div.innerHTML=`

<div class="playerInfo">

<div class="skinBox">
<img src="https://mc-heads.net/avatar/${p.nick}/40" class="head">
<img src="https://mc-heads.net/body/${p.nick}/120" class="skin">
</div>

<b>${medal} ${p.nick}</b>

</div>

<div class="tiers">

${tierHTML}

${currentMode=="overall" ? "<span class='points'>"+getPoints(p)+" pts</span>" : ""}

</div>

${admin ? `<button onclick="deletePlayer(${players.indexOf(p)})">Delete</button>` : ""}

`

container.appendChild(div)

})

}

render()

