let courseList;
let main = document.getElementById("main");

async function FetchData(program) {
    const response = await fetch('./classes.json');  
    const data = await response.json();
    if(program == "Teknik"){
        return data.Teknik;
    }
    else if(program == "IT"){
        return data.IT;
    }
    else if(program == "Design"){
        return data.Design;
    }
}
function CalcStartup(){
    main.classList.remove("sub-menu");
    main.classList.add("calculator");
    main.innerHTML = '<div class="column2" id="class-list"></div>';
    courseList = document.getElementById("class-list");
}

async function GeneratorCalc(program, focus){   
    CalcStartup();
    let data = await FetchData(program);
    courseList.innerHTML += '<h3 class="year">År 1</h3>';
    GenerateSubjects(data, "År1");
    courseList.innerHTML += '<h3 class="year">År 2</h3>';
    if(program == "Teknik"){
        GenerateSubjects(data, "År2");
        courseList.innerHTML += '<h3 class="year">År 3</h3>';
        if(focus == "Civil"){
            GenerateSubjects(data, "År3Civil");
        }
        else if(focus == "Spel"){
            GenerateSubjects(data, "År3Spel");
        }
    } 
    else if(program == "IT"){
        if(focus == "BackEnd"){
            GenerateSubjects(data, "År2BackEnd");
            courseList.innerHTML += '<h3 class="year">År 3</h3>';
            GenerateSubjects(data, "År3BackEnd");
        }
        else if(focus == "Infra"){
            GenerateSubjects(data, "År2Infra");
            courseList.innerHTML += '<h3 class="year">År 3</h3>';
            GenerateSubjects(data, "År3Infra");
        }
    } 
    else if(program == "Design"){
        if(focus == "Motion"){
            GenerateSubjects(data, "År2Motion");
            courseList.innerHTML += '<h3 class="year">År 3</h3>';
            GenerateSubjects(data, "År3Motion");
        }
        else if(focus == "Visual"){
            GenerateSubjects(data, "År2Visual");
            courseList.innerHTML += '<h3 class="year">År 3</h3>';
            GenerateSubjects(data, "År3Visual");
        }
    }     
}

function GenerateSubjects(data, dataSet){
    let obj = data[dataSet];
    for(let x = 0; x < obj.length;x++){
        let objKlass = obj[x].klass;
        let objPoäng = obj[x].poäng;
        if(x == 0){
            CreateSubject(objKlass,objPoäng,true);
        }
        else{
            CreateSubject(objKlass,objPoäng);
        }
    }
}

function CreateSubject(subject, points, first){
    if(first == true){
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

function SubMenu(choice){
    main.classList.remove("main-menu");
    main.classList.add("sub-menu");
    if(choice == "Teknik"){
        main.innerHTML = 
        `
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:GeneratorCalc('Teknik','Civil')">
                <span class="image-text">ENGINEERING</span>
                <img src="img/teknik.png" alt="Bild av matematik/fysik som representerar Engineering inriktningen">
            </a>
        </div>
        <div></div>
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:GeneratorCalc('Teknik','Spel')">
                <span class="image-text rows2">SOFTWARE DEVELOPMENT</span>      
                <img src="img/average-spelelev.png" alt="Bild av * som representerar Software Development inriktningen">
            </a>
        </div>
        `;
    }
    else if(choice == "IT"){
        main.innerHTML = 
        `
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:GeneratorCalc('IT','BackEnd')">
                <span class="image-text backend">BACK END</span>      
                <img src="img/average-spelelev.png" alt="Bild av servrar som representerar IT-programet">
            </a>
        </div>
        <div></div>
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:GeneratorCalc('IT','Infra')">
                <span class="image-text">INFRASTRUCTURE</span>
                <img src="img/teknik.png" alt="Bild av * som representerar Teknik-programet">
            </a>
        </div>
        `;
    }
    else if(choice == "Design"){
        main.innerHTML = 
        `
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:GeneratorCalc('Design','Motion')">
                <span class="image-text rows2">MOTION <br> GRAPHICS</span>
                <img src="img/teknik.png" alt="Bild av matematik/fysik som representerar Teknik-programet">
            </a>
        </div>
        <div></div>
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:GeneratorCalc('Design','Visual')">
                <span class="image-text rows2">VISUAL <br> COMMUNICATIONS</span>      
                <img src="img/average-spelelev.png" alt="Bild av servrar som representerar IT-programet">
            </a>
        </div>
        `;
    }
}