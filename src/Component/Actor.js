import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Grid, Input, Card, Icon } from "semantic-ui-react";
import axios from 'axios';

class Actor extends Component {
    constructor() {
        super();
        this.state = {
            dataFilm: [],
            dataAktor: []
        }
    }

    getDataFilm = () => {
        axios.get(`http://api.tvmaze.com/search/shows?q=indo`).then((res) => {
            this.setState({
                dataFilm: res.data
            })
        })
    }

    getDataActor = () => {
        axios.get(`http://api.tvmaze.com/search/people?q=lauren`).then((res) => {
            this.setState({
                dataAktor: res.data
            })
        })
    }

    pencarianAktor = (e) => {
        if (e.target.value === "") {
            this.getDataActor();
        } else {
            axios.get(`http://api.tvmaze.com/search/people?q=${e.target.value}`).then((res) => {
                this.setState({
                    dataAktor: res.data
                })
            })

        }
    }

    componentDidMount() {
        this.getDataFilm();
        this.getDataActor();
    }

    render() {
        return (
            <div>
                <Carousel autoPlay centerMode centerSlidePercentage={20} showStatus={false}>
                    {this.state.dataFilm.map((data, key) => {
                        var images = { ...data.show.image }

                        if (data.show.image === null) {
                            images = "https://cdn.pixabay.com/photo/2015/05/15/09/13/demonstration-767982__480.jpg";
                        }
                        else {
                            images = images.original
                        }
                        return (
                            <div key={key}>
                                <img alt="" src={images} />
                            </div>
                        )
                    })}
                </Carousel>
                <Grid style={{ marginTop: 20 }}>
                    <Grid.Column width={4}>
                        <Carousel autoPlay centerMode centerSlidePercentage={40} showStatus={false}>
                            {this.state.dataAktor.map((data, key) => {
                                var images = { ...data.person.image }

                                if (data.person.image === null) {
                                    images = "https://cdn.pixabay.com/photo/2015/05/15/09/13/demonstration-767982__480.jpg";
                                }
                                else {
                                    images = images.original
                                }
                                return (
                                    <div key="key">
                                        <img alt="" src={images} />
                                    </div>
                                )
                            })}
                        </Carousel>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Input icon='search' placeholder='Search...' style={{ marginBottom: 20 }} onChange={(e) => { this.pencarianAktor(e) }} />
                        <Grid >
                            {this.state.dataAktor.map((data, key) => {
                                var images = { ...data.person.image }

                                if (data.person.image === null) {
                                    images = "https://cdn.pixabay.com/photo/2015/05/15/09/13/demonstration-767982__480.jpg";
                                }
                                else {
                                    images = images.original
                                }
                                return (
                                    <Grid.Column width={4}>
                                        <Card
                                            image={images}
                                            header={data.person.name}
                                            meta={data.person.gender}
                                            extra={<Icon name='start' ><p>{data.score}</p></Icon>}
                                        />
                                    </Grid.Column>
                                )
                            })}

                        </Grid>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return dispatch({
        type: "ACTIVE_ITEM",
        activeItem: "Actor"
    })
}


const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Actor)