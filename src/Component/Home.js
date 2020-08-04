import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from 'react-responsive-carousel';
import { Card, Image, Grid, Icon } from "semantic-ui-react";
import axios from "axios";

var Images = [
    "https://cdn.pixabay.com/photo/2015/03/26/09/43/lenses-690179__480.jpg",
    "https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289__480.jpg",
    "https://cdn.pixabay.com/photo/2014/10/31/17/41/dancing-dave-minion-510835__480.jpg",
    "https://cdn.pixabay.com/photo/2016/01/22/08/17/banner-1155437__480.png",
    "https://cdn.pixabay.com/photo/2019/01/13/21/36/analog-3931362__480.jpg",
    "https://cdn.pixabay.com/photo/2017/12/18/13/03/grain-3026099__480.jpg",
    "https://cdn.pixabay.com/photo/2015/05/15/09/13/demonstration-767982__480.jpg",
    "https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg",
]

class Home extends Component {
    constructor() {
        super();
        this.state = {
            dataHome: []
        }
    }

    getData = () => {
        axios.get(`http://api.tvmaze.com/search/shows?q=girls`).then(
            (res) => {
                console.log(res.data);
                this.setState({
                    dataHome: res.data
                })
            }
        )
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div>
                <Carousel autoPlay centerMode centerSlidePercentage={40} showStatus={false}>
                    {Images.map((data, key) => {
                        return (
                            <div key="key">
                                <img alt="" src={data} />
                            </div>
                        )
                    })}
                </Carousel>
                <Grid>
                    {this.state.dataHome.map((data, key) => {
                        var images = { ...data.show.image }
                        var ratings = { ...data.show.rating }

                        if (data.show.image === null) {
                            images = "https://cdn.pixabay.com/photo/2015/05/15/09/13/demonstration-767982__480.jpg";
                        }
                        else {
                            images = images.original
                        }

                        if (ratings.average === null) {
                            ratings = 0;
                        }
                        else {
                            ratings = ratings.average
                        }
                        return (
                            <Grid.Column width={3} key={key}>
                                <Card>
                                    <Image src={images} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{data.show.name}</Card.Header>
                                        <Card.Description>
                                            {data.show.status}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='star' />
                                        {ratings}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        )
                    })}
                </Grid>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return dispatch({
        type: "ACTIVE_ITEM",
        activeItem: "home"
    })
}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)