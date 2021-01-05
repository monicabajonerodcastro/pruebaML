import React from "react";
import { Layout } from "antd";
import PriceFormatter from "../components/utils/PriceFormatter";
import FreeShipping from "../assets/png/ic_shipping.png";

import MockResponse from "../resources/mockQuery.json"; 
import "../scss/ItemList.scss";

export default function ItemList(){

    //TODO revisar la ruta superior de donde se obtiene

    const { Header, Content } = Layout;
    
    const { results } = MockResponse;
    const result = results[0];

    return (
        <Layout className="item-list">
            <Header className="item-list__header"> 
                <span>Electronica, Audio y Video &gt; iPod &gt; Reproductores &gt; iPod Touch &gt; 32GB</span>
            </Header>
            <Content className="item-list__content">
                <div className="item-list__content-item-container">
                    <div className="item-list__content-item-container-img">
                        <img src={result.thumbnail} alt={result.title}/>
                    </div>
                    <div className="item-list__content-item-container-detail">
                        <div className="item-list__content-item-container-detail-price">
                            <span>
                                <PriceFormatter price={result.price}/>
                                { result.shipping.free_shipping &&
                                    <img src={FreeShipping} alt="Envío gratis"
                                    className="item-list__content-item-container-detail-price-img"/>

                                }
                            </span>
                        </div>
                        <div className="item-list__content-item-container-detail-name">
                            <span>{result.title}</span>
                        </div>
                    </div>
                    <div className="item-list__content-item-container-city">
                        <span>{result.address.state_name}</span>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}
