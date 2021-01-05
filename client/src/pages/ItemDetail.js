import React from "react";
import { Layout, Button } from "antd";
import { Route, Redirect } from "react-router-dom";
import PriceFormatter from "../components/utils/PriceFormatter";

import SearchBox from "../pages/SearchBox";
import '../scss/ItemDetail.scss';


export default function ItemDetail(props){
    console.log(props);
    const { Header, Content } = Layout;

     //TODO revisar la ruta superior de donde se obtiene

    const detail = props && props.location && props.location.state ? props.location.state : null;

    if(!detail){
        return (
            <>
            <Route path="/" component={SearchBox}/>
            <Redirect to="/" />
            </>
        )
    }
    

    return (
        <Layout className="item-detail">
            <Header className="item-detail__header"> 
                <span>Electronica, Audio y Video &gt; iPod &gt; Reproductores &gt; iPod Touch &gt; 32GB</span>
            </Header>
            <Content className="item-detail__content">
                <div className="item-detail__content-item-container">
                    <div className="item-detail__content-item-container-img">
                        <img src={detail.thumbnail} alt={detail.title}/>
                        <div className="item-detail__content-item-container-description">
                            <span>Descripción del producto</span>
                            <div>
                                {detail.description.plain_text}
                            </div>
                        </div>
                        
                    </div>
                    <div className="item-detail__content-item-container-detail">
                        <div>
                            <span>
                                <Condition condition={detail.condition}/> - 
                                <SoldQuantity soldQuantity={detail.sold_quantity}/>
                            </span>
                        </div>
                        <div>
                            <span>{detail.title}</span>
                        </div>
                        <div>
                            <span><PriceFormatter price={detail.price}/></span>
                        </div>
                        <div>
                            <Button className="item-detail__content-item-container-detail-button">Comprar</Button>
                        </div>
                    </div>
                </div>
                
            </Content>
        </Layout>
    );
}

function Condition({condition}){
    const conditionLabels =  {
        "used": "Usado",
        "new": "Nuevo"
    }
    return conditionLabels[condition];
}

function SoldQuantity({soldQuantity}){
    if(soldQuantity !== 1){
        return <span> {soldQuantity} vendidos</span>;
    }else{
        return <span> {soldQuantity} vendido</span>;
    }
}