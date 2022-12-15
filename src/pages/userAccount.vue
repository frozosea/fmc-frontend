<template>
  <long-dotted-line/>
  <search-number-form @inputSearchQuery="searchQuery = $event"/>
  <short-dotted-line/>
  <type-selector-in-user-account @updateType="updateSearchType($event)"
                                 @updateNumberType="updateNumberType($event)"
                                 @addOnTrackVisible="addTrackingVisible = $event"
                                 @deleteNumbers="deleteNumbers"
  />
  <CustomModal v-model:show="addTrackingVisible">
    <add-on-track-form v-if="numberType === `containers`"
                       :numberList="toBaseNumbers(true)"
                       @changeNumbers="unselectAddOnTrackContainerNumbers($event)"
                       @close="addTrackingVisible=false"
                       :submit="addNumbersOnTrack"
                       @show="addTrackingVisible=false"
                       @submitForm="changeNumberSignature($event)"
                       @deleteFromTrack="deleteFromTracking($event)"
                       :schedule-tracking-object="{}"
                       :submit-error="addOnTrackError"
                       :show-submit-error="isShowAddOnTrackError"
    />
    <add-on-track-form v-if="numberType === `bills`"
                       :numberList="toBaseNumbers(false)"
                       @changeNumbers="unselectAddOnTrackBillNumbers($event)"
                       @close="addTrackingVisible=false"
                       :submit="addNumbersOnTrack"
                       @show="addTrackingVisible = $event"
                       @submitForm="changeNumberSignature($event)"
                       @deleteFromTrack="deleteFromTracking($event)"
                       :schedule-tracking-object="{}"
                       :submit-error="addOnTrackError"
                       :show-submit-error="isShowAddOnTrackError"
    />
  </CustomModal>
  <div class="spinner" v-if="isLoading">
    <SpinnerLoader
        :active="isLoading"
        class="spinner"
    />
  </div>
  <div class="not_found_numbers"
       v-if="isShowNumbersNotFound && !isLoading">
    Number(s) not
    found!
  </div>
  <containers-or-bills-list v-if="!isShowNumbersNotFound"
                            :numbers=" numberType === `containers` ? filterContainerNumbers : filterBillNumbers"
                            @addToSelectedNumbers="numberType === `containers` ? selectContainer($event) : selectBill($event)"
                            @unselectToSelectedNumbers="numberType === `containers` ? unselectContainerNumbers($event) : unselectBillNumbers($event)"
                            @removeFromTracking="removeFromTrackingOneNumber"
                            :is-loading="isLoading"
  />
  <CustomModal v-model:show="isShowLogin" @update:show="isShowLogin = $event; this.$router.push(`/`)">
    <login-form @close="isShowLogin = $event; this.$router.push(`/`)"
                @show="isShowLogin = $event; this.$router.push(`/`)"
                @showRemindPassword="isShowRemindPassword=$event; isShowLogin=false"
    />
  </CustomModal>

  <CustomModal v-model:show="isShowRemindPassword" @update:show="isShowLogin = $event; this.$router.push(`/`)">
    <registration-form
        @showRemindPassword="isShowRemindPassword = $event"
        @close="isShowLogin = $event; this.$router.push(`/`)"/>
  </CustomModal>
</template>

<script>
import SearchNumberForm from "@/components/user/searchNumberForm";
import longDottedLine from "@/UI/longDottedLine";
import shortDottedLine from "@/UI/shortDottedLine";
import TypeSelectorInUserAccount from "@/components/user/typeSelectorInUserAccount";
import ContainersOrBillsList from "@/components/user/containersOrBillsList";
import CustomModal from "@/UI/CustomModal";
import addOnTrackForm from "@/components/tracking/addOnTrackForm";
import LoginForm from "@/components/user/loginForm";
import registrationForm from "@/components/user/registrationForm";
import SpinnerLoader from "@/UI/loading";
import {utils} from "@/util";

