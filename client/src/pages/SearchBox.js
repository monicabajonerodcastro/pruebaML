import React from "react";
import { Switch, Route } from "react-router-dom"
import { Layout, Form, Input } from "antd";
import SearchImage from "../assets/png/ic_Search.png";
import Logo from "../assets/png/Logo_ML.png";

import "../scss/SearchBox.scss";

export default function SearchBox(props){
    const { routes } = props;
    const { Header, Content } = Layout;
    return (
        <Layout className="container">
            <Header className = "container__search-box">
                <Form className= "container__search-box-form">
                    <img src={Logo} className="container__search-box-form-logo" alt="MercadoLibre" />
                    <Form.Item >
                        <Input 
                            type="text"
                            name="search"
                            placeholder="Nunca dejes de buscar"
                            className="container__search-box-form-input"
                        />
                        <img src={SearchImage} className="container__search-box-form-img" alt="Buscar"/>
                    </Form.Item>
                </Form>
            </Header>
            <Content>
                <InternalRoutes routes={ routes } />
            </Content>
        </Layout>
    );
}

function InternalRoutes({routes}){
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