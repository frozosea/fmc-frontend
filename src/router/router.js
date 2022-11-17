import userAccount from "@/pages/userAccount";
import trackingPage from "@/pages/trackingPage";
import companyPage from "@/pages/companyPage";
import {createRouter, createWebHistory} from "vue-router";
import FreightPage from "@/pages/freight";
import RecoveryUserPage from "@/pages/recoveryUserPage"

export const routes = [
    {
        path: `/user`,
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
        path: `/about`,
        component: companyPage
    },
    {
        path: `/freight`,
        component: FreightPage
    },
    {
        path: `/recovery`,
        component: RecoveryUserPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;