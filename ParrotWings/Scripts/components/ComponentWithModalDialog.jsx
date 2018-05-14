class ComponentWithModalDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: props.show,
            text: props.text,
            float: props.float
        }
    }
    render() {
        if (this.props.show) {
            return <span style={{ float: this.state.float, color: 'red' }}>{this.state.text}</span>;
        }
        else {
            return <span></span>;
        }
    }
}