<template>
  <div class="langPosition">
    <button
        class="flex items-center langDropdownButton"
        @click="toggleVisibility"
    >
      <img :src="`/flag_${$i18n.locale}.svg`" alt="flag" class="flagShadow"/>
    </button>
  </div>
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

<style lang="scss" scoped>
.langPosition {
  /*z-index: 9999;*/
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 20px;
  left: 20px;
}

.langDropdownButton {
  outline: none;
  cursor: pointer !important;
  background-color: transparent !important;
  border: none;
  padding-right: 0px;
}


ul {
  text-align: left;
  min-width: 138px;
  border-radius: 8px;
  background: white;
  z-index: 500;
  position: absolute;
  list-style: none;
  padding: 10px 10px !important;
  margin: 0px !important;
  bottom: 60px;
  left: -10px;
}

li {
  padding: 5px 0;
}


.flagShadow {
  border-radius: 50px;
  box-shadow: 0px 3px 3px rgb(204, 210, 235);
  width: 35px;
}

</style>