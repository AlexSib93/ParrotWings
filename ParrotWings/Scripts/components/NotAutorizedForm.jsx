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
                <form className='form-group form-inline'>
                    <label className='control-label'>Email</label><br />
                    <input type="email" ref="loginmail" placeholder='Type email' className='form-control' style={{ borderColor: this.state.mailValid ? '' : 'red' }} required />
                    <br /><br />

                    <label>Password</label><br />
                    <input type="password" placeholder='Type email' className='form-control' ref="loginpassword" style={{ borderColor: this.state.passValid ? '' : 'red' }} required />
                    <br /><br />
                </form>
                <input type="submit" value="Login" className='btn btn-default' onClick={this.login.bind(this)} />
                <input type="submit" id="regDalogShow" className='btn btn-default' value="Register" onClick={this.showDiag.bind(this)} />
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
