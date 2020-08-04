import React, { Component } from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { connect } from "react-redux";

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }
  login() {
    this.props.auth.login();
  }
  logout() {
    this.props.auth.logout();
  }
  componentDidMount() {
    const { renewSession } = this.props.auth;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession()
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <Menu inverted color="blue" style={{ marginBottom: 20 }} >
          <Menu.Item
            name='Home' active={this.props.activeItem === 'home'}
            onClick={this.goTo.bind(this, "home")}
          />
          <Menu.Item
            name='Film' active={this.props.activeItem === 'film'}
            onClick={this.goTo.bind(this, "film")}
          />
          <Menu.Item
            name='Actor' active={this.props.activeItem === 'actor'}
            onClick={this.goTo.bind(this, "actor")}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              {
                !isAuthenticated() && (
                  <Button onClick={this.login.bind(this)} color="green">
                    Log In
                </Button>
                )
              }
              {
                isAuthenticated() && (
                  <Button onClick={this.logout.bind(this)} color="red">Log Out</Button>
                )
              }
            </Menu.Item>
          </Menu.Menu>
        </Menu>

      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeItem: state.activeItem
  }
}

export default connect(mapStateToProps)(App);