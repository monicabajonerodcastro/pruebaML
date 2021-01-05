import React from "react";
import { useParams } from "react-router-dom"; 
import { Layout, Button } from "antd";
import PriceFormatter from "../components/utils/PriceFormatter";

import '../scss/ItemDetail.scss';
import MockDetail from "../resources/mockDetail.json";
import MockDescription from "../resources/mockDescription.json";


export default function ItemDetail(){
    console.log(useParams());

    const { Header, Content } = Layout;

     //TODO revisar la ruta superior de donde se obtiene

    return (
        <Layout className="item-detail">
            <Header className="item-detail__header"> 
                <span>Electronica, Audio y Video &gt; iPod &gt; Reproductores &gt; iPod Touch &gt; 32GB</span>
            </Header>
            <Content className="item-detail__content">
                <div className="item-detail__content-item-container">
                    <div className="item-detail__content-item-container-img">
                        <img src={MockDetail.thumbnail} alt={MockDetail.title}/>
                        <div className="item-detail__content-item-container-description">
                            <span>Descripción del producto</span>
                            <div>
                                {MockDescription.plain_text}
                            </div>
                        </div>
                        
                    </div>
                    <div className="item-detail__content-item-container-detail">
                        <div>
                            <span>
                                <Condition condition={MockDetail.condition}/> - 
                                <SoldQuantity soldQuantity={MockDetail.sold_quantity}/>
                            </span>
                        </div>
                        <div>
                            <span>{MockDetail.title}</span>
                        </div>
                        <div>
                            <span><PriceFormatter price={MockDetail.price}/></span>
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