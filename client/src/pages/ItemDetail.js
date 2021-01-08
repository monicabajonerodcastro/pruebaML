import React from "react";
import { Layout, Button, Carousel } from "antd";
import { Route, Redirect } from "react-router-dom";
import PriceFormatter from "../components/utils/PriceFormatter";
import CategoryPathRender from "../components/utils/CategoryPath"

import SearchBox from "../pages/SearchBox";

import '../scss/ItemDetail.scss';

/**
 * The ItemDetail component
 * 
 * This component renders the item detail layout. When the user sends select an item 
 * through the click on it, the front-end sends the petition to the back-end and 
 * renders the detail.
 * 
 * @param {object} props the props sending from the latest component.
 */
export default function ItemDetail(props){
    const { Header, Content } = Layout;

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
                <CategoryPathRender categoryPath={detail.categoryPath}/>
            </Header>
            <Content className="item-detail__content">
                <div className="item-detail__content-item-container">
                    <div className="item-detail__content-item-container-img">
                        <ImagesForCarousel pictures={detail.pictures} title={detail.title}/>
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

/**
 * 
 * Condition component
 * 
 * This component map the condition of the item in order to show the item condition in Spanish
 * 
 * @param {boolean} condition The condition variable is assigned by destructuring and it is
 *      a flag that indicates if the item is new or used in the condition param 
 */
function Condition({condition}){
    const conditionLabels =  {
        "used": "Usado",
        "new": "Nuevo"
    }
    return conditionLabels[condition];
}

/**
 * SoldQuantity component
 * 
 * This component returns the appropriate word (in singular or plural) according to the sold quantity
 * 
 * @param {Integer} soldQuantity The soldQuantity variable is assigned by destructuring and it is
 *      a flag that indicates the sold units of the item. 
 */

function SoldQuantity({soldQuantity}){
    if(soldQuantity !== 1){
        return <span> {soldQuantity} vendidos</span>;
    }else{
        return <span> {soldQuantity} vendido</span>;
    }
}

/**
 * 
 * renderImage function
 * 
 * This function renders dynamically the images to the Antd.Carousel according to the pictures 
 * returned in the detail item array.
 * 
 * @param {Integer} index the position within the array
 * @param {String} picture the URL of the picture
 * @param {String} title the title of the item
 */
function renderImage(index, picture, title){
    return(
        <div key={index}>
            <img src={picture.url} alt={title} />
        </div>
    )
    
}

/**
 * 
 * ImagesForCarousel component
 * 
 * This component renders the Carousel with the item images. This component uses the 
 * Carousel component exposed by Antd.
 * 
 * see https://ant.design/components/carousel/
 * 
 * @param {array} pictures
 * @param {string} title
 */
function ImagesForCarousel({pictures, title}){
    return (
        <Carousel autoplay>{
            pictures.map((picture, index) => renderImage(index, picture, title))
        }
        </Carousel>
    );
    
}