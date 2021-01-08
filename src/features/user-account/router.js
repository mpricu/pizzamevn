export default {
    component: () =>
        import(/* webpackChunkName: "iuzar.modiul" */ './pages/UserPage'),
    beforeEnter: (from, to, next) => {
        if (localStorage.getItem('user')) {
            next();
        } else
            next({
                name: 'Login'
            });
    },
    children: [
        {
            path: 'profile',
            name: 'UserProfile',
            components: {
                default: () =>
                    import(
                        /* webpackChunkName: "iuzar.modiul" */ './pages/UserInfo'
                    ),
                navMenu: () =>
                    import(
                        /* webpackChunkName: "iuzar.modiul" */ './pages/UserNav'
                    )
            }
        },
        {
            path: 'orders',
            name: 'UserOrders',
            components: {
                default: () =>
                    import(
                        /* webpackChunkName: "iuzar.modiul" */ './pages/UserOrders'
                    ),
                navMenu: () =>
                    import(
                        /* webpackChunkName: "iuzar.modiul" */ './pages/UserNavOrders'
                    )
            }
        }
    ]
};
