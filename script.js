const leftDoor = document.getElementsByClassName("left")[0]
const rightDoor = document.getElementsByClassName("right")[0]
const startMovingButton = document.getElementsByClassName("go")[0]
const openDoor = document.getElementsByClassName("open")[0]
const closeDoor = document.getElementsByClassName("close")[0]
const floorNums = document.getElementsByClassName("floor-number")
const lift = document.getElementsByClassName('lift')[0]
let floorArray = []
let nowFloor = 1

function doorClose() {
    return new Promise((res,rej)=>{
        let marginLeftValue = parseInt(window.getComputedStyle(rightDoor).marginLeft)

        const id =  setInterval(() => {
            if (marginLeftValue >=0) {
                marginLeftValue--
                rightDoor.style.marginLeft = marginLeftValue + "px"
            }else{
                clearInterval(id)
            }
        }, 10)
    })


}

function doorOpen(){
    return new Promise((res,rej)=> {
        let marginLeftValue = parseInt(window.getComputedStyle(rightDoor).marginLeft)

        const id = setInterval(() => {
            if (marginLeftValue <= 100) {
                marginLeftValue++
                rightDoor.style.marginLeft = marginLeftValue + "px"
            } else {
                clearInterval(id)
            }
        }, 10)
    })
}

openDoor.addEventListener("click",()=>doorOpen())

closeDoor.addEventListener("click",()=>doorClose())

for (let i = 0; i < floorNums.length; i++) {
    floorNums[i].addEventListener("click",function (){
        if (!floorArray.includes(floorNums[i].innerText)){
            floorArray.push(floorNums[i].innerText)
            floorArray.sort()
        }

    })
}

let bottom = parseInt(window.getComputedStyle(lift).bottom)
function changeFloor(number){
    return new Promise((res,rej)=>{

        if(nowFloor<number){
            const up = setInterval(function (){
                if (bottom <=number*11){
                    bottom++
                    lift.style.bottom = bottom + "vh"
                }else{
                    clearInterval(up)
                }
            },50)
        }

        if (nowFloor>number){
            const down = setInterval(function (){
                if (bottom >=number*11){
                    bottom--
                    lift.style.bottom = bottom + "vh"
                }else{
                    clearInterval(down)
                }
            },50)
        }
        nowFloor = number
    })

}

changeFloor(7)