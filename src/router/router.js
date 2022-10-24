import userAccount from "@/pages/userAccount";
import trackingPage from "@/pages/trackingPage";
import companyPage from "@/pages/companyPage";
import {createRouter, createWebHistory} from "vue-router";


export const routes = [
    {
        path:  `/user`,
        component: userAccount
    },
    {
        path: `/tracking`,
        component: trackingPage
    },
    {
        path: `/`,
        component: trackingPage
    },
    {
        path:  `/about`,
        component: companyPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;