let subjectList = document.getElementById("class-list");
let classDiv;

createSubject();

function createSubject(){
    console.log("yo")
    classDiv = '<div class="class">';
    classDiv += '<div class="class-name flex-center">';
    classDiv += '<span>Engelska 5 <br> 100 Poäng</span>';
    classDiv += '</div>';
    classDiv += '<div class="flex-center">';
    classDiv += '<button class="grade-letter">A</button>';
    classDiv += '<button class="grade-letter">B</button>';
    classDiv += '<button class="grade-letter">C</button>';
    classDiv += '<button class="grade-letter">D</button>';
    classDiv += '<button class="grade-letter">E</button>';
    classDiv += '<button class="grade-letter">F</button>';
    classDiv += '</div>';
    classDiv += '</div>';

    for(let x = 0; x < 15; x++){
        subjectList.innerHTML += classDiv;
    }
}



/*
<div class="class"> 
    <div class="class-name flex-center">
        <span>Engelska 5 <br> 100 Poäng</span> 
    </div>
    <div class="flex-center">
        <button class="grade-letter">A</button>
        <button class="grade-letter">B</button>
        <button class="grade-letter">C</button>
        <button class="grade-letter">D</button>
        <button class="grade-letter">E</button>
        <button class="grade-letter">F</button>
    </div>
</div>
/*/