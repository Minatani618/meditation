
const circle = document.getElementById("circle");
const startButton = document.getElementById("startButton");
const audioCount1=document.getElementById("count1");
const audioCount2=document.getElementById("count2");
let meditating=false;
let timeoutID=""

var circleStyle = window.getComputedStyle(circle).width;


//吸う・吐くモードの切り替え登録
const setModeChangeTime=(ms)=>{
    return new Promise((resolve, reject) => {
        timeoutID= setTimeout(() => {
            circle.classList.toggle("expanding");
            circle.classList.toggle("shrinking");
            resolve();
        }, ms);
    })
}

const start = async ()=>{
    startButton.onclick=()=>stop();
    startButton.textContent="とめる";
    meditating=true;

    //吸うモードからスタート
    circle.classList.add("expanding");

    //吸う・吐くモードの切り替えループ
    while(meditating){
        await setModeChangeTime(6000); //吸うモードから吐くモードへの切り替え
        if(!meditating) break;
        audioCount2.play();
        await setModeChangeTime(8000); //吐くモードから吸うモードへの切り替え
        if(!meditating) break;
        audioCount2.play();
    }
}

const stop = ()=>{
    circle.classList.remove("expanding");
    circle.classList.remove("shrinking");
    clearTimeout(timeoutID);
    meditating=false;
    startButton.onclick=()=>start();
    startButton.textContent="はじめる";
}

startButton.onclick=()=>start();
