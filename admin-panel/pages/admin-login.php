
<?php
if(!isset($_SESSION)){
  session_start();//if there is no session then start session
} //Session lol

if(isset($_SESSION['ID'])){
  echo header("Location: admin-dashboard.php");
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Admin Login</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="../img/globe-client-logo.png" rel="icon" >
  <link href="../img/client-logo.png" rel="apple-touch-icon" >

  <!-- Google Fonts -->
  <link href="https://fonts.gstatic.com" rel="preconnect" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" type="text/css">

  <!-- Vendor CSS Files -->
  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
  <link href="../vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" type="text/css">
  <link href="../vendor/boxicons/css/boxicons.min.css" rel="stylesheet" type="text/css">
  <link href="../vendor/quill/quill.snow.css" rel="stylesheet" type="text/css">
  <link href="../vendor/quill/quill.bubble.css" rel="stylesheet" type="text/css">
  <link href="../vendor/remixicon/remixicon.css" rel="stylesheet" type="text/css">
  <link href="../vendor/simple-datatables/style.css" rel="stylesheet" type="text/css">

  <!-- Template Main CSS File -->
  <link href="../css/style.css" rel="stylesheet" type="text/css">

  
  <!-- My Custom Css-->
  <link href="../css/custom.css" rel="stylesheet" type="text/css">

   
</head>

<body>

  <main>
     
       
    <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
  
      
          <!-- End Sized spinners -->
          

    
          <!-- End of Error Modal -->
          <div class="container" id ="containerLogin">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div class="d-flex justify-content-center py-4">
                <a href="admin-dashboard.php" class="logo d-flex align-items-center w-auto">
                  <img src="../img/globe-client-logo.png" alt="">
                  <span class="d-none d-lg-block">Admin Panel</span>
                </a>
              </div><!-- End Logo -->

              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p class="text-center small">Enter your username & password to login</p>
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
                  <form class="row g-3 needs-validation" id ="loginForm">

                    <div class="col-12">
                      
                      <label for="yourUsername" class="form-label">Username</label>
                      <div class="input-group has-validation">
                        <input type="text" name="username" class="form-control" id="yourUsername" required>
                        <div class="invalid-feedback">Please enter your username.</div>
                      </div>
                    </div>
                    
                    <div class="col-12">
                      <label for="yourPassword" class="form-label">Password</label>
                      <input type="password" name="password" class="form-control" id="yourPassword" required>
                      <div class="invalid-feedback">Please enter your password!</div>
                    </div>
                    <!-- <div class="col-12">
                    <div class="form-check form-switch">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Show Password</label>
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onclick="showPassword()">
                    </div>
                    </div> -->
                    <!-- <script>

function showPassword() {
  var x = document.getElementById("yourPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
                    </script> -->
                    <div class="col-12">
                    <button class="btn btn-primary w-100" type="button" disabled id ="btnChangeToLoading" hidden>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Logging in...
              </button>
                      <button class="btn btn-primary w-100" type="submit"id ="btnLogin">Login</button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">Forget your account? <a href="pages-register.html">Request for recovery</a></p>
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
  <script src="../vendor/jquery-3.6.0.min.js?t=1491313943549"></script>
  <script src ="../js/user-login.js?t=1491313943549" type = "text/javascript">
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
  <!-- <script src="../vendor/php-email-form/validate.js"></script> -->

  <!-- Template Main JS File -->
  <script src="../js/main.js?t=1491313943549"></script>
 
</body>

</html>