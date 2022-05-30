//GLOBAL VARIABLES STUDENT = GVS
//Current number of rows
var GVSdefaultRow = 0;
//CurrentIndexPage global
var GVSIndexPage = 0;

//Get the total length of table
var GVSAccLength = 0;

//JSON global results variable
var GVSResults = {};

//JSON global result sorted variable
var GVSResultsSorted = {};

//Check if already sorted
var GVSIsSorted = false;
//Default number of row global
var GVSNumRows = 0;

//If the default row is less than 10
var GVSLessThanRow = 0;

//Get desired number of row per page
var GVSRowPerPage = 0;

//NextPage Call
const nextpageCall = function nextPageCall(){

    if(((GVSAccLength - GVSdefaultRow) < 10) && GVSLessThanRow === 0){
      console.log("LOL")
        GVSLessThanRow = GVSAccLength - GVSdefaultRow;
        GVSdefaultRow += GVSLessThanRow;
        bindAllDataIntoTable();
    }
    console.log("LMAo")
    console.log("next page GVSdefaultRow: "+GVSdefaultRow +" GVSAccLength:"+GVSAccLength+" GVSIndexPage:" +GVSIndexPage +" <= GVSRowPerPage:"+GVSRowPerPage);
    if(GVSdefaultRow < GVSAccLength ){
       
        GVSdefaultRow += GVSRowPerPage;
        console.log("next page GVSdefaultRow:"+GVSdefaultRow)
        GVSIndexPage +=GVSRowPerPage;
        bindAllDataIntoTable();
    }
}



//PrevPage Call
const prevpageCall = function nextPageCall(){
  
    // console.log('Less than row'+GVSLessThanRow);
    if(GVSLessThanRow !== 0){
    
        GVSdefaultRow = GVSdefaultRow - GVSLessThanRow;
        GVSLessThanRow = 0;
    }
    if(GVSIndexPage >= GVSRowPerPage){
        GVSdefaultRow -= GVSRowPerPage;
        GVSIndexPage -=GVSRowPerPage;
        bindAllDataIntoTable();
    }
   
}


//Pagination buttons
nextPage = document.getElementById('nextPage');
prevPage = document.getElementById('prevPage');
page1 = document.getElementById('page1');
page2 = document.getElementById('page2');
page3 = document.getElementById('page3');
showNumberOfPage = document.getElementById('showNumberOfPage');

//Select option
selectPage = document.getElementById('selectPage');

//Eventlistener for paginatio Buttons
nextPage.addEventListener('click', nextpageCall);
prevPage.addEventListener('click', prevpageCall);
// page1.addEventListener('click', getAllData());
// page2.addEventListener('click', getAllData());
// page3.addEventListener('click', getAllData());

//Search bar
userSearchBar = document.getElementById('userSearchBar');


//JavaScript create account admin
const btnCreateUsers = document.getElementById('btnCreateUsers');
const frmCreateUsers = document.getElementById('frmCreateUsers');//form create account
const frmGradesStudents = document.getElementById('frmGradesStudents');//form create grades
const btnIsLoading = document.getElementById('btnIsLoading');//LoadingButton
const alertShowError = document.getElementById('alertError');//AlertError
const alertShowSuccess = document.getElementById('alertSuccess');//Alert Success
const btnError = document.getElementById('btnError');//Error button disabled
const btnSuccess = document.getElementById('btnSuccess');//Succes button

//Javascript edit account admin
const btnEditError = document.getElementById('btnEditError');//Error button disabled
const btnEditSuccess = document.getElementById('btnEditSuccess');//Succes button
const btnIsUpdating = document.getElementById('btnIsUpdating');//updating button


window.onload = function(){
    getAllDataAPI();
    BindAllCourse();
    selectNumPage();
}//Onload page

//getAllData Function
function getAllDataAPI(){
    //get user accounts
    fetch('../controller/student-table.php').then((res) => res.json())
    .then(response => {

        GVSResults = response;//Store the responseJSON into GVSResults global var
       
        GVSAccLength = response.length;//getThe totalLength
        GVSNumRows = 0;//Set Number of rows default
        
        let selectHolder = '';
        if(GVSAccLength >= 75){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="ALL">All</option>`;
        }else if (GVSAccLength >= 50){
           
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="ALL">All</option>`;
        }else if(GVSAccLength >= 15){
            
            selectHolder += `
            <option value="5" selected>5</option>
            <option value="10" selected>10</option>
            <option value="ALL">All</option>`;
        }else{
            //if lower than 5 rows
            selectHolder += `
            <option value="ALL" selected>All</option>`;
        }
        document.querySelector('#selectPage').innerHTML = selectHolder;// set the rows per page

        if(selectPage.value === '5'){
            GVSNumRows = 5;
            GVSRowPerPage = 5;
            GVSdefaultRow = 5;
        }else if (selectPage.value === '10'){
            GVSNumRows = 10;
            GVSRowPerPage = 10
            GVSdefaultRow = 10;
        }else if (selectPage.value === '25'){
            GVSNumRows = 25;
            GVSRowPerPage = 25;
            GVSdefaultRow = 25;
        }else{
            GVSNumRows = GVSAccLength;
            GVSRowPerPage = GVSAccLength;
            GVSdefaultRow = GVSAccLength;
        }// rows condition

        bindAllDataIntoTable();//Bind the data into table once fetch successfull
    }).catch(error => console.log(error));//end of get user accounts
}//end of function getAllDataAPI

