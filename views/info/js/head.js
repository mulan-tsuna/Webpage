
document.write(`
<div>
<nav class="navbar navbar-expand-lg navbar-light fixed-top " style="background-color: rgb(111, 182, 223)">
    <a class="navbar-brand" href="#">
        <img src="./img/icon.png" height="32" style="color: rgb(255, 255, 255) "> Medical
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                <a class="nav-link" href="home">Home</a>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">
                    Product
                </a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="./info/aerti.html">Aerti</a>
                    <a class="dropdown-item" href="./info/creative.html">Creative</a>
                    <a class="dropdown-item" href="./info/cheiron.html">Cheiron</a>
                    <a class="dropdown-item" href="./info/derunge.html">Derunge</a>
                    <a class="dropdown-item" href="./info/luxamed.html">Luxamed</a>
                    <a class="dropdown-item" href="./info/medcaptain.html">Medcaptain</a>
                    <a class="dropdown-item" href="./info/selvas.html">Selvas</a>
                    <a class="dropdown-item" href="./info/hadeco.html">Hadeco</a>
                    <a class="dropdown-item" href="./info/kawe.html">Kawe</a>
                    <a class="dropdown-item" href="./info/ledspa.html">Ledspa</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">About</a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="check">Reset password</a>
                    <a class="dropdown-item" href="logout">Logout</a>
                </div>
            </li>
        </ul>
    </div>



    <!--<form class="form-inline my-2 my-lg-0">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search...">
                <div class="input-group-append">
                    <button class="btn btn-success" type="submit" style="background-color:rgb(111, 223, 208)">Go</button> 
                </div>
            </div>
        </form>
    </div>-->
</nav>
</div>
<div id="bsCarousel" class="carousel slide pt-5" data-ride="carousel">
<ol class="carousel-indicators">
    <li data-target="#bsCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#bsCarousel" data-slide-to="1"></li>
    <li data-target="#bsCarousel" data-slide-to="2"></li>
    <li data-target="#bsCarousel" data-slide-to="3"></li>
    <li data-target="#bsCarousel" data-slide-to="4"></li>
    <li data-target="#bsCarousel" data-slide-to="5"></li>
    <li data-target="#bsCarousel" data-slide-to="6"></li>
    <li data-target="#bsCarousel" data-slide-to="7"></li>
    <li data-target="#bsCarousel" data-slide-to="8"></li>
    <li data-target="#bsCarousel" data-slide-to="9"></li>
    <li data-target="#bsCarousel" data-slide-to="10"></li>
    <li data-target="#bsCarousel" data-slide-to="11"></li>
</ol>
<div class="carousel-inner">

    <div class="carousel-item active">
        <img class="d-block w-100" src="./img/aerti_silde.jpeg" alt="First slide">
    </div>

    <div class="carousel-item">
        <img class="d-block w-100" src="./img/creative_sild.jpg" alt="Second slide">
    </div>

    <div class="carousel-item">
        <img class="d-block w-100" src="./img/cheiron_silde.jpg" alt="Third slide">
    </div>

    <div class="carousel-item">
        <img class="d-block w-100" src="./img/derunde_silde2.jpg" alt="fourd slide">
    </div>

    <div class="carousel-item">
        <img class="d-block w-100" src="./img/medical_silde.jpg" alt="fived slide">
    </div>

    <div class="carousel-item">
        <img class="d-block w-100" src="./img/accuniq_silde.jpg" alt="sixed slide">
    </div>

    <div class="carousel-item">
        <img class="d-block w-100" src="./img/Hadeco_silde.jpg" alt="sixed slide">
    </div>

    <div class="carousel-item">
        <img class="d-block w-100" src="./img/hugemed_silde.jpg" alt="sixed slide">
    </div>

    <div class="carousel-item">
        <img class="d-block w-100" src="./img/kawe_silde.jpg" alt="sixed slide">
    </div>

    <div class="carousel-item">
        <img class="d-block w-100" src="./img/ledspa_silde.jpg" alt="sixed slide">
    </div>

    <div class="carousel-item">
        <img class="d-block w-100" src="./img/luxamed_silde.jpg" alt="sixed slide">
    </div>

    <a class="carousel-control-prev" href="#bsCarousel" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </a>
    <a class="carousel-control-next" href="#bsCarousel" data-slide="next">
        <span class="carousel-control-next-icon"></span>
    </a>

</div>



`);
