import  {Subject} from "./AllClass.js"

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
                        <img data-type="${AllChildFiltred[0].id}" class="DeleteImg" src="./Assets/Img/supprimer.png" alt="">
                        <img data-type="${AllChildFiltred[0].id}" class="UpdateImg" src="./Assets/Img/Update.png" alt="">

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
    document.querySelectorAll('.DeleteImg').forEach(Element =>{
        Element.addEventListener('click', async ()=>{
            let SubjectObject = new Subject()
            SubjectObject.DeleteSubject(Element.getAttribute('data-type'))
            let ParentObject = await SubjectObject.GeOneParentSubject(FatherIdSubjectId)
            let NewChild = ParentObject.Child.filter(Child => Child !=  Element.getAttribute('data-type'));
            let SubjectUpdated = new Subject(ParentObject.Type,ParentObject.Name,NewChild,ParentObject.ParentId)
            SubjectUpdated.UpdateSubject(FatherIdSubjectId)
        })
    })
    document.querySelectorAll('.UpdateImg').forEach(Element =>{
        Element.addEventListener('click', async ()=>{
            let SubjectObject = new Subject()
            let ObjectClicked = await SubjectObject.GeOneParentSubject(Element.getAttribute('data-type'))
            document.querySelector('.SubjectName').value = ObjectClicked.Name
            document.querySelector('.FirstBtns').style='display: none'
            document.querySelector('.SecondBtns').style='display: flex !important'
            StoreObject = ObjectClicked
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
                <img data-type="${Element.id}" class="DeleteImg" src="./Assets/Img/supprimer.png" alt="">
                <img data-type="${Element.id}" class="UpdateImg" src="./Assets/Img/Update.png" alt="">

                <p class="SubjectTitleclick" data-type="${Element.id}">${Element.Name}</p>
            </div>
        `
        SubjectPlace.innerHTML += NewSubject
    })
    GetAllElementInload()
}
GetAllSubject()


document.querySelector('.AdminePage__AddTeacher').addEventListener('click', async()=>{
    let NewSubjectAdded = document.querySelector('.SubjectName').value
    let Type = ''
    let Child = []
    FatherIdSubjectId == 0 ? Type = 'Parent' : Type = 'Child' 
    let NewSubject = new Subject(Type,NewSubjectAdded,Child,FatherIdSubjectId)
    let ObjectWillBeAdded = await NewSubject.AddNewSubject()
    let ParentObject = await NewSubject.GeOneParentSubject(FatherIdSubjectId)
    ParentObject.Child.push(ObjectWillBeAdded.data.id)
    let SubjectUpdated = new Subject(ParentObject.Type,ParentObject.Name,ParentObject.Child,ParentObject.ParentId)
    SubjectUpdated.UpdateSubject(FatherIdSubjectId)
    console.log(ParentObject.Child)
})
document.querySelector('.AdminePage__Cancel').addEventListener('click',()=>{
    document.querySelector('.SubjectName').value = ''
    document.querySelector('.FirstBtns').style='display: flex !important'
    document.querySelector('.SecondBtns').style='display: none !important'
})
document.querySelector('.UpdateSjt').addEventListener('click',()=>{
    console.log(StoreObject)
    let NewName =document.querySelector('.SubjectName').value
    let SubjectUpdated = new Subject(StoreObject.Type,NewName,StoreObject.Child,StoreObject.ParentId)
    SubjectUpdated.UpdateSubject(StoreObject.id)
})
