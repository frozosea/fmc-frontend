<template>
  <long-dotted-line/>
  <div style="margin: 20px">
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">Инновационный онлайн-сервис компании &laquo;ООО Моя логистика&raquo; предлагает множество вариантов отслеживать местоположение контейнеров и коносаментов в режиме реального времени без привязки к судоходной линии. Максимально полная информация поступает регулярно, a гибко настраиваемый современный интерфейс и отображение локации груза позволяют сделать работу комфортной.</span>
    </p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">Обладает следующими преимуществам:</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">Не имеет привязки к определенному рабочему месту и доступен с любого устройства, подключенного к Интернету.</span>
    </p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">И наше ключевое достоинство - возможность подписаться на ежедневные обновления передвижения морского груза с рассылкой на почту (без ограничений по количеству получателей), и без привязки к перевозчику, предоставляющая актуальную информацию о примерной дате доставки груза в порт назначения(ETA) и передвижении груза.</span>
    </p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">Линии для трекинга по контейнеру:</span></p>
    <ul style="list-style-type: undefined;">
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Fesco</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Sinokor</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Heung-a</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">SITC</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Cosco</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Maersk</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">Sealand Maersk</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">MSC</span></li>
      <li><span style="font-family:AppleSystemUIFont;font-size:13.0pt;">One Line</span></li>
    </ul>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>
    <p style='margin:0cm;font-size:16px;font-family:"Calibri",sans-serif;'><span
        style="font-size:17px;font-family:AppleSystemUIFont;">Линии для трекинга по коносаменту:</span></p>
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
  //TODO company page
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