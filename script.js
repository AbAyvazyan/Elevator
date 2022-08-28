const leftDoor = document.getElementsByClassName("left")[0]
const rightDoor = document.getElementsByClassName("right")[0]
const startMovingButton = document.getElementsByClassName("go")[0]
const openDoor = document.getElementsByClassName("open")[0]
const closeDoor = document.getElementsByClassName("close")[0]
const floorNums = document.getElementsByClassName("floor-number")
const lift = document.getElementsByClassName('lift')[0]
let floorArray = []
let arrayForAwhile = []
let nowFloor = 1
let onMove = false

function doorClose() {

    if (onMove){
        return false
    }

    return new Promise((res,rej)=>{
        let marginLeftValue = parseInt(window.getComputedStyle(rightDoor).marginLeft)

        const id =  setInterval(() => {
            if (marginLeftValue >=0) {
                marginLeftValue--
                rightDoor.style.marginLeft = marginLeftValue + "px"
            }else{
                res()
                clearInterval(id)
            }
        }, 10)
    })


}

function doorOpen(){

    if (onMove){
        return false
    }

    return new Promise((res,rej)=> {
        let marginLeftValue = parseInt(window.getComputedStyle(rightDoor).marginLeft)

        const id = setInterval(() => {
            if (marginLeftValue <= 100) {
                marginLeftValue++
                rightDoor.style.marginLeft = marginLeftValue + "px"
            } else {
                res()
                clearInterval(id)
            }
        }, 10)
    })
}

openDoor.addEventListener("click",()=>doorOpen())

closeDoor.addEventListener("click",()=>doorClose())

for (let i = 0; i < floorNums.length; i++) {
    floorNums[i].addEventListener("click",function () {

        if (!onMove || (onMove && floorArray[floorArray.length-1]-this.innerText<nowFloor+this.innerText)) {
            if (!floorArray.includes(floorNums[i].innerText) && nowFloor !== this.innerText) {

                if (nowFloor < this.innerText) {
                    floorArray.push(this.innerText)
                    floorArray.sort()
                } else {
                    floorArray.push(this.innerText)
                    floorArray.sort((a, b) => b - a)
                }
            }
        }else{
    if (!arrayForAwhile.includes(floorNums[i].innerText) && nowFloor !== this.innerText) {

        if (this.innerText < floorArray[floorArray.length-1] && nowFloor < this.innerText) {
            arrayForAwhile.push(this.innerText)
            arrayForAwhile.sort()
        } else {
            arrayForAwhile.push(this.innerText)
            arrayForAwhile.sort((a, b) => b - a)
        }

    }
}
    })
}


let bottom = parseInt(window.getComputedStyle(lift).bottom)
function changeFloor(number){

    return new Promise((res,rej)=>{

    if(nowFloor < number)
        {
            onMove = true
            const up = setInterval(function () {
                if (bottom <= (number - 1) * 12.5) {
                    bottom++
                    lift.style.bottom = bottom + "vh"
                } else {
                    nowFloor = +number
                    onMove = false
                    res()
                    clearInterval(up)
                }
            }, 50)
        }

        if (nowFloor > number) {
            onMove = true
            const down = setInterval(function () {
                if (bottom >= (number - 1) * 12.5) {
                    bottom--
                    lift.style.bottom = bottom + "vh"
                } else {
                    nowFloor = +number
                    onMove = false
                    res()
                    clearInterval(down)
                }
            }, 50)
        }

    })
}

startMovingButton.addEventListener("click", function ab(){

    if (onMove){
        return false
    }


     changeFloor(floorArray.shift()).then(()=> {
         doorOpen().then(()=>{
             doorClose().then(()=>{

                 floorArray.push(...arrayForAwhile)
                 arrayForAwhile = []
                 ab()
             })
         })
     })
})