const editProfilePic = async () =>{
    let value = document.getElementById('changePicUserID').value
    let fileupload = document.getElementById('editUserPic');// fileupload


    // Picking up files from the input .  .  .
    let files = fileupload.files;
   
    // Uploading only one file; multiple uploads are not allowed.
     let imageFile = files[0]; 
   
      // Create a FormData object.
     formData = new FormData();
   
     // Add the file to the request.
     formData.append('profileEdit', imageFile, imageFile.name);
     formData.append('userId', value);
   try{
   
   const fetchResponse = await fetch("../controller/move-only-image.php",{
       method: "POST",
       body:formData,
   });
   
   const receivedStatus = await fetchResponse.json();
   
   

   console.log(receivedStatus.statusCode)
   if(receivedStatus.statusCode === 200){
    let output = ''; 
    output += `<img src="../../uploads/${receivedStatus.image}" alt="Profile"style ="max-width:350px; max-height:350px;"/>
    `;
    document.querySelector('#changePicModalBody').innerHTML = output;
    
    let showBtn = '';
    showBtn += `<button type="button" id ="btnChangePic" class="btn btn-primary" onclick="saveChanges('`+value+`', '${receivedStatus.image}')">Save changes</button>
    <script>
    
    </script>
    `;
   document.querySelector('#showSave').innerHTML = showBtn;
   }
    

  
 
   
   }catch (e){
   console.log(e)
   }
  
}

const saveChanges = async (...params) =>{
    let btnChangePic = document.getElementById('btnChangePic');
        // Create a FormData object.
    imageformData = new FormData();
   
    imageformData.append('userId', params[0]);
    imageformData.append('Image_Url', params[1]);
    let message = '';
    try{
       const fetchResponse = await fetch("../controller/student-edit-pic.php",{
           method: "POST",
           body:imageformData,
       });
       const receivedStatus = await fetchResponse.json();

       if(receivedStatus.statusCode === 200){
         alertShowSuccess.removeAttribute("hidden");
         btnChangePic.setAttribute("disabled", "disabled");
          alertShowSuccess.classList.add('show');
          message += ` Updated Succesfully!`
        
        delayedRemoveAlert = () =>{   
            alertShowSuccess.classList.remove('show');  
            alertShowSuccess.setAttribute("hidden", "hidden");
        }
        setTimeout(delayedRemoveAlert, 3000);
      }
      document.querySelector('#alertSuccessMessage').innerHTML = message;
    }catch(e){
       console.log(e);
    }
  }

//Change Profile Picture Modal
const changePicModal =  (id) =>{
    let changePicUserID = document.getElementById('changePicUserID').value = id;

    let output = '';
    for(let i =0 ; i< GVSdefaultRow;i++ ){
        if(GVSResults[i].id == id){
            console.log("true")
            output += `<img src = "../../uploads/${GVSResults[i].profile_url} " alt="Profile" style="max-width:350px; max-height:350px;" "/>
            `;
            
            break;
        }
    }
    document.querySelector('#changePicModalBody').innerHTML = output;
}


const bindAllDataIntoTable = function (){   
    let output ='';

for(let i = GVSIndexPage; i<GVSdefaultRow; i++){
 console.log("GVSIndexPage: "+GVSIndexPage+"< GVSDefaultRow:" +GVSdefaultRow)
    output += `<tr>
    <td><a href="#" onclick= "changePicModal(${GVSResults[i].id});return false;" data-bs-toggle="modal" data-bs-target="#changeProfileModal"><img src = "../../uploads/${GVSResults[i].profile_url}" alt="Profile" height = "100px" width = "100px"/></a></td>
    <td>${GVSResults[i].studentnumber}</td>
    <td>${GVSResults[i].firstname}</td>
    <td>${GVSResults[i].middlename}</td>
    <td>${GVSResults[i].lastname}</td>
    <td>${GVSResults[i].email}</td>
    <td>${GVSResults[i].birthday}</td>
    <td>${GVSResults[i].sex}</td>
    <td>${GVSResults[i].password}</td>
    <td>${GVSResults[i].course}</td>
    <td>${GVSResults[i].section}</td>
    <td>${GVSResults[i].address}</td>
    <td>${GVSResults[i].contact}</td>
    <td>${GVSResults[i].guardian}</td>
    <td>${GVSResults[i].guardian_contact}</td>
    <td>${GVSResults[i].added_at}</td>
    <th scope="col" class="table-info">
    <div class = "pt-3">
    <a href="#" class ="btn btn-info btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserNotSorted(${GVSResults[i].id});return false;" ><i class="bi bi-eye"></i></a>

    <a href="#" class ="btn btn-secondary btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#gradesmodal" onclick ="viewGrades('${GVSResults[i].studentnumber}');return false;" ><i class="bi bi-file-text"></i></a>


    <a href="#" class ="btn btn-danger btn-sm" title = "Archived" data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToArchive('${GVSResults[i].id}', '${GVSResults[i].studentnumber}');return false;"><i class="bi bi-trash"></i></a>
    
    </div>
    </th>
    </tr>`;
    
}

let numberOfPages = '';
numberOfPages += `<h8>Showing `+GVSdefaultRow+` out of `+GVSAccLength+` results</h8>`;
document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}


