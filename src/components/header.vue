<template>
  <div class="container g-3">
    <div class="row g-0">
      <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
        <div class="logotype">
          <a href="index.html"><img src="@/assets/images/logotype.svg" class="svg-logotype"></a>
        </div>
      </div>

      <div class="col-xl-6 col-lg-5 col-md-6 col-sm-12 col-xs-12 d-md-none d-lg-block
                    d-none d-sm-block d-sm-none d-md-block">
        <div class="menu">
          <a href="index.html" class="title-3">Company</a>
          <a href="#5" class="menu-link title-3">Services</a>
          <a href="#4" class="menu-link title-3">Feedback</a>
        </div>
      </div>

      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 d-md-none d-lg-block
                    d-none d-sm-block d-sm-none d-md-block">
        <div class="avatar">
          <a href="empty.html" class="title-2">Alexey Morozoy</a>
          <img src="@/assets/images/avatar.png" class="pad-avatar">
          <a href="empty.html"><img src="@/assets/images/exit.svg" class="svg-exit img-hover"></a>
        </div>
      </div>

      <div class="d-lg-none">
        <div class="position-menu">
          <input id="menu-toggle" type="checkbox">
          <label class="menu-btn" for="menu-toggle">
            <span></span>
          </label>
          <ul class="menubox">
            <a href="index.html">
              <div class="logo-menu-pad"><img src="@/assets/images/logo-mobile.svg"></div>
            </a>
            <li class="menu-padding">
            </li>
            <li class=""><a class="menu-item" href="index.html">Company</a></li>
            <li><a class="menu-item" href="#5">Services</a></li>
            <li><a class="menu-item" href="#4">Feedback</a></li>
            <li><a class="menu-item" href="empty.html">
              <img src="@/assets/images/avatar.png" class="avatar-menu">Alexey Morozoy, logout →</a>
            </li>
            <div class="menu-font">© 2022 <b>«Find my Cargo»</b>
              <p>Support: <a href="" class="title-5">support@cargo.com</a></p></div>
            <div class="menu-font">
              <a href="" class="avatar-menu"><img src="@/assets/images/telegram.svg"></a>
              <a href="" class="avatar-menu"><img src="@/assets/images/facebook.svg"></a>
              <a href="" class="avatar-menu"><img src="@/assets/images/twitter.svg"></a>
            </div>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "FmcHeader"
}
</script>

<style>
@import "@/assets/style.css";
</style>