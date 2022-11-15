import {createStore} from "vuex";
import user from "@/store/user";
import infoStore from "@/store/info";
import apiStore from "@/store/api";
import utils from "@/store/util"

export default createStore({
    modules: {
        user: user,
        info: infoStore,
        api: apiStore,
        utils: utils
    },
})