//View, Edit Grades Not Sorted
const viewGrades = (studID) =>{
    for(let i =0 ; i< GVSResults.length;i++ ){
        if(GVSResults[i].studentnumber == studID){
            
            let StudNum = document.getElementById('gradesStudentNum').value = GVSResults[i].studentnumber; 
         break;
  }
 }
 gradesClick();
}

//View, Edit Grades Sorted
const viewGradesSorted = (studID) =>{
    for(let i =0 ; i< GVSNumRows;i++ ){
        if(GVSResultsSorted[i].studentnumber == studID){
            let StudNum = document.getElementById('gradesStudentNum').value = GVSResultsSorted[i].studentnumber; 
         break;
  }
 }
 bindSubjects();
}



var GVSSubjects = {};

const gradesClick = () =>{
    GetAllSubjectPerStudent();
    bindSubjects();
}
//Fill subject dropdown
const bindSubjects = async ()=>{

    //Dropdown
    const subjectsResponse = await fetch('../controller/subject-table.php');
    const getResponse = await subjectsResponse.json();
    GVSSubjects = getResponse;

    let output = '<option value="...">...</option>';

    for(let i = 0; i <getResponse.length; i++){
        output += `<option value="`+getResponse[i].subject_name+`">`+getResponse[i].subject_name+`</option>`;
    }

    document.querySelector('#gradeSubject').innerHTML = output;
}

var  objinsertSubjects ={};

// insert the updated grades of students
const insertSubjects = async (SubjectName) =>{
try{
    let gradeStudentNum = document.getElementById('gradesStudentNum').value;
    for(let i = 0; i < GVSSubjects.length; i++){
        if(SubjectName == GVSSubjects[i].subject_name){
            objinsertSubjects[0]={"studentid": gradeStudentNum};
            objinsertSubjects[0].subject_name = GVSSubjects[i].subject_name;
            objinsertSubjects[0].subject_code = GVSSubjects[i].subject_code;
            objinsertSubjects[0].units = GVSSubjects[i].units;
            objinsertSubjects[0].grade = GVSSubjects[i].grades;
            objinsertSubjects[0].instructor = GVSSubjects[i].instructor;
            objinsertSubjects[0].schedule = GVSSubjects[i].schedule;
            break;
        }
    }

}catch(e){
    alertShowError.classList.add('show');
    alertShowError.removeAttribute("hidden");
    btnError.removeAttribute("hidden");
    btnCreateUsers.style.display = "none";
    delayedAlert = () =>{
        alertShowError.classList.remove('show');
        alertShowError.setAttribute("hidden", "hidden");
        btnError.setAttribute("hidden", "hidden");//Is loading true
        btnCreateUsers.style.display = "inline-block";
    }
    setTimeout(delayedAlert, 3000);
}
     
}

const checkGradeFields = () =>{
    let gradeStudentNum = document.getElementById('gradesStudentNum').value;
    let Instructor = document.getElementById('gradesInstructor').value;
    let Schedule = document.getElementById('gradesSchedule').value;
    let Mark = document.getElementById('gradesMarks').value;
    let gradeSubject = document.getElementById('gradeSubject').value;
   
    if(gradeStudentNum !=="" && Instructor !== "" &&  Schedule !== "" && Mark !== "" && gradeSubject !=="..." ){
        btnInsertSubs();
        // GetAllSubjectPerStudent(); 
    }else{
        alertShowError.classList.add('show');
        alertShowError.removeAttribute("hidden");
        btnError.removeAttribute("hidden");
        btnCreateUsers.style.display = "none";
        delayedAlert = () =>{
            alertShowError.classList.remove('show');
            alertShowError.setAttribute("hidden", "hidden");
            btnError.setAttribute("hidden", "hidden");//Is loading true
            btnCreateUsers.style.display = "inline-block";
        }
        setTimeout(delayedAlert, 3000);
    }
}

//Insert subject into studentinfo
const btnInsertSubs = async () =>{
    let gradeStudentNum = document.getElementById('gradesStudentNum').value;
    let Instructor = document.getElementById('gradesInstructor').value;
    let Schedule = document.getElementById('gradesSchedule').value;
    let Mark = document.getElementById('gradesMarks').value;
    formData = new FormData();

    formData.append('StudentId', gradeStudentNum);
    formData.append('Subject_name', objinsertSubjects[0].subject_name);
    formData.append('Subject_code', objinsertSubjects[0].subject_code);
    formData.append('Units', objinsertSubjects[0].units);
    formData.append('Grade', Mark);
    formData.append('Instructor', Instructor);
    formData.append('Schedule', Schedule);

    const fetchResponse = await fetch("../controller/student-subject.php",{
        method: "POST",
        body:formData,
    });
    
    const getResponse = await fetchResponse.json();
    if(getResponse.statusCode === 200){
        let message = '';
        alertShowSuccess.removeAttribute("hidden");
        alertShowSuccess.classList.add('show'); 
    
        message += ` Added Succesfully!`

        document.querySelector('#alertSuccessMessage').innerHTML = message;
        refreshData = new FormData();
        refreshData.append('StudentId', gradeStudentNum);
    delayedRemoveAlert = () =>{   
        alertShowSuccess.classList.remove('show');  
        alertShowSuccess.setAttribute("hidden", "hidden");
    }
    setTimeout(delayedRemoveAlert, 3000);
    
    }
    GetAllSubjectPerStudent();
}



