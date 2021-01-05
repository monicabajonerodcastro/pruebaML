import React, { useState } from "react";
import { Switch, Route, useHistory, Link } from "react-router-dom"
import { Layout, Form, Input, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SearchImage from "../assets/png/ic_Search.png";
import Logo from "../assets/png/Logo_ML.png";
import { searchItemsApi } from "../api/items";

import "../scss/SearchBox.scss";

export default function SearchBox(props){
    const { routes } = props;
    const { Header, Content } = Layout;
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

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

     const onFinish = async ({search}) => { 
        const items = await searchItemsApi(search);
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



