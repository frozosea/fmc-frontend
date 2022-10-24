<template>
  <long-dotted-line/>
  <search-number-form @search="filterNumbers" @inputSearchQuery="searchQuery = $event"/>
  <short-dotted-line/>
  <type-selector-in-user-account @updateType="updateSearchType" @updateNumberType="updateNumberType"
                                 @addOnTrackVisible="addTrackingVisible = $event"/>
  <CustomModal v-model:show="addTrackingVisible">
    <add-on-track-form v-if="numberType === `container`" :numberList="containerNumbers"
                       @changeNumbers="unselectContainerNumbers($event)"
                       @close="addTrackingVisible=false" :submit="addContainersOnTrack"/>
    />
    <add-on-track-form v-if="numberType === `bill`" :numberList="billNumbers"
                       @changeNumbers="unselectBillNumbers($event)"
                       @close="addTrackingVisible=false" :submit="addBillsOnTrack"/>
    />
  </CustomModal>

  <containers-or-bills-list v-if="numberType === `container`" :numbers="containerNumbers"
                            @addToSelectedNumbers="selectContainer"
                            @unselectToSelectedNumbers="unselectContainerNumbers"
  />
  <containers-or-bills-list v-if="numberType === `bill`" :numbers="billNumbers"
                            @addToSelectedNumbers="selectBill"
                            @unselectToSelectedNumbers="unselectBillNumbers"
  />
  <containers-or-bills-list v-if="numberType === `bill` && searchType === `archive` " :numbers="archive.billNumbers"
                            @addToSelectedNumbers="selectArchiveBill"
                            @unselectToSelectedNumbers="unselectArchiveBillNumbers"
  />
  <containers-or-bills-list v-if="numberType === `bill`  && searchType === `archive` "
                            :numbers="archive.containerNumbers"
                            @addToSelectedNumbers="selectArchiveContainer"
                            @unselectToSelectedNumbers="unselectArchiveContainerNumbers"
  />
</template>

<script>
import SearchNumberForm from "@/components/user/searchNumberForm";
import longDottedLine from "@/UI/longDottedLine";
import shortDottedLine from "@/UI/shortDottedLine";
import TypeSelectorInUserAccount from "@/components/user/typeSelectorInUserAccount";
import ContainersOrBillsList from "@/components/user/containersOrBillsList";
import CustomModal from "@/UI/CustomModal";
import addOnTrackForm from "@/components/tracking/addOnTrackForm";

export default {
  name: "userAccount",
  data() {
    return {
      searchType: "actual", //also can be archive
      numberType: "container", //also can be bill
      selectedBillNumbers: [],
      selectedContainerNumbers: [],
      billNumbers: [],
      containerNumbers: [],
      addTrackingVisible: false,
      archive: null,
      searchQuery: ""
    }
  },
  components: {
    ContainersOrBillsList,
    TypeSelectorInUserAccount,
    SearchNumberForm,
    longDottedLine,
    shortDottedLine,
    CustomModal,
    addOnTrackForm
  },
  methods: {
    updateSearchType(type) {
      this.searchType = type;
    },
    updateNumberType(type) {
      this.numberType = type;
    },
    selectContainer(number) {
      this.containerNumbers.push(number)
    },
    unselectContainerNumbers(number) {
      this.containerNumbers = this.containerNumbers.filter(n => n.number !== number);
    },
    selectBill(number) {
      this.billNumbers.push(number)
    },
    unselectBillNumbers(number) {
      this.billNumbers = this.billNumbers.filter(n => n.number !== number);
    },
    addBillsOnTrack() {
      //TODO add bill on track in user account
    },
    addContainersOnTrack() {
      //TODO add containers on track in user account
    },
    selectArchiveContainer(number) {
      this.archive.containerNumbers.push(number)
    },
    unselectArchiveContainerNumbers(number) {
      this.archive.containerNumbers = this.archive.containerNumbers.filter(n => n.number !== number);
    },
    selectArchiveBill(number) {
      this.archive.billNumbers.push(number)
    },
    unselectArchiveBillNumbers(number) {
      this.archive.billNumbers = this.archive.billNumbers.filter(n => n.number !== number);
    },
  },
  computed: {
    filterNumbers() {
      if (this.searchType === `actual ` && this.numberType === `bill`) {
        return this.billNumbers.filter(b => b.number.toLowerCase().includes(this.searchType.toLowerCase()))
      } else if (this.searchType === `archive ` && this.numberType === `bill`) {
        return this.archive.billNumbers.filter(b => b.number.toLowerCase().includes(this.searchType.toLowerCase()))
      } else if (this.searchType === `actual` && this.numberType === `container`) {
        return this.containerNumbers.filter(b => b.number.toLowerCase().includes(this.searchType.toLowerCase()))
      } else if (this.searchType === `archive` && this.numberType === `container`) {
        return this.archive.containerNumbers.filter(b => b.number.toLowerCase().includes(this.searchType.toLowerCase()))
      }
      return null
    }
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>