import {Personne}  from "./AllClass.js"
let PathUrl = document.URL
let Role = ''
PathUrl.includes("Teacher")  ? Role = 'Teacher' : Role = 'Student'


const GetAllTeacher = async () =>{
    var TeacherPlace = document.querySelector('.AdminePage__Right')
    TeacherPlace.innerHTML = ''
    let Personne_1 = new Personne()
    let TeacherWeHave = await Personne_1.GetPersonne(Role)
    console.log(TeacherWeHave)
    TeacherWeHave.forEach(Element=>{
        let NewTeacher = 
        `
            <div class="TeacherWeHave" data-type="${Element.id}">
                <img data-type="${Element.id}" class="DeleteImg" src="./Assets/Img/supprimer.png" alt="">
                <p>${Element.FirstName}</p>
            </div>
        `
        TeacherPlace.innerHTML += NewTeacher
    })
    document.querySelectorAll('.DeleteImg').forEach(Element =>{
        Element.addEventListener('click', async ()=>{
            let Personne_1 = new Personne()
            Personne_1.DeletePersonne(Role,Element.getAttribute('data-type'))
        })
    })
    document.querySelectorAll('.TeacherWeHave').forEach(Element =>{
        Element.addEventListener('click', async ()=>{
            document.querySelector('.AdminePage__UpdateTeacher').style = 'display:block !important'
            document.querySelector('.AdminePage__Cancel').style = 'display:block !important'
            document.querySelector('.AdminePage__AddTeacher').style = 'display:none !important'
            let Personne_1 = new Personne()
            let ThisTeacher = await Personne_1.GetOnePersonne(Role,Element.getAttribute('data-type'))
            document.querySelector('.Id').value = ThisTeacher.id
            document.querySelector('.FirstName').value = ThisTeacher.FirstName
            document.querySelector('.LastName').value = ThisTeacher.LastName
            document.querySelector('.Email').value = ThisTeacher.Email
            document.querySelector('.Password').value = ThisTeacher.Password
        })
    })
}
GetAllTeacher()

const GetFormData = () =>{
    let Data = {
        Id : document.querySelector('.Id').value,
        FirstName : document.querySelector('.FirstName').value,
        LastName : document.querySelector('.LastName').value,
        Email : document.querySelector('.Email').value,
        Password : document.querySelector('.Password').value
    }
    return Data
}

document.querySelector('.AdminePage__AddTeacher').addEventListener("click" ,function(e){
    e.preventDefault()
    let Data = GetFormData()
    if(Data.FirstName != '' && Data.LastName != '' && Data.Email != '' && Data.Password != ''){
        let Personne_2 = new Personne(Data.FirstName, Data.LastName,Data.Email,Data.Password,Role)
        Personne_2.AddPersonne()
    }
})

document.querySelector('.AdminePage__UpdateTeacher').addEventListener("click" ,function(e){
    let Data = GetFormData()
    console.log(Data)
    if(Data.FirstName != '' && Data.LastName != '' && Data.Email != '' && Data.Password != ''){
        let Personne_2 = new Personne(Data.FirstName, Data.LastName,Data.Email,Data.Password,Role)
        Personne_2.UpdatePersonne(Data.Id)
    }
})

document.querySelector('.AdminePage__Cancel').addEventListener('click',()=>{
    document.querySelector('.AdminePage__UpdateTeacher').style = 'display:none !important'
    document.querySelector('.AdminePage__Cancel').style = 'display:none !important'
    document.querySelector('.AdminePage__AddTeacher').style = 'display:block !important'
})


