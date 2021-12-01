import {Level} from './AllClass.js'

let LevelIdClicked = 'ABC';
const GetAllLveles = async() =>{
    let MyLevel = new Level();
    let AllLevelsHave = await MyLevel.getAllLevels()
    console.log(AllLevelsHave)
    AllLevelsHave.forEach(level =>{
        document.querySelector('.AdmineLevel').innerHTML += 
        `
            <div class="Level">
                <h1>${level.Name}</h1>
                <img class="UpdateLevel" data-type="${level.id}" src="./Assets/Img/Update1.png" alt="">
            </div>
        `
    })
    document.querySelectorAll('.UpdateLevel').forEach(level =>{
        level.addEventListener('click', async()=>{
            LevelIdClicked = level.getAttribute('data-type')
            console.log(LevelIdClicked)
            document.querySelector('.LevelClicked').style='display:block'
            let LevelClick = new Level();
            let DataLevel = await LevelClick.GetOneLevel(level.getAttribute('data-type'))
            document.querySelector('.TitleLevele').innerHTML= DataLevel.Name
            document.querySelector('.MinPoint').value=DataLevel.Min
            document.querySelector('.MaxPoint').value=DataLevel.Max

        })
    })
    
}
GetAllLveles()

document.querySelector('.UpdateLevelFunction').addEventListener('click', ()=>{
    let Name = document.querySelector('.TitleLevele').innerHTML
    let Min = document.querySelector('.MinPoint').value
    let Max = document.querySelector('.MaxPoint').value
    console.log(Min,Max,LevelIdClicked,Name)
    let UpdateLevelCicked = new Level(Name,Min,Max)
    UpdateLevelCicked.UpdateLevel(LevelIdClicked)
    
})