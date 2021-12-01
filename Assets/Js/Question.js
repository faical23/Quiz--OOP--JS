import  {Subject,Level,Question} from "./AllClass.js"

// QUESTION DATA
let IdSubjectChose = '' ///
let QuestionName = '' ////
let LevelQuestion = ''
let Point = ''
let ReponseQuestion = []
let QuestionIncrument = 1


let NumberNested = 0
let FatherIdSubjectId = 0
let StoreObject = ''
const GetAllElementInload = async () =>{
    let SubjectPlace = document.querySelector('.QuestionPage__Question')
    let SubjectHave = document.querySelectorAll('.SubjectTitleclick')
    let subject = new Subject()
    let AllSubject = await subject.GetParentSubject()
    SubjectHave.forEach(Element =>{
        Element.addEventListener('click', async ()=>{
            IdSubjectChose = Element.getAttribute('data-type')
            // console.log(IdSubjectChose)
            let NesteSubject = document.querySelector('.NestedSubject')
            let NewNested = ''
            NumberNested > 0 ? 
            NewNested = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 12l-4-4v3H3v2h15v3l4-4z"/></svg>
            <h2>${Element.innerHTML}</h2>`
            :
            NewNested = `<h2>${Element.innerHTML}</h2>`
            NesteSubject.innerHTML += NewNested
            SubjectPlace.innerHTML = ''
            let subject = new Subject()
            let ParentSubject = await subject.GeOneParentSubject(Element.getAttribute('data-type'))
            FatherIdSubjectId = ParentSubject.id
            ParentSubject.Child.length > 0 ? 
            ParentSubject.Child.forEach(Element =>{
                const AllChildFiltred  = AllSubject.filter(Child => Child.id == Element);
                let NewChild = 
                `
                    <div class="TeacherWeHave SubjectWeHave" >
                        <p class="SubjectTitleclick" data-type="${AllChildFiltred[0].id}">${AllChildFiltred[0].Name}</p>
                    </div>
                `
                SubjectPlace.innerHTML += NewChild
            })
            : SubjectPlace.innerHTML = `<h1 class="NotHasChild">Not Has A child</h1>`
            GetAllElementInload()
            NumberNested++;
        })
    })
    return AllSubject
}

const GetAllSubject = async () =>{
    let SubjectPlace = document.querySelector('.QuestionPage__Question')
    SubjectPlace.innerHTML = ''
    let subject = new Subject()
    let AllSubject = await subject.GetParentSubject()
    const AllSubjectFiltred  = AllSubject.filter(Subject => Subject.Type == "Parent");
    AllSubjectFiltred.forEach(Element=>{
        let NewSubject = 
        `
            <div class="TeacherWeHave SubjectWeHave" >
                <p class="SubjectTitleclick" data-type="${Element.id}">${Element.Name}</p>
            </div>
        `
        SubjectPlace.innerHTML += NewSubject
    })
    GetAllElementInload()
}
GetAllSubject()

const GetLevelWeHave = async () =>{
    let LevelWeHave = new Level();
    let Leveles =  await LevelWeHave.getAllLevels()
    let LevelZone = document.querySelector('.form-select')
    LevelZone.innerHTML = ''
    Leveles.forEach(Element=>{
        LevelZone.innerHTML += 
        `
            <option class="LevelsingleHave" value="${Element.id}">${Element.Name}</option>
        `
    })
    document.querySelector('.form-select').addEventListener('change',(e)=>{
            LevelQuestion = e.target.value
            // console.log(LevelQuestion)
    })
    // console.log(Leveles)
}
GetLevelWeHave() 

document.querySelector('.NewReponse').addEventListener('click',()=>{
    QuestionIncrument++
    let NewReponse = 
    ` 
        <div class="ReponseQuestion">
            <div class="SingleReponse">
                    <h4>Reponse ${QuestionIncrument}</h4>
                    <input type="text" placeholder="Reponse" class="SingleReponse__Reponse">
            </div>
            <div class="SingleStatus">
                <h4>Status ${QuestionIncrument}</h4>
                <select class="form-select" aria-label="Default select example">
                    <option value="true">True</option>
                    <option value="false">false</option>
                </select>
            </div>
        </div>
    `
    document.querySelector('.AllResponseQuestion').innerHTML += NewReponse
})


document.querySelector(".AdminePage__AddTeacher").addEventListener('click',()=>{
    QuestionName = document.querySelector('.Question').value + " ?"
    QuestionName
    Point = document.querySelector('.QuestionPoint').value
    document.querySelectorAll('.ReponseQuestion').forEach(Reponse =>{
        let ReponseInput = Reponse.querySelector('.SingleReponse__Reponse').value
        let ReponseStatus = Reponse.querySelector('.form-select').value
        let ReponseWeHave ={"Reponse": ReponseInput,"Status": ReponseStatus}
        ReponseQuestion.push(ReponseWeHave)
    })
    let NewQuestion =  new Question(QuestionName,IdSubjectChose,LevelQuestion,Point,ReponseQuestion)
    NewQuestion.AddQuestion()

})


const GetALLQuestion = async () =>{
    let QuestionHave = new Question()
    let QuestionWeHave = await QuestionHave.getAllQuestion()
    QuestionWeHave.data.forEach(Element=>{
        document.querySelector('.QuestionWeHave').innerHTML += 
        `    <div class="TeacherWeHave SubjectWeHave QuestionWeHave" >
                <p class="SubjectTitleclick">${Element.Name}</p>
            </div>
        
        `
    })
}
GetALLQuestion()