//Get All Subject per students
const GetAllSubjectPerStudent = async() =>{
  //refresh table
 let xgradeStudentNum = document.getElementById('gradesStudentNum').value;
 refreshData = new FormData();
 refreshData.append('StudentId', xgradeStudentNum);
 for (var pair of refreshData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
 }
 const fetchResponse = await fetch("../controller/student-subject-table.php",{
    method: "POST",
    body: refreshData,
});
 
     const tableResponse = await fetchResponse.json();
     console.log(tableResponse)
 let myTable = '';
     for(let i =0; i<tableResponse.length;i++){
         myTable += `<tr>
         <td>`+tableResponse[i].subject_name+`</td>
         <td>`+tableResponse[i].grade+`</td>
         <td>`+tableResponse[i].instructor+`</td>
         <td>`+tableResponse[i].schedule+`</td>
         <td>`+tableResponse[i].added_at+`</td>
         <th scope="col" class="table-info">
         <div class = "pt-1">
         <a href="#" class ="btn btn-danger btn-sm" title = "Archived"  onclick ="moveToArchiveSubject(`+tableResponse[i].id+`);return false;"><i class="bi bi-trash"></i></a>
         </div>
         </th>
         </tr>`;     
     }
     document.querySelector('#tbody-student-subject').innerHTML = myTable;
     delayedRemoveAlert = () =>{   
        alertShowSuccess.classList.remove('show');  
        alertShowSuccess.setAttribute("hidden", "hidden");
    }
    setTimeout(delayedRemoveAlert, 1000);
}


//Remove Subject
const moveToArchiveSubject = async (id) =>{
let RowId = id;
let removedDate = new Date();

formData = new FormData();

formData.append('RowID', RowId);
formData.append('Status',removedDate);


try{
const fetchResponse = await fetch("../controller/student-subject-remove.php",{
    method: "POST",
    body: formData,
});


const getResponse = await fetchResponse.json();
let message = '';
    if(getResponse.statusCode === 200){     
        GetAllSubjectPerStudent();
        alertShowSuccess.removeAttribute("hidden");
        alertShowSuccess.classList.add('show');
        message += ` Removed Succesfully!`
    document.querySelector('#alertSuccessMessage').innerHTML = message;
}
}catch(e){

}
}



//Sort the table
const sortCurrentTable = (headerTitle) =>{


    for(let i = 0; i<GVSNumRows; i++){
        GVSResultsSorted[i] = GVSResults[GVSIndexPage+i];
    }//Fill the GVSResultsSorted with GVSResults only needed

if(GVSIsSorted){
 
    for(let i = 0; i<GVSNumRows-1; i++){
        for(let j = 0; j<GVSNumRows-1; j++){
         if(GVSResultsSorted[j][headerTitle]> GVSResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVSResultsSorted[j].id+" > "+" b = "+GVSResultsSorted[j+1].id);
             let temp = GVSResultsSorted[j];
             GVSResultsSorted[j] = GVSResultsSorted[j+1];
             GVSResultsSorted[j+1] = temp;
      }
     }
   }
   GVSIsSorted = false;//after sorted then reverse sort
}else{
  
    for(let i = 0; i<GVSNumRows-1; i++){
        for(let j = 0; j<GVSNumRows-1; j++){
         if(GVSResultsSorted[j][headerTitle] < GVSResultsSorted[j+1][headerTitle]){
             // console.log("a = "+GVSResultsSorted[j].id+" > "+" b = "+GVSResultsSorted[j+1].id);
             let temp = GVSResultsSorted[j];
             GVSResultsSorted[j] = GVSResultsSorted[j+1];
             GVSResultsSorted[j+1] = temp;
      }
     }
   }
   GVSIsSorted = true;//after sorted then reverse sort
}
   

  
    bindAllDataIntoTableSorted();
}//Sort by id





