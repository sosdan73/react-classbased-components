import { Fragment, Component } from 'react';
import classes from './UserFinder.module.css'
import UsersContext from "../store/users-context";
import Users from './Users';
import ErrorBoundary from "./ErrorBoundary";

class UserFinder extends Component {
    static contextType = UsersContext;

    constructor() {
        super();
        this.state = {
            filteredUsers: [],
            searchTerm: ''
        }
    }

    componentDidMount() {
        // Send http request
        this.setState({filteredUsers: this.context.users})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({
                filteredUsers: this.context.users.filter(user => user.name.includes(this.state.searchTerm))
            })
        }
    }

    handleSearchChange(event) {
        this.setState({searchTerm: event.target.value})
    }

    render() {
        return (
            // <UserContext.Consumer>
            //     <div className={classes.finder}>
            //         <input type='search' onChange={this.handleSearchChange.bind(this)} />
            //     </div>
            //     <Users users={this.state.filteredUsers} />
            // </UserContext.Consumer>
            <>
                <div className={classes.finder}>
                    <input type='search' onChange={this.handleSearchChange.bind(this)} />
                </div>
                <ErrorBoundary>
                    <Users users={this.state.filteredUsers} />
                </ErrorBoundary>
            </>
        )
    }
}

export default UserFinder;