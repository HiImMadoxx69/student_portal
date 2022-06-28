
<?php
if(!isset($_SESSION)){
  session_start();//if there is no session then start session
} 


if(isset($_SESSION['StudentID'])){
  echo header("Location: index.php");
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Student Portal Login</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="../img/globe-client-logo.png" rel="icon">
  <link href="../img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.gstatic.com" rel="preconnect">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="../vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="../vendor/quill/quill.snow.css" rel="stylesheet">
  <link href="../vendor/quill/quill.bubble.css" rel="stylesheet">
  <link href="../vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="../vendor/simple-datatables/style.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="../css/style.css" rel="stylesheet">

  

  <!-- My Custom Css -->
  <link href = "../css/custom.css" rel = "stylesheet">
</head>
<style>
  body {
    background-image:url('../img/aisat-bg-login.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
<body> 

  <main>
    <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

      

              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                  <a href ="../../homepage.php" ><i class ="bi bi-house-door"></i></a>
                  <div class="d-flex justify-content-center py-4">
                <a href="index.html" class="logo d-flex align-items-center w-auto">
                  <img src="../img/globe-client-logo.png" alt="">
                  <span class="d-none d-lg-block" style ="color:#08203c;">Student Portal</span>
                </a>
              </div><!-- End Logo --><p class="text-center small">Enter your Student Id & Password to Login</p>
                  </div>

<!-- alert -->

<div >
      <div>
<div class="alert alert-danger alert-dismissible fade show w-100" role="alert" id = "alertLogin">
              <center><p id="alertMessage">A simple danger alert—check it out!</p>
              </center>    
            </div>
      </div>
</div>
<!-- end of alert -->

                  <form class="row g-3 needs-validation" novalidate id ="loginForm">

                    <div class="col-12">
                      <label for="yourStudentid" class="form-label">Student ID</label>
                      <div class="input-group has-validation">
                        <input type="text" name="studentid" class="form-control" id="yourStudentid" required>
                        <div class="invalid-feedback">Please enter your Student Id</div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">Password</label>
                      <input type="password" name="password" class="form-control" id="yourPassword" required>
                      <div class="invalid-feedback">Please enter your password</div>
                    </div>
              
                    <div class="col-12">
                    <button class="btn btn-primary w-100" type="button" disabled id ="btnChangeToLoading" hidden>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Logging in...
              </button>
                      <button class="btn btn-primary w-100" type="submit" name="login" id ="btnLogin">Login</button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">Forget your account? <a href="pages-register.html">Recover here</a></p>
                    </div>
                  </form>

                </div>
              </div>

           

            </div>
          </div>
        </div>

      </section>

    </div>
  </main><!-- End #main -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-------------------------------------------- MY JAVASCRIPT admin-login ------------------------------->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src ="../js/login.js" type = "text/javascript">
  </script>
  <!-- END OF  MY JAVASCRIPT admin-login -->


  <!-- Vendor JS Files -->
  <script src="../vendor/apexcharts/apexcharts.min.js"></script>
  <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../vendor/chart.js/chart.min.js"></script>
  <script src="../vendor/echarts/echarts.min.js"></script>
  <script src="../vendor/quill/quill.min.js"></script>
  <script src="../vendor/simple-datatables/simple-datatables.js"></script>
  <script src="../vendor/tinymce/tinymce.min.js"></script>
  <script src="../vendor/php-email-form/validate.js"></script>

  <!-- Template Main JS File -->
  <script src="../js/main.js"></script>

</body>

</html>
