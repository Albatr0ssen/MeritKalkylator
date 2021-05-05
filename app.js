let courseList, classDiv, classData;
let main = document.getElementById("main");

async function FetchData(program, fokus) {
    const response = await fetch('./classes.json');  
    const data = await response.json();
    if(program == "teknik"){
        return data.Teknik;
    }
}

function SubMenu(choice){
    if(choice == "Teknik"){
    main.classList.remove("main-menu");
    main.classList.add("sub-menu");
        main.innerHTML = 
        `
        <div class="button background-zoom">
            <a href="javascript:TeknikCalc('Spel')">
                <img src="img/teknik-background.jpg" alt="Bild av matematik/fysik som representerar Teknik-programet">
            </a>
        </div>
        <div></div>
        <div class="button background-zoom">
            <a href="javascript:TeknikCalc('Civil')">'   
                <img src="img/average-spelelev.png" alt="Bild av servrar som representerar IT-programet">
            </a>
        </div>
        `
    }
    else if(choice == "IT"){

    }
    else if(choice == "Design"){

    }
}

function CalcStartup(){
    main.classList.remove("sub-menu");
    main.classList.add("calculator");
    main.innerHTML = '<div class="column2" id="class-list"></div>';
    courseList = document.getElementById("class-list");

}

async function TeknikCalc(){
    CalcStartup();
    let data = await FetchData("teknik");
    console.log(data);
    courseList
    courseList.innerHTML += '<h3 class="year">År 1</h3>';
    for(let x = 0; x < data.År1.length;x++){
        CreateSubject(data.År1[x].klass, data.År1[x].poäng); 
    }
    courseList.innerHTML += '<h3 class="year">År 2</h3>';
    for(let x = 0; x < data.År2.length;x++){
        CreateSubject(data.År2[x].klass,data.År2[x].poäng)
    }
    courseList.innerHTML += '<h3 class="year">År 3</h3>';
    for(let x = 0; x < data.År3Civ.length;x++){
        CreateSubject(data.År3Civ[x].klass,data.År3Civ[x].poäng)
    }
}

function ITCalc(){
    CalcStartup();
    CreateSubject(); 
}   

function CreateSubject(subject, points){
    if(subject == "Svenska 1" || subject == "Svenska 2" || subject == "Svenska 3"){
        classDiv = '<div class="courses mainbg">';
    }
    else{
        classDiv = '<div class="courses mainbg no-top">';
    }
    classDiv += 
    `
        <div class="course mainbg">
            <span class="course-name mainbg">` + subject + `</span>
            <span class="course-points mainbg">` + points + ` Poäng</span>
        </div>
        <div class="flex-center mainbg" >
            <button class="grade-letter">A</button>
            <button class="grade-letter">B</button>
            <button class="grade-letter">C</button>
            <button class="grade-letter">D</button>
            <button class="grade-letter">E</button>
            <button class="grade-letter">F</button>
        </div>
    </div>
    `
    courseList.innerHTML += classDiv;
}

let test = {test: 
`
<div class="button background-zoom">
    <a href="javascript:SubMenu('IT')">'   
        <img src="img/it-background.jpg" alt="Bild av servrar som representerar IT-programet">
    </a>
</div>
<div></div>
<div class="button background-zoom">
    <a href="javascript:SubMenu('Teknik')">
        <span>TEKNIK</span>
        <img src="img/teknik-background.jpg" alt="Bild av matematik som representerar Teknik-programet">
    </a>
</div> 
`
}

console.log(test.test);