export default {
  name: "userAccount",
  data() {
    return {
      searchType: "actual", //also can be archive
      numberType: "", //also can be bill
      selectedBillNumbers: [],
      selectedContainerNumbers: [],
      selectedAddOnTrackBillNumbers: [],
      selectedAddOnTrackContainerNumbers: [],
      billNumbers: [],
      containerNumbers: [],
      addTrackingVisible: false,
      archive: {billNumbers: [], containerNumbers: []},
      searchQuery: "",
      isShowNumbersNotFound: false,
      isShowLogin: false,
      isShowRemindPassword: false,
      isLoading: false,
      addOnTrackError: "",
      isShowAddOnTrackError: false
    }
  },
  components: {
    LoginForm,
    ContainersOrBillsList,
    TypeSelectorInUserAccount,
    SearchNumberForm,
    longDottedLine,
    shortDottedLine,
    CustomModal,
    addOnTrackForm,
    registrationForm,
    SpinnerLoader
  },
  methods: {
    updateSearchType(type) {
      this.isShowNumbersNotFound = this.checkNumbersExists()
      this.searchType = type;
    },
    updateNumberType(type) {
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
      const itemIndex = this.selectedAddOnTrackContainerNumbers.indexOf(number)
      if (itemIndex !== -1) {
        this.selectedAddOnTrackContainerNumbers.splice(itemIndex, 1)
      }
    },
    unselectAddOnTrackBillNumbers(number) {
      const itemIndex = this.selectedAddOnTrackBillNumbers.indexOf(number)
      if (itemIndex !== -1) {
        this.selectedAddOnTrackBillNumbers.splice(itemIndex, 1)
      }
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
        this.selectedBillNumbers = this.selectedBillNumbers.filter(n => n.number === number);
      }
    },
    async addNumbersOnTrack() {
      const api = this.$store.state.api
      const request = {
        "emailSubject": this.emailSubject,
        "emails": this.emails,
        "numbers": this.numberType === `containers` ? this.selectedAddOnTrackContainerNumbers : this.selectedAddOnTrackBillNumbers,
        "time": this.time
      }
      try {
        await api.scheduleTrackingApi.addContainersOnTracking(request, this.$store.getters[`user/getAuthToken`])
      } catch (e) {
        this.isShowAddOnTrackError = true
        this.addOnTrackError = String(e)
      }
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
    deleteFromTrackingNotInModal() {
      if (this.numberType === `containers`) {
        for (const item of this.selectedContainerNumbers) {
          const index = this.findInArray(item, true)
          if (index !== -1) {
            this.containerNumbers[index].isOnTrack = false
            this.containerNumbers[index].scheduleTrackingInfo = {}
            try {
              let panel = document.getElementById(this.containerNumbers[index].number).nextElementSibling;
              document.getElementById(this.containerNumbers[index].number).classList.remove("act-long");
              panel.style.maxHeight = null;
            } catch (e) {
              //
            }
          }
        }
      } else {
        for (const item of this.selectedBillNumbers) {
          const index = this.findInArray(item, false)
          if (index !== -1) {
            this.billNumbers[index].isOnTrack = false
            this.billNumbers[index].scheduleTrackingInfo = {}
            try {
              let panel = document.getElementById(this.billNumbers[index].number).nextElementSibling;
              document.getElementById(this.billNumbers[index].number).classList.remove("act-long");
              panel.style.maxHeight = null;
            } catch (e) {
              //
            }
          }
        }
      }
    },
    deleteNumberFromArray(number, isContainer) {
      if (isContainer) {
        for (const item of this.containerNumbers) {
          if (item.number.toUpperCase() === number.toUpperCase()) {
            this.containerNumbers.splice(this.containerNumbers.indexOf(item), 1);
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
      if (this.numberType === `bills`) {
        if (this.searchType === `actual`) {
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
      const api = this.$store.state.api
      if (this.numberType === `bills`) {
        if (this.searchType === `actual`) {
          for (const item of this.selectedBillNumbers) {
            this.deleteNumberFromArray(item, false);
          }
          (async () => {
            try {
              await api.scheduleTrackingApi.deleteBillNosFromTracking(this.selectedBillNumbers, this.$store.getters[`user/getAuthToken`])
            } catch (e) {
              //
            }
            try {
              await api.userApi.deleteBills(this.selectedBillNumbers, this.$store.getters[`user/getAuthToken`])
            } catch (e) {
              //
            }
          })();
        }
      } else {
        if (this.searchType === `actual`) {
          for (const item of this.selectedContainerNumbers) {
            this.deleteNumberFromArray(item, true);
          }
          (async () => {
            try {
              await api.scheduleTrackingApi.deleteContainerFromTracking(this.selectedContainerNumbers, this.$store.getters[`user/getAuthToken`])
            } catch (e) {
              //
            }
            try {
              await api.userApi.deleteContainers(this.selectedContainerNumbers, this.$store.getters[`user/getAuthToken`])
            } catch (e) {
              //
            }
          })();
        }
      }

    },
    async deleteFromTracking() {
      const api = this.$store.state.api
      if (this.numberType === `containers`) {
        for (const item of this.selectedAddOnTrackContainerNumbers) {
          const index = this.findInArray(item, true)
          if (index !== -1) {
            this.containerNumbers[index].isOnTrack = false
            this.containerNumbers[index].scheduleTrackingInfo = {};
            try {
              await api.scheduleTrackingApi.deleteContainerFromTracking(this.selectedAddOnTrackContainerNumbers, this.$store.getters[`user/getAuthToken`])
            } catch (e) {
              //
            }
            try {
              let panel = document.getElementById(this.containerNumbers[index]).nextElementSibling;
              document.getElementById(this.containerNumbers[index]).classList.remove("act-long");
              panel.style.maxHeight = null;
            } catch (e) {
              //
            }
          }
        }
      } else {
        for (const item of this.selectedAddOnTrackBillNumbers) {
          const index = this.findInArray(item, true)
          if (index !== -1) {
            this.billNumbers[index].isOnTrack = false
            this.billNumbers[index].scheduleTrackingInfo = {};
            await api.scheduleTrackingApi.deleteBillNosFromTracking(this.selectedAddOnTrackContainerNumbers)
            try {
              let panel = document.getElementById(this.selectedAddOnTrackBillNumbers[index]).nextElementSibling;
              document.getElementById(this.selectedAddOnTrackBillNumbers[index]).classList.remove("act-long");
              panel.style.maxHeight = null;
            } catch (e) {
              //
            }
          }
        }
      }
    },

    findInArray(num, isContainer) {
      if (isContainer) {
        for (const item of this.containerNumbers) {
          if (item.number === num) {
            return this.containerNumbers.indexOf(item)
          }
        }
      } else {
        for (const item of this.billNumbers) {
          if (item.number === num) {
            return this.billNumbers.indexOf(item)
          }
        }
      }
    }
    ,
    async changeNumberSignature(obj) {
      for (const num of obj.numbers) {
        if (this.numberType === `containers`) {
          const index = this.findInArray(num, true)
          this.containerNumbers[index].isOnTrack = true
          this.containerNumbers[index].scheduleTrackingInfo = {time: obj.time, subject: obj.subject, emails: obj.emails}
        }
        if (this.numberType === `bills`) {
          const index = this.findInArray(num, false)
          this.billNumbers[index].isOnTrack = true
          this.billNumbers[index].scheduleTrackingInfo = {time: obj.time, subject: obj.subject, emails: obj.emails}
        }
      }
    },
    removeFromTrackingOneNumber(event) {
      if (this.numberType === `containers`) {
        this.selectedAddOnTrackContainerNumbers.push(event);
        this.deleteFromTracking()
      } else {
        this.selectedAddOnTrackBillNumbers.push(event)
        this.deleteFromTracking()
      }
    }

  },
  computed: {
    filterContainerNumbers() {
      if (this.searchQuery === "") return this.containerNumbers
      const nums = utils.findInUserAccountBySearchQuery(this.containerNumbers, this.searchQuery);
      if (!nums) {
        return []
      }
      return nums
    },
    filterBillNumbers() {
      if (this.searchQuery === "") return this.billNumbers
      const nums = utils.findInUserAccountBySearchQuery(this.billNumbers, this.searchQuery);
      if (!nums) {
        return []
      }
      return nums
    }
  },
  async mounted() {
    if (!this.$store.state.user.isAuth) {
      this.isShowLogin = true
      return
    }
    await this.$store.commit(`refreshToken`)
    this.isShowNumbersNotFound = false
    this.isLoading = true
    try {
      const allBillsContainer = await this.$store.state.api.userApi.get(this.$store.getters[`user/getAuthToken`])
      if (!allBillsContainer.containers) {
        this.isLoading = false
        this.isShowNumbersNotFound = true
        return
      }
      this.billNumbers = allBillsContainer.billNumbers ? allBillsContainer.billNumbers : []
      this.containerNumbers = allBillsContainer.containers ? allBillsContainer.containers : []
    } catch (e) {
      this.isLoading = false
      this.isShowNumbersNotFound = true
    }

    this.numberType = "containers"
    this.isLoading = false

  }
}
</script>

<style scoped>
@import "@/assets/style.css";
</style>