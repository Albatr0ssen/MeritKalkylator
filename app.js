let courseList, courseAmount = 0;
let allIDs = [];
let main = document.getElementById("main");

async function KursKod(subject){
    const response = await fetch('./courseCodes.json');
    const data = await response.json();
    let kursKod;
    for(x in data.kurs){
        if(data.kurs[x].klass == subject){
            kursKod = data.kurs[x].kod;
        } 
    }
    return kursKod;
}

async function ProgramData(program) {
    const response = await fetch('./courses.json');  
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

async function CalcGenerator(program, focus){
    CalcStartup();
    let data = await ProgramData(program);
    courseList.innerHTML += '<h3 class="year">År 1</h3>';
    await GenerateSubjects(data, "År1");
    courseList.innerHTML += '<h3 class="year">År 2</h3>';
    if(program == "Teknik"){
        await GenerateSubjects(data, "År2");
        courseList.innerHTML += '<h3 class="year">År 3</h3>';
        if(focus == "Civil"){
            await GenerateSubjects(data, "År3Civil");
        }
        else if(focus == "Spel"){
            await GenerateSubjects(data, "År3Spel");
        }
    } 
    else if(program == "IT"){
        if(focus == "BackEnd"){
            await GenerateSubjects(data, "År2BackEnd");
            courseList.innerHTML += '<h3 class="year">År 3</h3>';
            await GenerateSubjects(data, "År3BackEnd");
        }
        else if(focus == "Infra"){
            await GenerateSubjects(data, "År2Infra");
            courseList.innerHTML += '<h3 class="year">År 3</h3>';
            await GenerateSubjects(data, "År3Infra");
        }
    } 
    else if(program == "Design"){
        if(focus == "Motion"){
            await GenerateSubjects(data, "År2Motion");
            courseList.innerHTML += '<h3 class="year">År 3</h3>';
            await GenerateSubjects(data, "År3Motion");
        }
        else if(focus == "Visual"){
            await GenerateSubjects(data, "År2Visual");
            courseList.innerHTML += '<h3 class="year">År 3</h3>';
            await GenerateSubjects(data, "År3Visual");
        }
    }
    for(let x = 0; x< allIDs.length; x++){
        for(let y = 0; y < 6; y++){
            let id = allIDs[x][1][y];
            document.getElementById(id).addEventListener("click", ()=>{
                if(allIDs[x][2] == null){
                    allIDs[x][2] = id;
                }
                else{
                    for(let z = 0; z < allIDs[x][1].length;z++){                        
                        if(allIDs[x][2] == allIDs[x][1][z]){
                            document.getElementById(allIDs[x][1][z]).classList.remove("selected");
                            document.getElementById(allIDs[x][1][z]).classList.add("not-selected");
                            allIDs[x][2] = id;
                        }
                    }         
                }
                console.log(id);
                document.getElementById(id).classList.remove("not-selected");
                document.getElementById(id).classList.add("selected");
            });
        }
    }   
}

async function GenerateSubjects(data, dataSet){
    let courseInfo = data[dataSet];
    for(let x = 0; x < courseInfo.length;x++){
        let klass = courseInfo[x].klass;
        let poäng = courseInfo[x].poäng;
        if(x == 0){
            await CreateSubject(klass,poäng,true);
        }
        else{
            await CreateSubject(klass,poäng);
        }
    }
}

async function CreateSubject(subject, points, first){
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
    `   
    let betygLista = ["A","B","C","D","E","F"];
    kursKod = await KursKod(subject);
    allIDs.push(["",[], null]);
    allIDs[courseAmount][0] = kursKod;
    for(let x = 0; x < 6 ; x++){
        let currentId = kursKod + betygLista[x];
        allIDs[courseAmount][1].push(currentId);
        classDiv += '<button type="button" id="' + currentId + '" class="grade-letter not-selected">' + betygLista[x] + '</button>';
    }
    classDiv += '</div></div>';
    courseList.innerHTML += classDiv;
    courseAmount += 1;
}

function SubMenu(choice){
    main.classList.remove("main-menu");
    main.classList.add("sub-menu");
    if(choice == "Teknik"){
        main.innerHTML = 
        `
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:CalcGenerator('Teknik','Civil')">
                <span class="image-text">ENGINEERING</span>
                <img src="img/teknik.png" alt="Bild av matematik/fysik som representerar Engineering inriktningen">
            </a>
        </div>
        <div></div>
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:CalcGenerator('Teknik','Spel')">
                <span class="image-text rows2">SOFTWARE DEVELOPMENT</span>      
                <img src="" alt="Bild av * som representerar Software Development inriktningen">
            </a>
        </div>
        `;
    }
    else if(choice == "IT"){
        main.innerHTML = 
        `
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:CalcGenerator('IT','BackEnd')">
                <span class="image-text backend">BACK END</span>      
                <img src="" alt="Bild av servrar som representerar IT-programet">
            </a>
        </div>
        <div></div>
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:CalcGenerator('IT','Infra')">
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
            <a class="image-zoom" href="javascript:CalcGenerator('Design','Motion')">
                <span class="image-text rows2">MOTION <br> GRAPHICS</span>
                <img src="img/teknik.png" alt="Bild av matematik/fysik som representerar Teknik-programet">
            </a>
        </div>
        <div></div>
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:CalcGenerator('Design','Visual')">
                <span class="image-text rows2">VISUAL <br> COMMUNICATIONS</span>      
                <img src="" alt="Bild av servrar som representerar IT-programet">
            </a>
        </div>
        `;
    }
}