//Bind the sorted table
const bindAllDataIntoTableSorted = function (){
    
    let output ='';
    
    for(let i = 0; i<GVSNumRows; i++){
        output += `<tr>
    <td><a href="#" onclick= "changePicModal(${GVSResultsSorted[i].id});return false;" data-bs-toggle="modal" data-bs-target="#changeProfileModal"><img src = "../../uploads/${GVSResultsSorted[i].profile_url}" alt="Profile" height = "100px" width = "100px"/></a></td>
    <td>${GVSResultsSorted[i].studentnumber}</td>
    <td>${GVSResultsSorted[i].firstname}</td>
    <td>${GVSResultsSorted[i].middlename}</td>
    <td>${GVSResultsSorted[i].lastname}</td>
    <td>${GVSResultsSorted[i].email}</td>
    <td>${GVSResultsSorted[i].birthday}</td>
    <td>${GVSResultsSorted[i].sex}</td>
    <td>${GVSResultsSorted[i].password}</td>
    <td>${GVSResultsSorted[i].course}</td>
    <td>${GVSResultsSorted[i].section}</td>
    <td>${GVSResultsSorted[i].address}</td>
    <td>${GVSResultsSorted[i].contact}</td>
    <td>${GVSResultsSorted[i].guardian}</td>
    <td>${GVSResultsSorted[i].guardian_contact}</td>
    <td>${GVSResultsSorted[i].added_at}</td>
        <th scope="col" class="table-info">
        <div class = "pt-2">
    <a href="#" class ="btn btn-primary btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#editusermodal" onclick ="editUserSorted(${GVSResultsSorted[i].id});return false;"><i class="bi bi-eye"></i></a>

    <a href="#" class ="btn btn-secondary btn-sm" title = "View" data-bs-toggle="modal" data-bs-target="#gradesmodal" onclick ="viewGradesSorted('${GVSResultsSorted[i].studentnumber}');return false;" ><i class="bi bi-file-text"></i></a>

    <a href="#" class ="btn btn-danger btn-sm" title = "Archived"  data-bs-toggle="modal" data-bs-target="#archivedModal" onclick ="moveToArchive('${GVSResultsSorted[i].id}', '${GVSResultsSorted[i].studentnumber}');return false;"><i class="bi bi-trash"></i></a>
    
    </div>
        </th>
        </tr>`;
    }
   
    let numberOfPages = '';
    numberOfPages += `<h8>Showing `+GVSdefaultRow+` out of `+GVSAccLength+` results</h8>`;
    document.querySelector('#tbody-user-accounts').innerHTML = output;//print the data into the tbody
    document.querySelector('#showNumberOfPage').innerHTML = numberOfPages;
}//Sorted Bind Table

//Archived prompt ! are you sure you want to archive?
const moveToArchive = async (...params) => {
let output = '';
output += `Are you sure you want to remove `+params[1]+` ?!`;
let showButtons ='';
showButtons += ` <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
<button type="button" class="btn btn-danger"data-bs-dismiss="modal" onclick= "removeUserAccount(`+params[0]+`)">Remove</button>`;
document.querySelector('#modal-footer-button').innerHTML = showButtons;//show the buttons modal archive
document.querySelector('#archive-modal-title').innerHTML = output;//change the title of modal archive
}

//RemoveUserAccount when confirmed
const removeUserAccount = async (id) =>{
    let message = '';// message alert
 //get current date where removing was done
 const removedDate = new Date();   

formData = new FormData()
formData.append('UserID', id);
formData.append('Status', removedDate);

try{
    const fetchRemove = await fetch("../controller/student-remove.php",{
          method: "POST",
          body: formData,
      });
  
      const fetchResponse = await fetchRemove.json();
      if(fetchResponse.statusCode === 200){     
            alertShowSuccess.removeAttribute("hidden");
            alertShowSuccess.classList.add('show');
            message += ` Removed Succesfully!`
            refreshTable(); 
        delayedRemoveAlert = () =>{   
            alertShowSuccess.classList.remove('show');  
            alertShowSuccess.setAttribute("hidden", "hidden");
        }
        setTimeout(delayedRemoveAlert, 3000);
      }// end of if fetch === 200

    document.querySelector('#alertSuccessMessage').innerHTML = message;
       
  }catch (e){
      console.log(e)
  }
}

//Select bind data

const selectNumPage = function(){
    GVSIsSorted = false;//Default the not sorted
    if(selectPage.value === '5'){
        GVSIndexPage = 0;
        GVSNumRows = 5;
        GVSRowPerPage = 5;
        GVSdefaultRow = 5;
    }else if(selectPage.value === '10'){
        console.log("10")
        GVSNumRows = 10;
        GVSIndexPage = 0;
        GVSRowPerPage = 10;
        GVSdefaultRow = 10;
    }else if(selectPage.value === '25'){
        console.log("25")
        GVSNumRows = 25;
        GVSIndexPage = 0;
        GVSRowPerPage = 25;
        GVSdefaultRow = 25;
    }else{

        GVSIndexPage = 0;
        GVSNumRows = GVSAccLength;
        GVSRowPerPage = GVSAccLength;
        GVSdefaultRow = GVSAccLength;
    }
    bindAllDataIntoTable();
}

//Search bar function
const userSearchKey = () =>{
let userSearch = userSearchBar.value;

if(userSearch !== ""){
    let results = [];//Temporary JSON

    for(let i = 0; i<GVSResults.length;i++){
        for( key in GVSResults[i]){
            if(GVSResults[i][key].indexOf(userSearch) != -1){
                results.push(GVSResults[i]);
                break;
            }
        }
    }//Put all match results in results obj
    
    GVSNumRows = results.length;//set the value of numrows
    GVSResultsSorted = results;
    bindAllDataIntoTableSorted();
}else{
    bindAllDataIntoTable();
}

}




