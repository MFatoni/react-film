import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Image, Input, Card, Icon } from "semantic-ui-react";
import axios from "axios";

class Film extends Component {

    constructor() {
        super();
        this.state = {
            dataFilm: []
        };
    }

    getData = () => {
        axios.get(`http://api.tvmaze.com/search/shows?q=fiction`).then(
            (res) => {
                this.setState({
                    dataFilm: res.data
                })
            }
        )
    }

    pencarian = (e) => {
        axios.get(`http://api.tvmaze.com/search/shows?q=${e.target.value}`).then(
            (res) => {
                this.setState({
                    dataFilm: res.data
                })
            }
        )
    }

    componentDidMount() {
        this.getData()
    }

    render() {

        return (
            <div>
                <Grid>
                    <Grid.Column width={4}>
                        <Image src='https://cdn.pixabay.com/photo/2015/03/26/09/43/lenses-690179__480.jpg' />
                        <Image style={{ marginTop: 20 }} src='https://cdn.pixabay.com/photo/2015/03/26/09/43/lenses-690179__480.jpg' />
                        <Image style={{ marginTop: 20 }} src='https://cdn.pixabay.com/photo/2015/03/26/09/43/lenses-690179__480.jpg' />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Input icon='search' placeholder='Search...' style={{ marginBottom: 20 }} onChange={(e) => { this.pencarian(e) }} />
                        <Grid >
                            {this.state.dataFilm.map((data, key) => {
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
                                    <Grid.Column width={5}>
                                        <Card
                                            image={images}
                                            header={data.show.name}
                                            meta={"Status " + data.show.status}
                                            description={data.show.language}
                                            extra={<Icon name='star'><p>{ratings}</p></Icon>}
                                        />
                                    </Grid.Column>
                                )
                            })}
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Image src='https://cdn.pixabay.com/photo/2015/03/26/09/43/lenses-690179__480.jpg' />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return dispatch({
        type: "ACTIVE_ITEM",
        activeItem: "film"
    })
}


const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Film)