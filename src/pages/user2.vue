<template>
  <long-dotted-line/>
  <search-number-form @search="filterNumbers" @inputSearchQuery="searchQuery = $event"/>
  <short-dotted-line/>

</template>

<script>
import SearchNumberForm from "@/components/user/searchNumberForm";
import longDottedLine from "@/UI/longDottedLine";
import shortDottedLine from "@/UI/shortDottedLine";

export default {
  name: "user2",
  components: {SearchNumberForm, longDottedLine, shortDottedLine}
}
</script>

<style scoped>

</style>