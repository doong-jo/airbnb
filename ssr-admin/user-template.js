function getUserTemplate(script, style) {
    return /* html */ `
    <!DOCTYPE html>
    <html lang="en">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">

        <link href="../styles/all.min.css" rel="stylesheet">
        <link href="../styles/dataTables.bootstrap4.min.css" rel="stylesheet">
        <link href="../styles/sb-admin.min.css" rel="stylesheet">

        <title>Admin - User</title>
        
        <style>${style}</style>

    </head>

    <body id="page-top">

        <nav class="navbar navbar-expand navbar-dark bg-dark static-top">

            <a class="navbar-brand mr-1" href="/admin">Boostcamp Admin</a>

            <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
            <i class="fas fa-bars"></i>
            </button>

        </nav>

        <div id="wrapper">

            <!-- Sidebar -->
            <ul class="sidebar navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/admin/item">
                    <i class="fas fa-fw fa-images"></i>
                    <span>Item</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/admin/user">
                    <i class="fas fa-fw fa-table"></i>
                    <span>User</span></a>
                </li>
            </ul>

            <div id="content-wrapper">

            <div class="container-fluid">

                <!-- Breadcrumbs-->
                <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="/admin">Admin</a>
                </li>
                <li class="breadcrumb-item active">User</li>
                </ol>

                <!-- DataTables Example -->
                <div class="card mb-3">
                <div class="card-header">
                    <i class="fas fa-table"></i>
                    User Table</div>
                <div class="card-body">
                    <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>birth</th>
                            <th>gender</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>favorite</th>
                            <th>is_admin</th>
                        </tr>
                        </thead>
                        <tfoot>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>birth</th>
                            <th>gender</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>favorite</th>
                            <th>is_admin</th>
                        </tfoot>
                    </table>
                    </div>
                </div>
                <div class="card-footer small text-muted">Updated successfully</div>
                </div>

            </div>
            <!-- /.container-fluid -->

            <!-- Sticky Footer -->
            <footer class="sticky-footer">
                <div class="container my-auto">
                <div class="copyright text-center my-auto">
                    <span>Copyright © Boostcamp 2019</span>
                </div>
                </div>
            </footer>

            </div>
            <!-- /.content-wrapper -->

        </div>
        <!-- /#wrapper -->

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <!-- Bootstrap core JavaScript-->
        <script src="../lib/jquery/jquery.min.js"></script>
        <script src="../lib/bootstrap/js/bootstrap.bundle.min.js"></script>

        <!-- Core plugin JavaScript-->
        <script src="../lib/jquery-easing/jquery.easing.min.js"></script>

        <!-- Page level plugin JavaScript-->
        <script src="../lib/datatables/jquery.dataTables.min.js"></script>
        <script src="../lib/datatables/dataTables.bootstrap4.min.js"></script>

        <!-- Custom scripts for all pages-->
        <script src="../lib/js/sb-admin.min.js"></script>

        <!-- Demo scripts for this page-->
        <script>${script}</script>

    

    </body>

    </html>`;
}

module.exports = { getUserTemplate };