const btnEditUsers = document.getElementById('btnEditUsers');

const resetFields = () =>{
   
    let StudNum = document.getElementById('newStudNum').value = ""; 

    let Fname = document.getElementById('newFname').value = "";

    let Mname = document.getElementById('newMname').value = "";
   
    let Lname = document.getElementById('newLname').value = "";

    let Email = document.getElementById('newEmail').value = "";
 
    let Password = document.getElementById('newPassword').value = "";
    

    let Birthday = document.getElementById('newBirthday').value = "";

    let Contact = document.getElementById('newContact').value = "";

    let Address = document.getElementById('newAddress').value = "";
 
    let Course = document.getElementById('newCourse').value = "";

    let Section = document.getElementById('newSection').value = "";

    let Guardian = document.getElementById('newGuardian').value = "";

    let GuardianNum = document.getElementById('newGuardianContact').value = "";
    let SexMale = document.getElementById('maleCheck').checked = false;

    let SexFemale = document.getElementById('femaleCheck').checked = false;
 
    btnSuccess.setAttribute("hidden", "hidden");//Is loading true
    btnCreateUsers.removeAttribute("hidden");
}//Reset all the fields

//Call it to refresh the table
 refreshTable = () =>{
     GVSIndexPage = 0;
    resetFields();
    getAllDataAPI();
}


//Check all of the fields
const checkAllFields = () =>{
    let StudNum = document.getElementById('newStudNum').value; 

    let Fname = document.getElementById('newFname').value;

    let Mname = document.getElementById('newMname').value;
   
    let Lname = document.getElementById('newLname').value;

    let Email = document.getElementById('newEmail').value;
 
    let Password = document.getElementById('newPassword').value;
    
    let Course = document.getElementById('newCourse').value;

    let Section = document.getElementById('newSection').value;

    let Birthday = document.getElementById('newBirthday').value;
    
    let Sex ="";

    
    if(document.getElementById('maleCheck').checked === true){
        Sex = "Male";
    }
    if(document.getElementById('femaleCheck').checked === true){
        Sex = "Female";
    }

    let Contact = document.getElementById('newContact').value;

    let Address = document.getElementById('newAddress').value;
 
    let Guardian = document.getElementById('newGuardian').value;

    let GuardianNum = document.getElementById('newGuardianContact').value;
    if(StudNum !== "" && Fname !== "" && Mname !=="" && Lname !== "" && Email !== "" && Password !== "" && Course !== "..." && Section !== "..." && Contact !== "" && Address !== "" && Guardian !== "" && GuardianNum !== ""){
        createUserAccount();
    }else{
        alertShowError.classList.add('show');
        alertShowError.removeAttribute("hidden");
        btnError.removeAttribute("hidden");
        btnCreateUsers.style.display = "none";
        delayedAlert = () =>{
            alertShowError.classList.remove('show');
            alertShowError.setAttribute("hidden", "hidden");
            btnError.setAttribute("hidden", "hidden");//Is loading true
            btnCreateUsers.style.display = "inline-block";
        }
        setTimeout(delayedAlert, 3000);
    }
}



//Loading function for button
const IsLoadingTrue =(formStatus) =>{
    if(formStatus === true){
        IsLoadingTrue(false)//Start the loading button
    btnIsLoading.removeAttribute("hidden");//Is loading true
    btnIsUpdating.removeAttribute("hidden");//Is Updating true
    btnCreateUsers.style.display = "none";
    btnEditUsers.style.display = "none";
    }else{
    delayedStopLoading =() =>{
    btnIsLoading.setAttribute("hidden", "hidden");
    btnIsUpdating.setAttribute("hidden", "hidden");
    btnCreateUsers.style.display = "inline-block";
    btnEditUsers.style.display = "inline-block";
    }
    setTimeout(delayedStopLoading, 3000);
    }
   
}




