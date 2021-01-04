import React from "react";
import { Switch, Route } from "react-router-dom"
import { Layout, Form, Input, Button } from "antd";
import SearchImage from "../assets/png/ic_Search.png";
import Logo from "../assets/png/Logo_ML.png";

import "../scss/SearchBox.scss";

export default function SearchBox(props){
    const { routes } = props;
    const { Header } = Layout;
    return (
        <Layout className = "search-box">
            <Header className = "search-box__header">
                <Form className= "search-box__header-form">
                    <img src={Logo} className="search-box__header-form-logo" />
                    <Form.Item >
                        <Input 
                            type="text"
                            name="search"
                            placeholder="Nunca dejes de buscar"
                            className="search-box__header-form-input"
                        />
                        <img src={SearchImage} className="search-box__header-form-img"/>
                    </Form.Item>
                    
                </Form>
            </Header>
            <br></br>
            <InternalRoutes routes={ routes } />
        </Layout>
    );
}

function InternalRoutes({routes}){
    console.log(routes);
    return (
        <Switch>{
                routes.map((route, index) => (
                    <Route
                    key = {index}
                    path = {route.path}
                    exact = {route.exact}
                    component = {route.component} />
                ))
            };
        </Switch>
    );

}