state1=""
state2=""
//state3=""

function showDog1(){
  fetch('http://dog.ceo/api/breeds/image/random')
  .then(response => {
    return response.json() })
    .then(respJson =>{
    state1 = respJson.message.split("/")[5]
    console.log(respJson.message)
    console.log(state1)
    document.getElementById('dog1')
    .src = respJson.message
    document.getElementById('dog1h')
    .innerHTML = state1
  })
  .catch (error => console.log("ERROR"+error))

  detWinFail()
}

function showDog2(){

  fetch('http://dog.ceo/api/breeds/image/random')
  .then(response => {
    return response.json() })
    .then(respJson =>{
    state2 = respJson.message.split("/")[5]
    console.log(respJson.message)
    console.log(state2)
    document.getElementById('dog2')
    .src = respJson.message
    document.getElementById('dog2h')
    .innerHTML = state2
  })
  .catch (error => console.log("ERROR"+error))

  detWinFail()
}

/*function showDog3(){
  fetch('http://dog.ceo/api/breeds/image/random')
  .then(response => {
    return response.json() })
    .then(respJson =>{
    state3 = respJson.message.split("/")[5]
    console.log(respJson.message)
    console.log(state3)
    document.getElementById('dog3')
    .src = respJson.message
    document.getElementById('dog3h')
    .innerHTML = state3
  })
  .catch (error => console.log("ERROR"+error))

  detWinFail()
}*/

function detWinFail(){
  message = "Fail..."
  if((state1 === state2)){
    message = "Win..."
  }
  document.getElementById('winOrFail')
  .innerHTML = message
}


function showDogsAtFirst(){
  console.log("getting dogs...")
  document.getElementById('button1')
  .onclick= showDog1
  document.getElementById('button2')
  .onclick= showDog2
  //document.getElementById('button3')
  //.onclick= showDog3
  showDog1()
  showDog2()
  //showDog3()
  //detWinFail()
}

document.addEventListener("DOMContentLoaded", showDogsAtFirst)
