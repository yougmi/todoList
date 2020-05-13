/*=======================================================================================================================*/
/*================================================================CLOCK==================================================*/
const CLOCK_CONTENT = document.querySelector(".ygm-clock"),
      CLOCK_TXT = CLOCK_CONTENT.querySelector(".ygm-clock-txt");

// 시간 가져오는 함수
function getTime () { 
    const DATE = new Date(),
          HOURS = DATE.getHours(),
          MINUTES = DATE.getMinutes(),
          SECONDS = DATE.getSeconds();
    CLOCK_TXT.innerText = `${HOURS < 10 ? `0${HOURS}` : HOURS} : ${MINUTES < 10 ? `0${MINUTES}` : MINUTES} : ${SECONDS < 10 ? `0${SECONDS}` : SECONDS}`;
}


/*==========================================================================================================================*/
/*==================================================================GRETTING================================================*/
const FORM = document.querySelector(".ygm-form"),
      FORM_INPUT = FORM.querySelector("input"),
      GRETTING = document.querySelector(".ygm-grettings");

const USER_LS = "currentUser",
      SHOWING_CN = "showing";

// 사용자 입력 이름 로컬스토리지에 저장 함수
function saveName (text) {
    localStorage.setItem(USER_LS,text);
}

// name input enter시 처리하는 함수
function handleSubmit (event) {
    event.preventDefault();
    const CURRENT_VALUE = FORM_INPUT.value;
    painGretting(CURRENT_VALUE);
    saveName(CURRENT_VALUE);
}

function askForName () {
    FORM.classList.add(SHOWING_CN);
    FORM.addEventListener("submit", handleSubmit); // input enter 눌렀을시 이벤트 
}

// 인사말 텍스트 리턴 함수
function painGretting (text) {
    FORM.classList.remove(SHOWING_CN);
    GRETTING.classList.add(SHOWING_CN);
    GRETTING.innerText = `Hello ${text}`;
} 
// 로드 했을 때 함수 
function loadName () {
    const CURRENT_USER = localStorage.getItem(USER_LS);
    // 사용자 입력 이름 유무에 따른 조건문
    if(CURRENT_USER === null) { // CURRENT_USER 없는 경우 
        askForName();
    } else { // CURRENT_USER 있는 경우
        painGretting(CURRENT_USER); 
    }
}


/*==========================================================================================================================*/
/*====================================================================TODO==================================================*/
const TODO_FORM = document.querySelector(".ygm-toDoForm"),
      TODO_INPUT = TODO_FORM.querySelector("input"),
      TODO_LIST = document.querySelector(".ygm-toDoList");

const TODOS_LS = "toDos";

let TODOS = [];

// todo li 지우는 함수
function deleteToDo (event) {
    // console.dir(event.target);
    const BTN = event.target;
    const LI = BTN.parentNode;
    // 해당 버튼의 li 마크업 삭제
    TODO_LIST.removeChild(LI);
    // 해당 li를 제외한 리스트만 리턴 
    const CLEAN_TODOS = TODOS.filter(function(toDo){
        return toDo.id !== parseInt(LI.id);
    });
    // 해당 선택 li를 제외한 todo리스트 TODOS 변수에 재 대입
    TODOS = CLEAN_TODOS 
    saveToDos(); // 로컬 스토리지에 저장
} 

// TODOS를 가져와 로컬에 저장하는 함수
function saveToDos () {
    localStorage.setItem(TODOS_LS, JSON.stringify(TODOS));
}

// 입력 todo 리스트 화면에 출력하는 함수 
function paintToDo (text) {
    const LI = document.createElement("li"),
          DEL_BTN = document.createElement("button"),
          SPAN = document.createElement("span"),
          NEW_ID = TODOS.length +1;
    DEL_BTN.innerText = "X";
    DEL_BTN.addEventListener("click", deleteToDo)
    SPAN.innerText = text;
    LI.appendChild(SPAN);
    LI.appendChild(DEL_BTN);
    LI.id = NEW_ID;
    TODO_LIST.appendChild(LI);

    const TODO_OBJ = { text: text, id: NEW_ID }
    TODOS.push(TODO_OBJ)
    saveToDos();
}

// todo input enter시 처리하는 함수
function toDoHandleSubmit (event) {
    event.preventDefault();
    const CURRENT_VALUE = TODO_INPUT.value;
    paintToDo(CURRENT_VALUE);
    TODO_INPUT.value = "";
}

// todo 로드 했을 때 함수 
function loadToDos () {
    const LOAD_TODOS = localStorage.getItem(TODOS_LS);
    // 로컬스토리지에 todo 리스트가 있을경우 조건문
    if (LOAD_TODOS !== null) {
        const PARSED_TODOS = JSON.parse(LOAD_TODOS);
        PARSED_TODOS.forEach(function (toDo){
            paintToDo(toDo.text);
        })
    } 
}

/*==========================================================================================================================*/
/*==================================================================BACKGROUND================================================*/
const BODY = document.querySelector("body");

const IMG_NUMBER = 3;

// 이미지 화면 출력 함수
function paintImage (imgNumber) {
    const IMAGE = new Image();
    IMAGE.src = `./images/img_background_${imgNumber + 1}.jpg`;
    IMAGE.classList.add("bgImage");
    BODY.appendChild(IMAGE);
}

// 랜덤 숫자 리턴 함수
function genRandom () {
    const NUMBER = Math.floor(Math.random() * IMG_NUMBER);
    return NUMBER;
}

/*==========================================================================================================================*/
/*====================================================================INIT==================================================*/
function init () {
    getTime(); // 시간 가져오는 함수
    setInterval (getTime , 1000); // 시계 초 단위로 반복 실행
    loadName(); // name 로드 했을 때 함수 
    loadToDos(); // todo 로드 했을 때 함수 
    TODO_FORM.addEventListener("submit", toDoHandleSubmit); // todo input enter 시 실행 
    /*background*/
    const RANDOM_NUMBER = genRandom();
    paintImage(RANDOM_NUMBER);
}
init();