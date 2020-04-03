import React from 'react';
import { connect } from 'react-redux';
import { login } from './redux/actions'



function mapStateToProps(state) {
    return {
    }
}

class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }

    onChange_UpdateUserName = (event) => {
        this.setState({username: event.target.value});
    }

    onClick_Login = () => {
       this.props.login(this.state.username)
    }

    render() {
        return (
            <div className="login-box">
                <h1>Pandemic Together</h1>
                <input id="username" type="text" name="email" placeholder="Choose your username" value={this.state.username} onChange={this.onChange_UpdateUserName} />
                <br />
                <button onClick={() => this.onClick_Login()}>Join a Game</button>
                <br />
                <small>a collaborative game for staysafe gamejam</small>
            </div>
        );
    }
}

export default connect(mapStateToProps, {login}) (LoginBox)
