<template>
  <long-dotted-line/>
  <search-number-form @search="filterNumbers" @inputSearchQuery="searchQuery = $event"/>
  <short-dotted-line/>
  <type-selector-in-user-account @updateType="updateSearchType($event)"
                                 @updateNumberType="updateNumberType($event)"
                                 @addOnTrackVisible="addTrackingVisible = $event"
                                 @deleteNumbers="deleteNumbers"
  />
  <CustomModal v-model:show="addTrackingVisible">
    <add-on-track-form v-if="numberType === `container`" :numberList="toBaseNumbers(true)"
                       @changeNumbers="unselectAddOnTrackContainerNumbers($event)"
                       @close="addTrackingVisible=false" :submit="addContainersOnTrack"/>
    <add-on-track-form v-if="numberType === `bills`" :numberList="toBaseNumbers(false)"
                       @changeNumbers="unselectAddOnTrackBillNumbers($event)"
                       @close="addTrackingVisible=false" :submit="addBillsOnTrack"/>
  </CustomModal>
  <div class="not_found_numbers"
       v-if="isShowNumbersNotFound">
    Number(s) not
    found!
  </div>
  <containers-or-bills-list :numbers=" numberType === `container` ? containerNumbers: billNumbers"
                            @addToSelectedNumbers="numberType === `container` ? selectContainer($event) : selectBill($event)"
                            @unselectToSelectedNumbers="numberType === `container` ? unselectContainerNumbers($event) : unselectBillNumbers($event)"
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
      selectedAddOnTrackBillNumbers: [],
      selectedAddOnTrackContainerNumbers: [],
      billNumbers: [],
      containerNumbers: [],
      addTrackingVisible: false,
      archive: {billNumbers: [], containerNumbers: []},
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
      if (this.selectedContainerNumbers.indexOf(number) === -1) {
        this.selectedContainerNumbers.push(number)
      }
      if (this.selectedAddOnTrackContainerNumbers.indexOf(number) === -1) {
        this.selectedAddOnTrackContainerNumbers.push(number)
      }
    },
    unselectContainerNumbers(number) {
      this.selectedContainerNumbers = this.selectedContainerNumbers.filter(n => n.number === number);
    },

    unselectAddOnTrackContainerNumbers(number) {
      this.selectedAddOnTrackContainerNumbers = this.selectedAddOnTrackContainerNumbers.filter(n => n.number === number)
    },
    unselectAddOnTrackBillNumbers(number) {
      this.selectedAddOnTrackBillNumbers = this.selectedAddOnTrackBillNumbers.filter(n => n.number === number)
    },
    selectBill(number) {
      if (this.selectedBillNumbers.indexOf(number.toUpperCase()) === -1) {
        this.selectedBillNumbers.push(number.toUpperCase())
      }
      if (this.selectedAddOnTrackBillNumbers.indexOf(number) === -1) {
        this.selectedAddOnTrackBillNumbers.push(number)
      }
    },
    unselectBillNumbers(number) {
      if (this.selectedBillNumbers.indexOf(number) !== -1) {
        console.log(this.selectedBillNumbers.target)
        this.selectedBillNumbers = this.selectedBillNumbers.filter(n => n.number === number);
        console.log(this.selectedBillNumbers)
      }
    },
    addBillsOnTrack() {
      this.isShowNumbersNotFound = this.checkNumbersExists()
      //TODO add bill on track in user account
    },
    addContainersOnTrack() {
      this.isShowNumbersNotFound = this.checkNumbersExists()
      //TODO add containers on track in user account
    },
    toBaseNumbers(isContainer) {
      const ar = [];
      if (isContainer) {
        for (const item of this.selectedAddOnTrackContainerNumbers) {
          ar.push(item.toUpperCase())
        }
      } else {
        for (const item of this.selectedAddOnTrackBillNumbers) {
          ar.push(item.toUpperCase())
        }
      }
      return ar
    },
    // selectArchiveContainer(number) {
    //   this.isShowNumbersNotFound = this.checkNumbersExists()
    //   this.archive.containerNumbers.push(number)
    // },
    // unselectArchiveContainerNumbers(number) {
    //   this.isShowNumbersNotFound = this.checkNumbersExists()
    //   this.archive.containerNumbers = this.archive.containerNumbers.filter(n => n.number !== number);
    // },
    // selectArchiveBill(number) {
    //   this.isShowNumbersNotFound = this.checkNumbersExists()
    //   this.archive.billNumbers.push(number)
    // },
    // unselectArchiveBillNumbers(number) {
    //   this.archive.billNumbers = this.archive.billNumbers.filter(n => n.number !== number);
    // },
    deleteNumberFromArray(number, isContainer) {
      if (isContainer) {
        for (const item of this.containerNumbers) {
          if (item.number.toUpperCase() === number.toUpperCase()) {
            this.containerNumbers.splice(this.containerNumbers.indexOf(item), 1)
          }
        }
      } else {
        for (const item of this.billNumbers) {
          if (item.number.toUpperCase() === number.toUpperCase()) {
            this.billNumbers.splice(this.billNumbers.indexOf(item), 1)
          }
        }
      }
    },
    checkNumbersExists() {
      //TODO write func which can check containers or bills in archive and actual numbers
      if (this.numberType === `bills`) {
        if (this.searchType === `actual`) {
          console.log("AAAAAA actual bills")
          return this.billNumbers.length === 0
        }
      } else if (this.numberType === `containers`) {
        if (this.searchType === `actual`) {
          return this.containerNumbers.length === 0
        }
      }
      return false
    },
    deleteNumbers() {
      if (this.numberType === `bills`) {
        if (this.searchType === `actual`) {
          console.log(this.selectedBillNumbers)
          for (const item of this.selectedBillNumbers) {
            console.log(item)
            this.deleteNumberFromArray(item, false)
          }
          console.log(this.billNumbers)
        }
      } else {
        if (this.searchType === `actual`) {
          for (const item of this.selectedContainerNumbers) {
            this.deleteNumberFromArray(item, true)
          }
          // this.containerNumbers.splice(this.containerNumbers.indexOf())
          console.log(this.containerNumbers)
        }
      }

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
  },
  mounted() {
    console.log(this.$store.state.api)
    const allBillsContainer = this.$store.state.api.userApi.get()
    this.billNumbers = allBillsContainer.billNumbers
    this.containerNumbers = allBillsContainer.containers
    this.isShowNumbersNotFound = this.checkNumbersExists()
  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>