<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');

 try{
    include_once("../connections/connection.php");
$con = connection();

$Course = $_POST['Course'];
$AcademicYear = $_POST['AcademicYear'];
$Semester = $_POST['Semester'];

$sql = mysqli_query($con,"SELECT * FROM tbl_gradesperstudent WHERE section_name LIKE '$Course%' AND academic_year = '$AcademicYear' AND semester = '$Semester';");

    
    $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);
  
    exit(json_encode(array("statusCode"=>200, "content" => $result)));
    
 }catch(Exception $e){
    exit(json_encode(array("statusCode"=>201)));
 }

 ?>