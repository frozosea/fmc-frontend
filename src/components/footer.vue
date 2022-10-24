<template>
  <div class="footer-width">
    <div class="container g-3 footer fixed-bottom">
      <div class="row g-0">
        <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-xs-12 d-md-none d-lg-block
                    d-none d-sm-block d-sm-none d-md-block">
          <a href="index.html"><img src="@/assets/images/logo-footer.svg" class="svg-logotype-footer"></a>
        </div>
        <div class="col-xl-4 col-lg-8 col-md-6 col-sm-12 col-xs-12">
          <div class="footer-copyright">
            © {{ new Date().getFullYear() }} «<b>Find my Cargo</b>», <a href="" class="title-4">support@cargo.com</a>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 d-md-none d-xl-block
                    d-none d-sm-block d-sm-none d-md-block footer-menu">
          <a href="index.html" class="title-4">Company</a>
          <a href="#5" class="menu-link-footer title-4">Services</a>
          <a href="#4" class="menu-link-footer title-4">Feedback</a>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-xs-12 footer-socials">
          <a href=""><img src="@/assets/images/telegram.svg" class="img-hover svg-social"></a>
          <a href=""><img src="@/assets/images/facebook.svg" class="pad-socials svg-social img-hover"></a>
          <a href=""><img src="@/assets/images/twitter.svg" class="pad-socials svg-social img-hover"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FmcFooter"
}
</script>

<style>
@import "@/assets/style.css";
.page-footer {
  padding: 1rem;
  text-align: center;
  background-color:#f9f7f7;
}
.footer.fixed-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>