import React from "react";
import { Layout } from "antd";
import { Route, Redirect, useHistory } from "react-router-dom";
import SearchBox from "../pages/SearchBox";
import PriceFormatter from "../components/utils/PriceFormatter";
import CategoryPathRender from "../components/utils/CategoryPath"
import FreeShipping from "../assets/png/ic_shipping.png";
import { sendRequest } from "../api/requestSender";
import NoItems from "../assets/png/ic_not_found.png";

import "../scss/ItemList.scss";

/**
 * ItemList component
 * 
 * This component renders the item list layout. When the user sends a query through the 
 * search box, the front-end sends the petition to the back-end and renders the detail.
 * If the response doesn't have any result for the query, the component will render a 
 * message indicating this result.
 * 
 * @param {object} props the props sending from the latest component.
 * 
 */
export default function ItemList(props){

    const { Header, Content } = Layout;
    const history = useHistory();
    const response = props && props.location && props.location.state ? props.location.state : null;

    if(!response){
        return (
            <>
            <Route path="/" component={SearchBox}/>
            <Redirect to="/" />
            </>
        )
    }

    const items = response.results;

    return (
        <Layout className="item-list">
            <Header className="item-list__header"> 
                <CategoryPathRender categoryPath={response.categoryPath}/>
            </Header>
            <Content className="item-list__content">
                <ItemsRender items = {items} history = {history}/>
            </Content>
        </Layout>
    );
}

/**
 * 
 * getItemDetail function
 * 
 * This function sends a request to the back-end in order to get the detail of the
 * selected item. The function is marked as async because the Component needs the
 * data returned by this function and the request to de back-end is executed in 
 * an async way.
 * 
 * @param {object} item The selected item to be sent 
 * @param {object} history The history object
 */
async function getItemDetail(item, history){
    const detail = await sendRequest(`items/${item.id}`);
    history.push(
        {
            pathname: `/items/${item.id}`,
            state: detail
        }
    );
}

/**
 * 
 * renderItemList function
 * 
 * This function returns the element to show each item of the results array. 
 * It recives the item to be displayed
 * 
 * @param {object} item The item of the array of results
 * @param {integer} index The position of the item within the array
 * @param {object} history The object history
 */
function renderItemList(item, index, history){
    return(
        <div className="item-list__content-item-container" key={index} onClick={() => getItemDetail(item, history)}>
            <div className="item-list__content-item-container-img">
                <img src={item.thumbnail} alt={item.title}/>
            </div>
            <div className="item-list__content-item-container-detail">
                <div className="item-list__content-item-container-detail-price">
                    <span>
                        <PriceFormatter price={item.price}/>
                        { item.shipping.free_shipping &&
                            <img src={FreeShipping} alt="Envío gratis"
                            className="item-list__content-item-container-detail-price-img"/>

                        }
                    </span>
                </div>
                <div className="item-list__content-item-container-detail-name">
                    <span>{item.title}</span>
                </div>
            </div>
            <div className="item-list__content-item-container-city">
                <span>{item.address.state_name}</span>
            </div>
        </div>
    )
    
}

/**
 * 
 * renderNoItems function
 * 
 * This function returns the element that will be displayed when the reques to the API doesn't
 * return any item.
 * 
 */
function renderNoItems(){
    return (
         <div className="item-list__content-item-container-not-found">
            <img src={NoItems} alt="Product not found"/>
            <div>
                <span>No hay productos que coincidan con tu búsqueda</span>
            </div>
        </div>
    )
}

/**
 * 
 * ItemsRender component
 * 
 * This component will return the object to be displayed according to the items array. 
 * If the array has items the component will return the elements with a defined structure, 
 * else the component will return a message indictating that the request doesn't have any item
 * 
 * @param {array} items the array with the items
 * @param {object} history the history object
 */
function ItemsRender({items, history}){
    if(items.length > 0){
        return(
            items.map((item, index) => renderItemList(item, index, history))
        )
    }else{
        return renderNoItems(); 
    }
}