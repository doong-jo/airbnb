const loginView = /* html */ `
<section class="login">
    <header>
        <div></div>
        <video class="bg-video" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
            <source src="https://connect.or.kr/connectfoundation_/video/home_bg.mp4" type="video/mp4">
        </video>

        <div class="container h-100; text-white">
            <div class="form-signin">
                <form>
                    <h1 class="login-title mb-3 font-weight-bold">Boostcamp</h1>
                    <div class="mb-1">
                        <span class="validator"></span>
                    </div>
                    <label for="f_id" class="sr-only">이메일</label>
                    <input type="text" id="f_id" class="form-control" placeholder="아이디" required="" autofocus=""  maxLength="20">
                    <label for="f_pw" class="sr-only">비밀번호</label>
                    <input type="password" id="f_pw" class="form-control" placeholder="비밀번호" required="" maxLength="16">
                    <div class="mb-3">
                        <span class="validator"></span>
                    </div>
                    <button id="login" class="btn btn-lg btn-primary btn-block" type="button">Sign in</button>
                </form>
                <button id="signup" class="mt-2 btn btn-lg btn-secondary btn-block">Sign up</button>
            </div>
        </div>
    </header>
</section>
`;

export default loginView;