//Create User
const createUserAccount = (e) =>{
    
    IsLoadingTrue(true)//Start the loading button
    let StudNum = document.getElementById('newStudNum').value; 

    let Fname = document.getElementById('newFname').value;

    let Mname = document.getElementById('newMname').value;
   
    let Lname = document.getElementById('newLname').value;

    let Email = document.getElementById('newEmail').value;
 
    let Password = document.getElementById('newPassword').value;
    

    let Birthday = document.getElementById('newBirthday').value;
    
    let Sex ="";

    
    if(document.getElementById('maleCheck').checked === true){
        Sex = "Male";
    }
    if(document.getElementById('femaleCheck').checked === true){
        Sex = "Female";
    }

    let Contact = document.getElementById('newContact').value;

    let Address = document.getElementById('newAddress').value;
 
    let Course = document.getElementById('newCourse').value;

    let Section = document.getElementById('newSection').value;

    let Guardian = document.getElementById('newGuardian').value;

    let GuardianNum = document.getElementById('newGuardianContact').value;
formData = new FormData();
formData.append('StudentNumber', StudNum);
formData.append('Fname', Fname);
formData.append('Mname', Mname);
formData.append('Lname', Lname);
formData.append('Email', Email);
formData.append('Password', Password);
formData.append('Course', Course);
formData.append('Section', Section);
formData.append('Birthday', Birthday);
formData.append('Sex', Sex);
formData.append('Contact', Contact);
formData.append('Address', Address);
formData.append('Course', Course);
formData.append('Section', Section);
formData.append('Guardian', Guardian);
formData.append('GuardianNum', GuardianNum);
for (var pair of formData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
 }


    fetch("../controller/student-create-account.php",{
        method: "POST",
        body:formData,
    })
    
    .then((res) => res.json())
        .then(response =>{
            console.log(response.statusCode)
            let message = '';
          if(response.statusCode === 200){
         message += ` Created Succesfully!`
            document.querySelector('#alertSuccessMessage').innerHTML = message;
            delayedShowAlert = () =>{
                btnCreateUsers.setAttribute("hidden", "hidden");
                alertShowSuccess.removeAttribute("hidden");
                alertShowSuccess.classList.add('show');
                btnSuccess.removeAttribute("hidden");
            }
            setTimeout(delayedShowAlert, 3000)
            delayedRemoveAlert = () =>{   
                
                alertShowSuccess.classList.remove('show');  
                alertShowSuccess.setAttribute("hidden", "hidden");
            }
            setTimeout(delayedRemoveAlert, 6000);
          }
            
        })
    .catch(err => console.log(err))

}

//Show picture
const showPicture = () =>{
let Image_Url = document.getElementById('editImage_Url').value;
let Photo = document.getElementById('currentPhoto').src = Image_Url;
}


//Edit User Data Not sorted
const editUserNotSorted = (a) =>{
    for(let i =0 ; i< GVSResults.length;i++ ){
        if(GVSResults[i].id == a){

            document.getElementById('editId').value = GVSResults[i].id;
           
            let StudNum = document.getElementById('editStudNum').value = GVSResults[i].studentnumber; 

            let Fname = document.getElementById('editFname').value = GVSResults[i].firstname;
        
            let Mname = document.getElementById('editMname').value = GVSResults[i].middlename;
           
            let Lname = document.getElementById('editLname').value = GVSResults[i].lastname;
        
            let Email = document.getElementById('editEmail').value = GVSResults[i].email;
         
            let Password = document.getElementById('editPassword').value = GVSResults[i].password;
            
        
            let Birthday = document.getElementById('editBirthday').value = GVSResults[i].birthday;
            
            let Sex = GVSResults[i].sex;
        console.log(Sex =="Male")
            
            if(Sex == "Male"){
                console.log(Sex =="Male")
                document.getElementById('editmaleCheck').checked = true;
            }
            if(Sex == "Female"){
                document.getElementById('editfemaleCheck').checked = true;
            }
        
            let Contact = document.getElementById('editContact').value = GVSResults[i].contact;
        
            let Address = document.getElementById('editAddress').value = GVSResults[i].address;
         
            let Course = document.getElementById('editCourse').value = GVSResults[i].course;
        
            let Section = document.getElementById('editSection').value = GVSResults[i].section;
        
            let Guardian = document.getElementById('editGuardian').value = GVSResults[i].guardian;
        
            let GuardianNum = document.getElementById('editGuardianContact').value = GVSResults[i].guardian_contact;
         break;
     }
    }
 }
 



//Edit User Data sorted

