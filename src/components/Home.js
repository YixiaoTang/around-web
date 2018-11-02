import React from 'react';
import {Tabs, Button, Spin} from 'antd';
import {GEO_OPTIONS, POS_KEY, API_ROOT, AUTH_HEADER, TOKEN_KEY} from "../constants"
import {Gallery} from "./Gallery"

const TabPane = Tabs.TabPane;

export class Home extends React.Component {
    state = {
        isLoadingGeolocation: false,
        isLoadingPosts: false,
        posts: [],
        error: ''
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            this.setState({
                isLoadingGeolocation: true,
                error: ''
            });
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeolocation,
                this.onFailedLoadGeolocation,
                GEO_OPTIONS,);
        }
        else {
            this.setState({error: 'Geo location is not supported.'})
        }
    }

    onSuccessLoadGeolocation = (position) => {
        this.setState({isLoadingGeolocation: false})
        console.log(position);
        const {latitude, longitude} = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({lat: latitude, lon: longitude}));
        this.loadNearbyPosts();
    }

    onFailedLoadGeolocation = () => {
        this.setState({isLoadingGeolocation: false, error: 'Load geo location failed..'})
    }

    loadNearbyPosts = () => {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        const token = localStorage.getItem(TOKEN_KEY);
        this.setState({isLoadingPosts: true, error: ''})
        fetch(`${API_ROOT}/search?lat=${lat}&${lon}&range=20000`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Failed to load posts');
        }).then((data) => {
            console.log(data);
            this.setState({isLoadingPosts: false, posts: data ? data : []});
        }).catch((e) => {
                console.log(e.message);
                this.setState({isLoadingPosts: false, error: e.message});
            }
        );
    }

    getImagePosts = () => {
        const {error, isLoadGeolocation, isLoadingPosts, posts} = this.state;
        if (error) {
            return <div>{error}</div>
        } else if (isLoadGeolocation) {
            return <Spin tip="Loading geo location..."/>
        } else if (isLoadingPosts) {
            return <Spin tip="Loading Posts..."/>
        } else if(posts.length>0){
            const images = this.state.posts.map(
                (post)=>{
                    return{
                        user: post.user,
                        src: post.url,
                        thumbnail: post.url,
                        caption: post.message,
                        thumbnailWidth: 400,
                        thumbnailHeight: 300,
                    }
                }
            );
            return(<Gallery images={images}/>)
        }
        else {
            return 'No nearby posts'
        }

    }

    render() {
        const operations = <Button type="primary">Create new post</Button>;
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Image Posts" key="1">
                    {this.getImagePosts()}
                </TabPane>
                <TabPane tab="Video Posts" key="2">Content of tab 2</TabPane>
                <TabPane tab="Map" key="3">Content of tab 3</TabPane>
            </Tabs>
        );
    }
}

