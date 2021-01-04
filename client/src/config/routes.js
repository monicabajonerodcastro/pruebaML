import SearchBox from "../pages/SearchBox";
import ItemList from "../pages/ItemList";
import ItemDetail from "../pages/ItemDetail";

{/** Dinamic routes definition */}

const routes = [
    {
        path: "/",
        component: SearchBox,
        exact: false,
        routes: [
            {
                path: "/items",
                component: ItemList,
                exact: true
            },
            {
                path: "/items/detail",
                component: ItemDetail,
                exact: true
            }
        ]
    }
    
]

export default routes;