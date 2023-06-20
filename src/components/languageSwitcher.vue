<template>
    <span class="language" @click="toggleVisibility">
  <img src="@/assets/images/lang.svg" class="pad-socials svg-social img-hover"/>
    {{ $i18n.locale === 'ru' ? 'EN' : 'RU' }}
    </span>
</template>

<script>
export default {
  name: "LanguageSwitcher",
  data() {
    return {
      isRussianLang: true
    };
  },
  methods: {
    toggleVisibility() {
      this.isRussianLang = !this.isRussianLang
      let lang = this.isRussianLang ? "ru" : "en"
      this.setLocale(lang)
    },
    setLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("lang", locale);
    }
  }
};
</script>

<style>
</style>