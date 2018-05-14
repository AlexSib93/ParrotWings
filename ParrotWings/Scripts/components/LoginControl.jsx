﻿class LoginControl extends React.Component {
    constructor() {
        super()
        this.state = {
            isAutorized: false,
            peopleName: null,
            balance: null
        }
    }
    componentWillMount() {
        this.getState()
    }
    render() {
        return (
            <div>
                {this.state.isAutorized
                    ? <AutorizedForm peopleName={this.state.peopleName} balance={this.state.balance} updateState={this.getState.bind(this)} />
                    : <NotAutorizedForm updateState={this.getState.bind(this)}/>}
            </div>
        );
    }
    getState() {
        $.ajax({
            type: 'GET',
            url: '/api/PeopleState',
            beforeSend: function (xhr) {
                var tokenKey = "tokenInfo";
                var token = sessionStorage.getItem(tokenKey);
                console.log("token ", token);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: this.login.bind(this),
            complete: this.getStateResult.bind(this)

        });
    }
    login(data) {
        this.setState({
            isAutorized: true,
            peopleName: data.PeopleName,
            balance: data.Balance
        });
    }
    getStateResult(xhr, status) {
        if (xhr.status === 401) {
            this.logout();
        }
    }
    logout() {
        this.setState({
            isAutorized: false,
            peopleName: null,
            balance: null
        })
    }
}

class AutorizedForm extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h4>Hello, {this.props.peopleName}! balance: --{this.props.balance} PW--</h4>
                <button onClick={this.logout.bind(this)}>Logout</button>
            </div>
        );
    }
    logout() {
        var tokenKey = "tokenInfo";
        sessionStorage.removeItem(tokenKey);
        this.props.updateState();
    }
}

class NotAutorizedForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mailValid: true,
            passValid: true
        }
    }
    render() {
        console.log('wtf2', !this.state.passValid)
        return (
            <div class="NotAutorizedForm">
            <div>
                <label>Email</label><br />            
                <input type="email" ref="loginmail" style={{ borderColor: this.state.mailValid ? '' : 'red' }} required />
                <ComponentWithModalDialog text="Not valid mail" show={!this.state.mailValid} /> <br /><br />
            </div>
                <label>Password</label><br />
                <input type="password" ref="loginpassword" style={{ borderColor: this.state.passValid ? '' : 'red' }} required />
                <ComponentWithModalDialog text="Password can not be empty" show={!this.state.passValid} /><br /><br />
                <input type="submit" value="Login" onClick={this.login.bind(this)} />
                <input type="submit" id="regDalogShow" value="Register" onClick={this.showDiag.bind(this)} />
                <RegisterDialog ref="dialog" />
            </div>
        );
    }
    login() {
        if (this.validate()) {
            var loginData = {
                grant_type: 'password',
                username: this.refs.loginmail.value,
                password: this.refs.loginpassword.value
            };
            $.ajax({
                type: 'POST',
                url: '/Token',
                data: loginData
            }).success(
                this.Logined.bind(this)
                ).fail(function (data) {
                    alert('Autorization error. Please, check your mail and password!');
                });
        }
    }
    Logined(data) {
        var tokenKey = "tokenInfo";
        sessionStorage.setItem(tokenKey, data.access_token);
        this.props.updateState();
    }
    showDiag() {
        console.log('1');
        this.refs.dialog.show();
        console.log('2');
    }
    validate() {
        var lvalid = this.refs.loginmail.checkValidity()
        var pvalid = this.refs.loginpassword.checkValidity()
        this.setState({
            mailValid: lvalid,
            passValid: pvalid
        })
        return lvalid && pvalid;
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById("LoginControl")
);