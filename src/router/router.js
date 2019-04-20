import LoginView from "../component/Login";
import About from "../component/About";
import HomeView from "../component/Home";
import RegisterView from "../component/Register";
import AccountInfoView from "../component/AccountInfoView";
import SplashView from "../component/SplashView";
import Help from "../component/Help";
import Tipping from "../component/Tipping";

export default [
    {
        path: '/',
        name: 'splash',
        component: SplashView
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/account_info',
        name: 'accountInfo',
        component: AccountInfoView
    },
    {
        path: '/help',
        name: 'help',
        component: Help
    },
    {
        path: '/tipping',
        name: 'tipping',
        component: Tipping
    }
]