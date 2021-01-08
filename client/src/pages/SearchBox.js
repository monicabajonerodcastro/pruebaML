import React, { useState } from "react";
import { Switch, Route, useHistory, Link } from "react-router-dom"
import { Layout, Form, Input, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SearchImage from "../assets/png/ic_Search.png";
import Logo from "../assets/png/Logo_ML.png";
import { sendRequest } from "../api/requestSender";

import "../scss/SearchBox.scss";

/**
 * 
 * SearchBox component
 * 
 * This component shows the search box that will appear at the top of the page.
 * 
 * @param {props} props the props object set when the routes were defined
 */
export default function SearchBox(props){
    const { routes } = props;
    const { Header, Content } = Layout;
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    /**
     * 
     * setSearchIcon function
     * 
     * This function sets the search icon depending on the status of the request.
     * If the request haven't been sent or the request finished already the search image is displayed,
     * else the loading icon is displayed.
     * 
     * @param {boolean} loadingIcon the state of the action
     */
    const setSearchIcon = (loadingIcon) => {
        if(!loadingIcon){
            return <img 
                    src={SearchImage} 
                    className="container__search-box-form-button" 
                    alt="Buscar"/>
        }else{
            return <LoadingOutlined />;
        }
    }

    /**
     * 
     * onFinish function
     * 
     * This function wil be executed when the submit of the form is sent. The function prepares
     * the request to be sent to the back-end.
     * 
     * @param {object} search The search criteria to be sent  
     */

     const onFinish = async ({search}) => { 
        const items = await sendRequest(`/items?search=${search}`);
        setLoading(false);
        history.push(
            {
                pathname: "/items",
                state: items
            }
        );
    }

    return (
        <Layout className="container">
            <Header className = "container__search-box">
                <Form 
                    className= "container__search-box-form" 
                    onFinish={onFinish} >
                        <Link to="/">
                            <img src={Logo} className="container__search-box-form-logo" alt="MercadoLibre" />
                        </Link>
                        <Form.Item 
                            name="search">
                            <Input />
                        </Form.Item>
                        <Button htmlType="submit" onClick={()=> setLoading(!loading)}>
                            {setSearchIcon(loading)}
                        </Button>
                </Form>
            </Header>
            <Content>
                <InternalRoutes routes={ routes }/>
            </Content>
        </Layout>
    );
}

/**
 * 
 * InternalRoutes component
 * 
 * This component renders the routes dynamically according to the routes defined into de routes.js file.
 * 
 * @param {object} routes The routes defined to be set into the application 
 */
function InternalRoutes({routes}){
    return (
        <Switch>{
                routes.map((route, index) => (
                    <Route
                        key = {index}
                        path = {route.path}
                        exact = {route.exact}
                        component = {route.component}
                    />   
                ))
            };
        </Switch>
    );

}



