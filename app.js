"use strict";
let courseList, courseAmount = 0, eventGenerated = false;
let allIDs = [];
let main = document.getElementById("main");

async function KursKod(subject){
    const response = await fetch('./courseCodes.json');
    const data = await response.json();
    let kursKod;
    if(subject != undefined){
        
        for(let x in data.kurs){
            if(data.kurs[x].klass == subject){
                kursKod = data.kurs[x].kod;
            } 
        }
        return kursKod;
    }
    return data.kurs;
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

async function CalcGenerator(program, focus){
    //Förbreder inför generationen av kurser
    main.classList.remove("sub-menu");
    main.classList.add("calculator");
    document.getElementsByTagName("body")[0].classList.add("test");
    main.innerHTML = '<div class="column2" id="class-list"></div>';
    courseList = document.getElementById("class-list");
    let data = await ProgramData(program);
    let kursKoder = await KursKod();
    // Genererar alla klasser till program och inriktning
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
    
    //Genererar meritvalet
    let classDiv = '';
    classDiv +=
    `
    <h3 class="year"></h3>
    <div  class="courses mainbg">
        <div class="course mainbg">
            <span class="course-name mainbg">Meritpoäng</span>
        </div>
        <div id="MERIT" class="flex-center mainbg">
        
    `
    let meritLista = [0,0.5,1,1.5,2,2.5];
    allIDs.push(["",[], null]);
    allIDs[courseAmount][0] = 'MERIT';
    for(let x = 0; x < 6 ; x++){
        let currentId = allIDs[courseAmount][0] + meritLista[x];
        allIDs[courseAmount][1].push(currentId);
        classDiv += '<button type="button" id="' + currentId + '" class="grade-letter not-selected">' + meritLista[x] + '</button>';
    }
    courseAmount += 1;
    classDiv += '</div></div>'

    //Genererar 'räkna' knappen
    classDiv += 
    `
    <div class="flex-center">
        <a href="#merit-result"id="CALCULATE" class=" calculate-button not-selected">
            RÄKNA UT
        </a>
    </div>
    <div id="merit-result" class="flex-center">
    </div>
    `
    courseList.innerHTML += classDiv;  
    document.getElementById('CALCULATE').addEventListener("click", ()=>{ 
        let meritVärde = 0, notPicked = [];
        allIDs.forEach(course => {
            if(course[2] == null){
                notPicked.push(course[0]);
                document.getElementById("merit-result").innerHTML = '<span class="din-merit">Allt är inte ifyllt!</span>'
            }
        })
        if(notPicked.length == 0){
            //Räknar ut merit
            let betygPoäng = [20,17.5,15,12.5,10,0];
            let meritPoäng = [0,0.5,1,1.5,2,2.5];
            let kursPoäng = 0;
            for(let i = 0; i < allIDs.length;i++){
                for(let j = 0; j < 6; j++){
                    if(allIDs[i][2] == allIDs[i][1][j]){
                        for(let k = 0; k < kursKoder.length; k++){
                            if(kursKoder[k].kod == allIDs[i][0]){
                                kursPoäng += betygPoäng[j]*kursKoder[k].poäng;
                            }
                        }           
                    }
                }
            }
            meritVärde = kursPoäng/2400;
            for(let i = 0; i < 6; i++){
                if(allIDs[allIDs.length-1][2] == allIDs[allIDs.length-1][1][i]){
                    meritVärde += meritPoäng[i];
                }
            }
            document.getElementById("merit-result").innerHTML = 
            `
            <span class="din-merit">DIN MERIT ÄR: ` + meritVärde.toFixed(1) + `</span>
            `
            GenerateEventListeners();
        }
        else{
            notPicked.forEach(id => {
                document.getElementById(id).classList.add("select-now");
            })
        }
    });
    GenerateEventListeners();
}

function GenerateEventListeners(){
    
    //Skapar en eventlistener för varje val och väljer/avväljer när betyg/merit trycks
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
                document.getElementById(allIDs[x][0]).classList.remove("select-now")
                document.getElementById(id).classList.remove("not-selected");
                document.getElementById(id).classList.add("selected");
            });
        }
    } 
    eventGenerated = true;
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
    let betygLista = ["A","B","C","D","E","F"];
    let kursKod = await KursKod(subject);
    let classDiv;
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
        <div id="` + kursKod + `" class="flex-center mainbg"> 
    `   
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
                <img src="img/Software.png" alt="Bild av tv-spelet fortnite som representerar Software Development inriktningen">
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
                <img src="img/BackEnd.png" alt="Bild av node-js logga som representerar Back-End-inriktningen">
            </a>
        </div>
        <div></div>
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:CalcGenerator('IT','Infra')">
                <span class="image-text">INFRASTRUCTURE</span>
                <img src="img/Infrastructure.png" alt="Bild av LAN som representerar Infrastructure-inriktningen">
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
                <img src="img/Motion.png" alt="Bild av en 2d-person som representerar Motion Graphics-inriktningen">
            </a>
        </div>
        <div></div>
        <div class="button background flex-center">
            <a class="image-zoom" href="javascript:CalcGenerator('Design','Visual')">
                <span class="image-text rows2">VISUAL <br> COMMUNICATIONS</span>      
                <img src="img/Visual.png" alt="Bild av en fotograf som representerar Visual Communcations-inrktningen">
            </a>
        </div>
        `;
    }
}

async function GotoMainMenu(){
    if(allIDs.length > 0){
        if(await confirm("Är du säker? Din nuvarande val kommer gå förlorade.")){
            window.location.href = "index.html";
        }
    }
    window.location.href = "index.html";
}