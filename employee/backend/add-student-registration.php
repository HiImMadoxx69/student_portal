<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

include_once("../connections/connection.php");
$con = connection();

$StudentNumber = $_POST['StudentNumber'];
$AcademicYear = $_POST['AcademicYear'];
$SectionAndYear = $_POST['SectionAndYear'];
$SectionAndSemester = $_POST['SectionAndSemester'];
$Semester = $_POST['Semester'];
$Schedule = $_POST['Schedule'];
$Fee = $_POST['Fee'];
$GetSchedule = json_decode($Schedule, true);
$GetFee = json_decode($Fee, true);
try{

    $sqlRegister = "INSERT INTO tbl_studentregistration (`student_id`,`sectionandsemester`,`academicyear`,`semester`,`sectionandyear`) VALUES ('$StudentNumber', '$SectionAndSemester', '$AcademicYear', '$Semester', '$SectionAndYear');";
mysqli_query($con, $sqlRegister);

for($i = 0; $i < count($GetSchedule); $i++ ){ 
$Sched = $GetSchedule[$i]['sched_code'];
$SubjectName = $GetSchedule[$i]['subject_name'];
$SectionName = $GetSchedule[$i]['section_name'];
$Description = $GetSchedule[$i]['description'];
$Units = $GetSchedule[$i]['units'];
$Semester = $GetSchedule[$i]['semester'];
$Day = $GetSchedule[$i]['schedule_day'];
$Time = $GetSchedule[$i]['schedule_time'];
$SectionAndYear = $GetSchedule[$i]['sectionacademicyear'];

$sqlGenerateSchedule = "INSERT INTO tbl_gradesperstudent (`sched_code`, `student_id`,`subject_name`,`section_name`,`description`,`units`,`semester`,`schedule_day`,`schedule_time`,`academic_year`,`sectionandacademicyear`,`sectionandsemester`) VALUES ('$Sched', '$StudentNumber', '$SubjectName', '$SectionName', '$Description', '$Units', '$Semester', '$Day', '$Time', '$AcademicYear','$SectionAndYear','$SectionAndSemester');";
mysqli_query($con, $sqlGenerateSchedule);

}

$TotalFee = 0;
$TotalPaid = 0;
$Balance = 0;
for($i = 0; $i < count($GetFee[0]); $i++){
    $Name = $GetFee[0][$i]['name'];
    $Amount = $GetFee[0][$i]['amount'];
    $Subtotal = $GetFee[0][$i]['subtotal'];
    $TotalFee = doubleval($TotalFee) + doubleval($Subtotal);
    $sqlAddStudentFee ="INSERT INTO tbl_feeperstudent
    (`name`,`student_id`, `amount`,`subtotal`,`academicyear`,`sectionandyear`,`sectionandsemester`) VALUES ('$Name', '$StudentNumber', '$Amount','$Subtotal','$AcademicYear','$SectionAndYear', '$SectionAndSemester');";
    mysqli_query($con, $sqlAddStudentFee);    
}

$sqlAddStudentFee ="INSERT INTO tbl_accountbalance
(`studentnumber`,`academicyear`,`semester`,`totalfee`,`totalpaid`,`balance`) VALUES ('$StudentNumber', '$AcademicYear', '$Semester','$TotalFee','$TotalPaid','$Balance');";
mysqli_query($con, $sqlAddStudentFee); 


exit(json_encode(array("statusCode"=>200)));
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}


?>