
class HelloWorld extends React.Component {
    render() {
        return (
            <div>
                <h1> Hello world with REACT </h1>
                <h3>
                    current date: {(new Date()).toDateString()}
                </h3>
            </div>
        )
    }
}

ReactDOM.render(
    <HelloWorld />,
    document.getElementById("newcontent")
);