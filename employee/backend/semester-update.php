<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
include_once("../connections/connection.php");
$con = connection();

try{

$CurrentId  = $_POST['ID'];
$Status = $_POST['Status'];
$Action = $_POST['Action'];
$EditorPosition = $_POST['EditorPosition'];
$EditorEmail = $_POST['EditorEmail'];
$Category = $_POST['Category'];
//sd
try{
    
    if (isset($CurrentId)) {

        $beforeSql = "SELECT * FROM tbl_semester WHERE `id` = '$CurrentId';";     
       
        mysqli_query($con, $beforeSql);

        $getBefore = $con ->query($beforeSql) or die ($con->error);
        $setBefore =  $getBefore ->fetch_assoc();
        $rowBefore = json_encode($setBefore);

        $sql = " UPDATE `tbl_semester` SET `tbl_semester`.`status` = IF(`tbl_semester`.`id` = '$CurrentId', 'active', 'inactive');";

       
        mysqli_query($con, $sql);
       
        $AfterSql = "SELECT * FROM tbl_semester WHERE `id` = '$CurrentId';";     
                
        mysqli_query($con, $AfterSql);

        $getAfter = $con ->query($AfterSql) or die ($con->error);
        $rowAfter = json_encode($getAfter ->fetch_assoc());
        

        $auditsql = "INSERT INTO `tbl_history` (`action`,`category`,`editor_position`,`editor_email`,`edited_email`,`after_edit`,`before_edit`) VALUES ('$Action','$Category','$EditorPosition','$EditorEmail', '$CurrentId', '$rowAfter','$rowBefore');";
                  mysqli_query($con, $auditsql);

                  $sqvl = mysqli_query($con, "SELECT * FROM `tbl_semester`  ORDER BY `id` DESC");
                  
$result = mysqli_fetch_all($sqvl, MYSQLI_ASSOC);

        exit(json_encode(array("statusCode"=>$result)));
    }
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}
?>