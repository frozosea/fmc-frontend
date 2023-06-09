<template>
  <long-dotted-line/>
  <div style="margin: 20px">
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">{{ $t(`companyPage.1`) }}</span>
    </p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">{{ $t(`companyPage.2`) }}</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">{{ $t(`companyPage.3`) }}</span>
    </p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">{{ $t(`companyPage.4`) }}</span>
    </p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">{{ $t(`companyPage.5`) }}</span></p>
    <ul style="list-style-type: undefined;">
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Fesco</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Sinokor</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Heung-a</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">SITC</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Cosco</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">MSC</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">One Line</span></li>
    </ul>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">{{ $t(`companyPage.6`) }}</span></p>
    <ul style="list-style-type: undefined;">
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Fesco</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Sinokor</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Heung-a</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">SITC</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">ReelShipping</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">ZhongGu</span></li>
    </ul>
  </div>
</template>

<script>
import LongDottedLine from "@/UI/longDottedLine";

export default {
  name: "companyPage",
  components: {LongDottedLine},
  async mounted() {
    if (this.$store.getters[`user/getIsAuth`]) {
      await this.$store.commit(`refreshToken`)
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
</script>

<style scoped>

</style>