const editUserSorted = (a) =>{
    
    for(let i =0 ; i< GVSNumRows;i++ ){
        if(GVSResultsSorted[i].id == a){

            document.getElementById('editId').value = GVSResults[i].id;

            let StudNum = document.getElementById('editStudNum').value = GVSResultsSorted[i].studentnumber; 

            let Fname = document.getElementById('editFname').value = GVSResultsSorted[i].firstname;
        
            let Mname = document.getElementById('editMname').value = GVSResultsSorted[i].middlename;
           
            let Lname = document.getElementById('editLname').value = GVSResultsSorted[i].lastname;
        
            let Email = document.getElementById('editEmail').value = GVSResultsSorted[i].email;
         
            let Password = document.getElementById('editPassword').value = GVSResultsSorted[i].password;
            
        
            let Birthday = document.getElementById('editBirthday').value = GVSResultsSorted[i].birthday;
            
            let Sex = GVSResultsSorted[i].sex;
        
            if(Sex == "Male"){
                document.getElementById('editmaleCheck').checked = true;
            }
            if(Sex == "Female"){
                document.getElementById('editfemaleCheck').checked = true;
            }
        
            let Contact = document.getElementById('editContact').value = GVSResultsSorted[i].contact;
        
            let Address = document.getElementById('editAddress').value = GVSResultsSorted[i].address;
         
            let Course = document.getElementById('editCourse').value = GVSResultsSorted[i].course;
        
            let Section = document.getElementById('editSection').value = GVSResultsSorted[i].section;
        
            let Guardian = document.getElementById('editGuardian').value = GVSResultsSorted[i].guardian;
        
            let GuardianNum = document.getElementById('editGuardianContact').value = GVSResultsSorted[i].guardian_contact;
         break;
     }
    }
 }
 
 const checkEditFields = () =>{
     
    let StudNum = document.getElementById('editStudNum').value; 

    let Fname = document.getElementById('editFname').value;

    let Mname = document.getElementById('editMname').value;
   
    let Lname = document.getElementById('editLname').value;

    let Email = document.getElementById('editEmail').value;
 
    let Password = document.getElementById('editPassword').value;
    
    let Course = document.getElementById('editCourse').value;

    let Section = document.getElementById('editSection').value;

    let Birthday = document.getElementById('editBirthday').value;
    
    let Sex ="";

    
    if(document.getElementById('maleCheck').checked === true){
        Sex = "Male";
    }
    if(document.getElementById('femaleCheck').checked === true){
        Sex = "Female";
    }

    let Contact = document.getElementById('editContact').value;

    let Address = document.getElementById('editAddress').value;
 
    let Guardian = document.getElementById('editGuardian').value;

    let GuardianNum = document.getElementById('editGuardianContact').value;
    if(StudNum !== "" && Fname !== "" && Mname !=="" && Lname !== "" && Email !== "" && Password !== "" && Course !== "..." && Section !== "..." && Contact !== "" && Birthday !== "" && Address !== "" && Guardian !== "" && GuardianNum !== ""){
       
        updateUser();

    }else{
        alertShowError.classList.add('show');
        alertShowError.removeAttribute("hidden");
        btnEditError.removeAttribute("hidden");
        btnEditUsers.style.display = "none";
        delayedAlert = () =>{
            alertShowError.classList.remove('show');
            alertShowError.setAttribute("hidden", "hidden");
            btnEditError.setAttribute("hidden", "hidden");//Is loading true
            btnEditUsers.style.display = "inline-block";
        }
        setTimeout(delayedAlert, 3000);
    }
    
 }


const updateUser = async () =>{

    IsLoadingTrue(true)//Start the loading button

    let UserId = document.getElementById('editId').value;

    let StudNum = document.getElementById('editStudNum').value; 

    let Fname = document.getElementById('editFname').value;

    let Mname = document.getElementById('editMname').value;
   
    let Lname = document.getElementById('editLname').value;

    let Email = document.getElementById('editEmail').value;
 
    let Password = document.getElementById('editPassword').value;
    
    let Course = document.getElementById('editCourse').value;

    let Section = document.getElementById('editSection').value;

    let Birthday = document.getElementById('editBirthday').value;
    
    let Sex ="";

    
    if(document.getElementById('maleCheck').checked == true){
        Sex = "Male";
    }
    if(document.getElementById('femaleCheck').checked == true){
        Sex = "Female";
    }

    let Contact = document.getElementById('editContact').value;

    let Address = document.getElementById('editAddress').value;
 
    let Guardian = document.getElementById('editGuardian').value;

    let GuardianNum = document.getElementById('editGuardianContact').value;

    formData = new FormData();
formData.append('UserId', UserId);   
formData.append('StudNum', StudNum);
formData.append('Fname', Fname);
formData.append('Mname', Mname);
formData.append('Lname', Lname);
formData.append('Email', Email);
formData.append('Password', Password);
formData.append('Course', Course);
formData.append('Section', Section);
formData.append('Birthday', Birthday);
formData.append('Sex', Sex);
formData.append('Contact', Contact);
formData.append('Address', Address);
formData.append('Guardian', Guardian);
formData.append('GuardianNum', GuardianNum);
for (var pair of formData.entries()) {
    console.log(pair[0]+ ' - ' + pair[1]); 
 }

try{
  const fetchEdit = await fetch("../controller/student-edit.php",{
        method: "POST",
        body: formData,
    });

    const fetchResponse = await fetchEdit.json();
    
    const showAnimation = await function(){
let message = '';
        if(fetchResponse.statusCode === 200){
       
            delayedShowAlert = () =>{
                console.log("SUCCESS")
                message += ` Updated Succesfully!`
                document.querySelector('#alertSuccessMessage').innerHTML = message;
                alertShowSuccess.removeAttribute("hidden");
                alertShowSuccess.classList.add('show');
                
            }
            setTimeout(delayedShowAlert, 3000)
            delayedRemoveAlert = () =>{   
                alertShowSuccess.classList.remove('show');  
                alertShowSuccess.setAttribute("hidden", "hidden");
            }
            setTimeout(delayedRemoveAlert, 6000);
          }else{
              console.log(fetchResponse)
          }
        }
    
        showAnimation();
     
}catch (e){
    console.log(e)
}

}

//Bind all course
const BindAllCourse = async () =>{
    const fetchResponse = await fetch('../controller/course-table.php');

    const getResponse = await fetchResponse.json();

    console.log(getResponse)

    let output = '';

    output = '<option value="...">...</option>';
    
    for(let i = 0; i<getResponse.length;i++){
        output += `<option value="`+getResponse[i].course_name+`">`+getResponse[i].course_name+`</option>`;
    }
    document.querySelector('#editCourse').innerHTML = output;
    document.querySelector('#newCourse').innerHTML = output;
}