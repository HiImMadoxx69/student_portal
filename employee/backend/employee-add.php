<?php
 header('Access-Control-Allow-Origin: *');
 header('Content-type: application/json');
//includes/PHPMailer.php
//include required phpmailerfiles
require_once '../phpmailer/includes/PHPMailer.php';
require_once '../phpmailer/includes/SMTP.php';
require_once '../phpmailer/includes/Exception.php';
//Define name spaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


    include_once("../connections/connection.php");
$con = connection();


$Fname = $_POST['Fname'];
$Mname = $_POST['Mname'];
$Lname = $_POST['Lname'];
$Email = $_POST['Email'];
$Password = $_POST['Password'];
$Position = $_POST['Position'];
$Birthday = $_POST['Birthday'];
$Sex = $_POST['Sex'];
$Contact = $_POST['Contact'];
$Address = $_POST['Address'];
$Twitter = $_POST['Twitter'];
$Facebook = $_POST['Facebook'];
$Instagram = $_POST['Instagram'];
$Linkedin = $_POST['Linkedin'];
$DateHired = $_POST['DateHired'];

try{
    
$check = false;

// $hashed_password = password_hash($Password, PASSWORD_DEFAULT);
//Create instance of phpmailer
$mail = new PHPMailer();
//Set mailer to use smtp
$mail->isSMTP();
//define smtp host
$mail->Host = "smtp.gmail.com";
//enable smtp authentication
$mail->SMTPAuth = "true";
//set type of encryption (ssl/tls)
$mail->SMTPSecure = "tls";
//set port to connect smtp
$mail->Port = '587';
//set gmail username
$mail->Username = 'nocumadoxx@gmail.com';
//set gmail password
$mail->Password = 'jivthfccfzabrlts';
//set email subject
$mail->Subject = 'Account Status';
//set sender email
$mail->setFrom('nocumadoxx@gmail.com');
//Enable HTML
$mail->isHTML(true);
//Email body
$mail->Body ="<!DOCTYPE html>
<html lang='en' xmlns='http://www.w3.org/1999/xhtml' xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'>
<head>
    <meta charset='utf-8'> <!-- utf-8 works for most cases -->
    <meta name='viewport' content='width=device-width'> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv='X-UA-Compatible' content='IE=edge'> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name='x-apple-disable-message-reformatting'>  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <link href='https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700' rel='stylesheet'>

    <!-- Progressive Enhancements : BEGIN -->
    

</head>

<body width='100%' style='margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1; 	font-family: 'Poppins', sans-serif;font-weight: 400;font-size: 15px; line-height: 1.8; color: rgba(0,0,0,.4);' >
	<center style='width: 100%; background-color: #f1f1f1;'>
    <div style='display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;'>
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>

    <div style='max-width: 600px; margin: 0 auto;' class='email-container'>
    	<!-- BEGIN BODY -->
      <table align='center' role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%' style='margin: auto;'>
      	<tr>
          <td valign='top' class='bg_white' style='padding: 1em 2.5em 0 2.5em;'>
          	<table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>
          		<tr>
          			<td class='logo' style='text-align: center;'>
			            <h1 style=' margin: 0;  font-size: 24px; font-weight: 700; font-family: 'Poppins', sans-serif; color:#1100BB  ;'><a href='#'>AISAT COLLEGE DASMARIÑAS</a></h1>
			          </td>
          		</tr>
          	</table>
          </td>
	      </tr><!-- end tr -->
				<tr>
          <td valign='middle' class='hero bg_white' style='padding: 2em 0 4em 0; position: relative; z-index: 0;'>
            <table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>
            	<tr>
            		<td style='padding: 0 2.5em; text-align: center; padding-bottom: 3em;'>
            			<div class='text' style='color: rgba(0,0,0,.3);'>
            				<h2 style='color: #000;font-size: 34px; font-weight: 200; margin-bottom: 0; line-height:1.4;'>Welcome to Asian Institute of Science and Technology Dasmariñas!</h2>
            			</div>
            		</td>
            	</tr>



            	<tr>
			          <td style='text-align: center; bordeR: 1px solid rgba(0,0,0,.05);max-width: 50%;margin: 0 auto; padding: 2em;'> 	
				          	<img src='images/logo.jpg' alt='' style='width: 100px; max-width: 600px; height: auto; margin: auto; display: block; border-radius: 50%; padding-bottom: 20px;'>
				          	<h2 style='color: black; font-family: 'Poppins', sans-serif; margin-top: 0; font-weight: 400;'>WELCOME NEW STAFF!</h2>

				           	<p><a href='https://aisat-portal.netlify.app/?fbclid=IwAR3_LTplTpx1zRLeUxtWCQkJV0_FEBfh0PzkduGepNm5cLzKWVwRcFWf_AQ' class='btn btn-primary' style='padding: 10px 15px; display: inline-block; border-radius: 5px;background: #1100BB; color: #ffffff;'>AISAT HOME PAGE</a></p>
				           	<p><a href='https://aisat-portal.netlify.app/Loginemployee?fbclid=IwAR2oAnVixrwy09Sdl6Td2N6m3R42m5_kaNG3v0gXO5i7LkfbZN184oTCrP4' class='btn-custom' style='color: #1100BB;text-decoration: underline;'>Portal Login Page</a></p>
			           	
			          </td>
			        </tr>
            </table>
          </td>
	      </tr><!-- end tr -->
      <!-- 1 Column Text + Button : END -->
      </table>
      <table align='center' role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%' style='margin: auto;'>
      	<tr>
          <td valign='middle' class='bg_light footer email-section' style='padding:2.5em; border-top: 1px solid rgba(0,0,0,.05); color: rgba(0,0,0,.5);' >
            <table>
            	<tr>
                <td valign='top' width='33.333%' style='padding-top: 20px;'>
                  <table role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%'>
                    <tr>
                      <td style='text-align: left; padding-right: 10px;'>
                      	<h3 style='color: #000; font-size: 20px;'>You can now Login to our Portal!</h3>
                      	<p>Email: = $Email</p>
                        <p>PASSWORD: = $Password</p>
                        <p>If you are not able to login your account please contact the registar on the campus.</p>
                      </td>
                    </tr>
                  </table>
                </td>

              </tr>
            </table>
          </td>
        </tr><!-- end: tr -->
        <tr>
          <td class='bg_light' style='text-align: center;'>
          	
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>
</html>";
//Add recipient
$mail->addAddress($Email);
//Finally send email
try {
    $mail->Send();
    //Closing smtp connection
$mail->smtpClose();
    $check = true;
} catch (Exception $e) {
    exit(json_encode(array("statusCode"=>201)));
}
$hashedPassword = password_hash($Password, PASSWORD_DEFAULT);

if($hashed_password != $Password){
    $sql = "INSERT INTO `tbl_admin` (`profile_url`, `email`,`password`, `firstname`, `middlename`, `lastname`, `birthday`, `sex`, `position`, `address`, `contact`,`datehired`, `twitterprofile`, `facebookprofile`, `instagramprofile`, `linkedinprofile`) VALUES ('default_profile.jpg', '$Email', '$hashedPassword', '$Fname', '$Mname', '$Lname', '$Birthday', '$Sex', '$Position', '$Address', '$Contact', '$DateHired','$Twitter', '$Facebook', '$Instagram', '$Linkedin');";
    mysqli_query($con, $sql);

    $auditsql = "INSERT INTO `tbl_audit` (`action`) VALUES ('Created a new User Account');";
    mysqli_query($con, $auditsql);
    exit(json_encode(array("statusCode"=>200)));
}else{
    exit(json_encode(array("statusCode"=>201)));
}
   
  
}catch(Exception $e){
    exit(json_encode(array("statusCode"=>$e->getMessage())));
}

// $getFiles = $_POST['floatingFname'];
// if(isset($getFiles)){
//     exit(json_encode(array("statusCode"=>201)));
// }



?>