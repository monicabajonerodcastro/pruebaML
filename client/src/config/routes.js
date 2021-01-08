import SearchBox from "../pages/SearchBox";
import ItemList from "../pages/ItemList";
import ItemDetail from "../pages/ItemDetail";

/**
 * This file defines the routes that will be exposed and rendered in the layout.
 */
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
                path: "/items/:id",
                component: ItemDetail,
                exact: true
            }
        ]
    }
    
]

export default routes;