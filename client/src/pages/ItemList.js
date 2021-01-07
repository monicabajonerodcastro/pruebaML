import React from "react";
import { Layout } from "antd";
import { Route, Redirect, useHistory } from "react-router-dom";
import SearchBox from "../pages/SearchBox";
import PriceFormatter from "../components/utils/PriceFormatter";
import FreeShipping from "../assets/png/ic_shipping.png";
import { getDetailsApi } from "../api/details";
import NoItems from "../assets/png/ic_not_found.PNG";


import "../scss/ItemList.scss";

export default function ItemList(props){
    //TODO revisar la ruta superior de donde se obtiene

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
                <span>Electronica, Audio y Video &gt; iPod &gt; Reproductores &gt; iPod Touch &gt; 32GB</span>
            </Header>
            <Content className="item-list__content">
                <ItemsRender items = {items} history = {history}/>
            </Content>
        </Layout>
    );
}

async function getItemDetail(item, history){
    const detail = await getDetailsApi(item.id);
    history.push(
        {
            pathname: `/items/${item.id}`,
            state: detail
        }
    );
}



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

function ItemsRender({items, history}){
    if(items.length > 0){
        return(
            items.map((item, index) => renderItemList(item, index, history))
        )
    }else{
        return renderNoItems(); 
    }
}