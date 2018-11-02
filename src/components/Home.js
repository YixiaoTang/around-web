import React from 'react';
import { Tabs, Button } from 'antd';
import {GEO_OPTIONS} from "../constants"

const TabPane = Tabs.TabPane;


export class Home extends React.Component {
    componentDidMount(){
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeolocation,
                this.onFailedLoadGeolocation,
                GEO_OPTIONS,);
        }
        else{

        }
    }
    onSuccessLoadGeolocation = (position)=>{
        console.log(position);
    }
    onFailedLoadGeolocation = ()=>{

    }
    render() {
        const operations = <Button type="primary">Create new post</Button>;
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Image Posts" key="1">Content of tab 1</TabPane>
                <TabPane tab="Video Posts" key="2">Content of tab 2</TabPane>
                <TabPane tab="Map" key="3">Content of tab 3</TabPane>
            </Tabs>
        );
    }
}

