const BASE_URL = "http://localhost:3000"


export class Personne{
    constructor(FirstName, LastName,Email,Password,Role){
        this.FirstName=FirstName
        this.LastName=LastName
        this.Email=Email
        this.Password=Password
        this.Role = Role
    } 
    // CheckRole(){
    //     let UserRole = "";
    //     if(this.Role == "Teacher") UserRole = "Teacher"
    //     else if(this.Role == "Student") UserRole = "Student"
    //     return UserRole
    // }
    GetOnePersonne(Role,Id){
        let Result = fetch(`${BASE_URL}/${Role}/${Id}`).then(response => response.json())
        return Result;
    }
    GetPersonne(Role){
        let Result = fetch(`${BASE_URL}/${Role}`).then(response => response.json())
        return Result;
    }
    AddPersonne(){
        const Data = {
            FirstName:this.FirstName,
            LastName:this.LastName,
            Email:this.Email,
            Password:this.Password
        }
        axios.post(`${BASE_URL}/${this.Role}`,Data)
    }
    UpdatePersonne(Id){
        const Data = {
            FirstName:this.FirstName,
            LastName:this.LastName,
            Email:this.Email,
            Password:this.Password
        }
        axios.put(`${BASE_URL}/${this.Role}/${Id}`,Data)
    }
    DeletePersonne(Role,Id) {
        axios.delete(`${BASE_URL}/${Role}/${Id}`)
        console.log(Id)
    }
}


export class Subject{
    constructor(Type,Name,Child,ParentId){
        this.Type = Type
        this.Name = Name
        this.Child = Child
        this.ParentId = ParentId
    } 
    GetParentSubject(){
        let Result = fetch(`${BASE_URL}/Subject`).then(response => response.json())
        return Result;
    }
    GeOneParentSubject(Id){
        let Result = fetch(`${BASE_URL}/Subject/${Id}`).then(response => response.json())
        return Result;
    }
    async AddNewSubject(){
        const Data = {
            Type: this.Type,
            Name: this.Name,
            Child: [],
            ParentId : this.ParentId
        }
        console.log(Data)
        const Subject = await axios.post(`${BASE_URL}/Subject`,Data)
        return Subject;
    }
    UpdateSubject(Id){
        const Data = {
            Type: this.Type,
            Name: this.Name,
            Child: this.Child,
            ParentId : this.ParentId
        }
        axios.put(`${BASE_URL}/Subject/${Id}`,Data)
    }
    DeleteSubject(Id){
        axios.delete(`${BASE_URL}/Subject/${Id}`)
    }
}

export class Level{

    constructor(Name,Min,Max){
        this.Name = Name;
        this.Min = Min
        this.Max = Max
    }
    getAllLevels(){
        let Result = fetch(`${BASE_URL}/Levels`).then(response => response.json())
        return Result;
    }
    GetOneLevel(Id){
        let Result = fetch(`${BASE_URL}/Levels/${Id}`).then(response => response.json())
        return Result;
    }
    UpdateLevel(Id){
        const Data = {
            Name: this.Name,
            Min: this.Min,
            Max: this.Max,
        }
        axios.put(`${BASE_URL}/Levels/${Id}`,Data)
    }
}

export class Question{
    constructor(Name,subject,Difficuty,Point,Reponses){
        this.Name = Name;
        this.subject = subject
        this.Difficuty = Difficuty
        this.Point = Point
        this.Reponses = Reponses
    }

    async getAllQuestion(){
        const Question = await axios.get(`${BASE_URL}/Question`)
        return Question;
    }
    async AddQuestion(){
        const Data = {
            "Subject":this.subject,
            "Difficuty":this.Difficuty,
            "Point":this.Point,
            "Name":this.Name,
            "Reponses":this.Reponses
        }
        const Question = await axios.post(`${BASE_URL}/Question`,Data)
        return Question
    }
}