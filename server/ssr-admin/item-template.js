function getItemTemplate(script, style) {
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
        <title>Admin - Item</title>

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
                <li class="breadcrumb-item active">Item</li>
                </ol>

                <!-- Page Content -->
                <h4>Card</h4>
                <div class="container mb-4">
                    <div class="row">
                        <a class="mx-auto" href="#" data-toggle="modal" data-target="#cardUploadModal">
                            <svg class="card bd-placeholder-img rounded d-block" data-index="1" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" >
                                <title>Upload card</title>
                                <rect class="upload-rect"></rect>
                                <text class="upload-title-text" x="50%" y="20%" dy=".3em">Card #1</text>
                                <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload content</text>
                            </svg>
                        </a>
                        <a class="mx-auto" href="#" data-toggle="modal" data-target="#cardUploadModal">
                            <svg class="card bd-placeholder-img rounded mx-auto d-block" data-index="2" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" >
                                <title>Upload card</title>
                                <rect class="upload-rect"></rect>
                                <text class="upload-title-text" x="50%" y="20%" dy=".3em">Card #2</text>
                                <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload content</text>
                            </svg>
                        </a>
                        <a class="mx-auto" href="#" data-toggle="modal" data-target="#cardUploadModal">
                            <svg class="card bd-placeholder-img rounded mx-auto d-block" data-index="3" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" >
                                <title>Upload card</title>
                                <rect class="upload-rect"></rect>
                                <text class="upload-title-text" x="50%" y="20%" dy=".3em">Card #3</text>
                                <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload content</text>
                            </svg>
                        </a>
                        <a class="mx-auto" href="#" data-toggle="modal" data-target="#cardUploadModal">
                            <svg class="card bd-placeholder-img rounded mx-auto d-block" data-index="4" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" >
                                <title>Upload card</title>
                                <rect class="upload-rect"></rect>
                                <text class="upload-title-text" x="50%" y="20%" dy=".3em">Card #4</text>
                                <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload content</text>
                            </svg>
                        </a>
                        <a class="mx-auto" href="#" data-toggle="modal" data-target="#cardUploadModal">
                            <svg class="card bd-placeholder-img rounded mx-auto d-block" data-index="5" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" >
                                <title>Upload card</title>
                                <rect class="upload-rect"></rect>
                                <text class="upload-title-text" x="50%" y="20%" dy=".3em">Card #5</text>
                                <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload content</text>
                            </svg>
                        </a>
                    </div>
                </div>

                <h5>Card Item of card</h5>
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <label>
                            Card
                            <select class="carditem-amount ml-1">
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>
                        <label class="ml-2">
                            Amount
                            <span class="card-item-amout font-weight-bold">3</span>
                        </label>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <a class="mx-auto" href="#" data-toggle="modal" data-target="#cardItemUploadModal">
                            <svg class="card-item bd-placeholder-img rounded d-block" data-index="1" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" >
                                <title>Upload item</title>
                                <rect class="upload-rect"></rect>
                                <text class="upload-title-text" x="50%" y="20%" dy=".3em">Item #1 of Card #1</text>
                                <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload content</text>
                            </svg>
                        </a>
                        <a class="mx-auto" href="#" data-toggle="modal" data-target="#cardItemUploadModal">
                            <svg class="card-item bd-placeholder-img rounded d-block" data-index="2" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" >
                                <title>Upload item</title>
                                <rect class="upload-rect"></rect>
                                <text class="upload-title-text" x="50%" y="20%" dy=".3em">Item #2 of Card #1</text>
                                <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload content</text>
                            </svg>
                        </a>
                        <a class="mx-auto" href="#" data-toggle="modal" data-target="#cardItemUploadModal">
                            <svg class="card-item bd-placeholder-img rounded d-block" data-index="3" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" >
                                <title>Upload item</title>
                                <rect class="upload-rect"></rect>
                                <text class="upload-title-text" x="50%" y="20%" dy=".3em">Item #2 of Card #1</text>
                                <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload content</text>
                            </svg>
                        </a>
                    </div>
                </div>

                <hr>
                
                <h4>Mini</h4>
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <label>
                            Amount
                            <select class="carditem-amount ml-1">
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4" selected>4</option>
                                <option value="5">5</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div class="container mb-4">
                    <div class="row mb-3">
                        <input type="file" class="mini-upload" name="image-uploads" accept=".jpg, .jpeg, .png" style="display: none;">
                        <svg class="mini bd-placeholder-img rounded mx-auto d-block" data-index="1" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                            <rect class="upload-rect"></rect>
                            <text class="upload-title-text" x="50%" y="20%" dy=".3em">Item #1</text>
                            <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload image</text>
                        </svg>
                        <input type="file" class="mini-upload" name="image-uploads" accept=".jpg, .jpeg, .png" style="display: none;">
                        <svg class="mini bd-placeholder-img rounded mx-auto d-block" data-index="2" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                            <rect class="upload-rect"></rect>
                            <text class="upload-title-text" x="50%" y="20%" dy=".3em">Item #2</text>
                            <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload image</text>
                        </svg>
                        <input type="file" class="mini-upload" name="image-uploads" accept=".jpg, .jpeg, .png" style="display: none;">
                        <svg class="mini bd-placeholder-img rounded mx-auto d-block" data-index="3" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                            <rect class="upload-rect"></rect>
                            <text class="upload-title-text" x="50%" y="20%" dy=".3em">Item #3</text>
                            <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload image</text>
                        </svg>
                        <input type="file" class="mini-upload" name="image-uploads" accept=".jpg, .jpeg, .png" style="display: none;">
                        <svg class="mini bd-placeholder-img rounded mx-auto d-block" data-index="4" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                            <rect class="upload-rect"></rect>
                            <text class="upload-title-text" x="50%" y="20%" dy=".3em">Item #4</text>
                            <text class="upload-center-text" x="50%" y="50%" dy=".3em">Click and Upload image</text>
                        </svg>
                    </div>
                    <div class="row">
                        <form class="w-100">
                            <div class="form-group">
                                <label for="mini-title">Title</label>
                                <input class="form-control" type="text" name="mini-title" placeholder="This is a title.">
                            </div>
                            <div class="form-group">
                                <label for="mini-contet">Content</label>
                                <textarea class="form-control" id="mini-content" rows="3" 
                                    placeholder="This is a content."></textarea>
                            </div>
                            <div class="form-group">
                                <label for="mini-link">Link</label>
                                <input class="form-control" type="text" name="mini-lnakk" placeholder="This is a link text.">
                            </div>
                            <div class="form-group">
                                <label for="mini-link-address">Link address</label>
                                <input class="form-control" type="text" name="mini-link-address" placeholder="http:// ...">
                            </div>
                        </form>
                    </div>
                </div>
                <button type="button" class="apply btn btn-primary btn-lg btn-block mb-3">Apply</button>
                <!-- <hr> -->
                <!-- <p>This is a great starting point for new custom pages.</p> -->

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

        <div class="modal fade show" id="cardUploadModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style="display: none;">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Upload card content</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div class="modal-body">
                    <div class="row mx-auto">
                        <form class="w-100">
                            <div class="form-group">
                                <label for="cardUploadModal-name">Name</label>
                                <input class="form-control" type="text" id="cardUploadModal-name">
                            </div>
                            <div class="form-group">
                                <label for="image-uploads">Choose images to upload (PNG, JPG)</label>
                                <input type="file" id="card-image-uploads" name="image-uploads" accept=".jpg, .jpeg, .png">
                            </div>
                            <div class="preview">
                                <p class="font-weight-light">(No files currently selected)</p>
                            </div>
                            <div class="form-group">
                                <label for="cardUploadModal-title">Item</label>
                                <input class="form-control" value=3 min=1 max=5 step=1 type="number" id="cardUploadModal-title">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="card-submit btn btn-primary" type="button" data-dismiss="modal">Confirm</button>
                </div>
            </div>
            </div>
        </div>

        <div class="modal fade show" id="cardItemUploadModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style="display: none;">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Upload card item content</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div class="modal-body">
                    <div class="row mx-auto">
                        <form class="w-100">
                            <div class="form-group">
                                <label for="image-uploads">Choose images to upload (PNG, JPG)</label>
                                <input type="file" id="card-image-uploads" name="image-uploads" accept=".jpg, .jpeg, .png">
                            </div>
                            <div class="preview">
                                <p class="font-weight-light">(No files currently selected)</p>
                            </div>
                            <div class="form-group">
                                <label for="cardUploadModal-badage">Badage</label>
                                <input class="form-control" type="text" id="cardUploadModal-badage">
                            </div>
                            <div class="form-group">
                                <label for="cardUploadModal-title">Title</label>
                                <input class="form-control" type="text" id="cardUploadModal-title">
                            </div>
                            <div class="form-group">
                                <label for="mini-contet">Body</label>
                                <textarea class="form-control" id="cardUploadModal-body" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="cardUploadModal-link-text">Link</label>
                                <input class="form-control" type="text" id="cardUploadModal-link-text">
                            </div>
                            <div class="form-group">
                                <label for="cardUploadModal-link">Link address</label>
                                <input class="form-control" type="text" id="cardUploadModal-link">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="card-item-submit btn btn-primary" type="button" data-dismiss="modal">Confirm</button>
                </div>
            </div>
            </div>
        </div>

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <!-- Bootstrap core JavaScript-->
        <script src="../lib/jquery/jquery.min.js"></script>
        <script src="../lib/bootstrap/js/bootstrap.bundle.min.js"></script>

        <!-- Core plugin JavaScript-->
        <script src="../lib/jquery-easing/jquery.easing.min.js"></script>

        <!-- Custom scripts for all pages-->
        <script src="../lib/js/sb-admin.min.js"></script>
        <script>${script}</script>

    </body>

    </html>
`;
}

module.exports = { getItemTemplate };
