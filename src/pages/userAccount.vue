<template>
  <long-dotted-line/>
  <search-number-form @search="filterNumbers" @inputSearchQuery="searchQuery = $event"/>
  <short-dotted-line/>
  <type-selector-in-user-account @updateType="updateSearchType($event)" @updateNumberType="updateNumberType($event)"
                                 @addOnTrackVisible="addTrackingVisible = $event"/>
  <CustomModal v-model:show="addTrackingVisible">
    <add-on-track-form v-if="numberType === `container`" :numberList="containerNumbers"
                       @changeNumbers="unselectContainerNumbers($event)"
                       @close="addTrackingVisible=false" :submit="addContainersOnTrack"/>
    <add-on-track-form v-if="numberType === `bills`" :numberList="billNumbers"
                       @changeNumbers="unselectBillNumbers($event)"
                       @close="addTrackingVisible=false" :submit="addBillsOnTrack"/>
  </CustomModal>
  <div class="not_found_numbers"
       v-if="checkNumbersExists">
    Number(s) not
    found!
  </div>
  <containers-or-bills-list v-if="numberType === `container`" :numbers="containerNumbers"
                            @addToSelectedNumbers="selectContainer"
                            @unselectToSelectedNumbers="unselectContainerNumbers"
  />
  <containers-or-bills-list v-if="numberType === `bills`" :numbers="billNumbers"
                            @addToSelectedNumbers="selectBill"
                            @unselectToSelectedNumbers="unselectBillNumbers"
  />
  <containers-or-bills-list v-if="numberType === `bills` && searchType === `archive` " :numbers="archive.billNumbers"
                            @addToSelectedNumbers="selectArchiveBill"
                            @unselectToSelectedNumbers="unselectArchiveBillNumbers"
  />
  <containers-or-bills-list v-if="numberType === `bills`  && searchType === `archive` "
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
      selectedBillNumbers: new Set(),
      selectedContainerNumbers: new Set(),
      billNumbers: [{
        number: "MRKU6788432", scheduleTrackingInfo: {
          time: "15:00",
          emails: [`3dteapot@gmail.com`, `subvenire@mail.com`, `logistic@ya.ru`],
          subject: "боксы вмтп"
        }, isContainer: true, isOnTrack: true
      }],
      containerNumbers: [{
        number: "exampleContainer", scheduleTrackingInfo: {
          time: "15:00",
          emails: [`3dteapot@gmail.com`, `subvenire@mail.com`, `logistic@ya.ru`],
          subject: "боксы вмтп"
        }, isContainer: true, isOnTrack: true
      }],
      addTrackingVisible: false,
      archive: {
        billNumbers: [{
          number: "exampleContainer", scheduleTrackingInfo: {
            time: "15:00",
            emails: [`3dteapot@gmail.com`, `subvenire@mail.com`, `logistic@ya.ru`],
            subject: "боксы вмтп"
          }, isContainer: true, isOnTrack: true
        }],
        containerNumbers: []
      },
      searchQuery: "",
      isShowNumbersNotFound: this.checkNumbersExists()
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
      this.isShowNumbersNotFound = this.checkNumbersExists()
      console.log(type)
      this.searchType = type;
    },
    updateNumberType(type) {
      this.isShowNumbersNotFound = this.checkNumbersExists()
      console.log(type)
      this.numberType = type;
    },
    selectContainer(number) {
      if (this.containerNumbers.indexOf(number) === -1) {
        this.containerNumbers.push(number)
      }
    },
    unselectContainerNumbers(number) {
      this.containerNumbers = this.containerNumbers.filter(n => n.number === number);
    },
    selectBill(number) {
      this.isShowNumbersNotFound = this.checkNumbersExists()
      if (this.billNumbers.indexOf(number) === -1) {
        this.billNumbers.push(number)
      }
    },
    unselectBillNumbers(number) {
      this.isShowNumbersNotFound = this.checkNumbersExists()
      this.billNumbers = this.billNumbers.filter(n => n.number === number);
    },
    addBillsOnTrack() {
      this.isShowNumbersNotFound = this.checkNumbersExists()
      //TODO add bill on track in user account
    },
    addContainersOnTrack() {
      this.isShowNumbersNotFound = this.checkNumbersExists()
      //TODO add containers on track in user account
    },
    selectArchiveContainer(number) {
      this.isShowNumbersNotFound = this.checkNumbersExists()
      this.archive.containerNumbers.push(number)
    },
    unselectArchiveContainerNumbers(number) {
      this.isShowNumbersNotFound = this.checkNumbersExists()
      this.archive.containerNumbers = this.archive.containerNumbers.filter(n => n.number !== number);
    },
    selectArchiveBill(number) {
      this.isShowNumbersNotFound = this.checkNumbersExists()
      this.archive.billNumbers.push(number)
    },
    unselectArchiveBillNumbers(number) {
      this.archive.billNumbers = this.archive.billNumbers.filter(n => n.number !== number);
    },
    checkNumbersExists() {
      //TODO write func which can check containers or bills in archive and actual numbers
      if (this.numberType === `bills`) {
        if (this.searchType === `actual`) {
          return this.billNumbers.length === 0
        } else if (this.searchType === `archive`) {
          return this.archive.billNumbers.length === 0
        }
      } else if (this.numberType === `container`) {
        if (this.searchType === `actual`) {
          return this.containerNumbers.length === 0
        } else if (this.searchType === `archive`) {
          return this.archive.containerNumbers.length === 0
        }
      }
      return false
    }

  },
  computed: {
    // filterNumbers() {
    //   if (this.searchType === `actual ` && this.numberType === `bills`) {
    //     return this.billNumbers.filter(b => b.number.toLowerCase().includes(this.searchType.toLowerCase()))
    //   } else if (this.searchType === `archive ` && this.numberType === `bills`) {
    //     return this.archive.billNumbers.filter(b => b.number.toLowerCase().includes(this.searchType.toLowerCase()))
    //   } else if (this.searchType === `actual` && this.numberType === `container`) {
    //     return this.containerNumbers.filter(b => b.number.toLowerCase().includes(this.searchType.toLowerCase()))
    //   } else if (this.searchType === `archive` && this.numberType === `container`) {
    //     return this.archive.containerNumbers.filter(b => b.number.toLowerCase().includes(this.searchType.toLowerCase()))
    //   }
    //   return null
    // }
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>