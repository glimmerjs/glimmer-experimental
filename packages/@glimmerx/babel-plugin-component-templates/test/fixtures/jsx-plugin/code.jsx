class MyJSXComponent extends Component {
    firstName = "Bob"
    static template({ lastName }) {
        return <div>{this.firstName} { lastName }</div>;
    }
}