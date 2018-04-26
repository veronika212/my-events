import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import { fetchUsers, User } from '../../ducks/users';
import './users.css';

interface UsersProps {
  fetchUsers: () => { type: string };
  users: User[];
}

class Users extends Component<UsersProps> {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    const { users } = this.props;
    return users.map(singleUser => {
      return (
        <li className="clearfix user-item" key={singleUser.id}>
          <Link to={`/user/${singleUser.id}`}>
            <img className="user-item__image" src={singleUser.image} alt="avatar" />
          </Link>

          <div className="user-item__info">
            <p className="user-item__info-name">
              <Link to={`/user/${singleUser.id}`} className="user-item__info-name_link">
                {singleUser.userName}
              </Link>
            </p>
            <p>
              <span className="information">Job:</span> {singleUser.job}
            </p>
            <p>
              <span className="information">City:</span> {singleUser.city}
            </p>
            <p>
              <span className="information">County:</span> {singleUser.county}
            </p>
            <p>
              <span className="information">Age:</span> {singleUser.age}
            </p>

            <p className="information__create-date">
              Created at {format(singleUser.createdAt, 'DD. MMM. YYYY')}
            </p>
          </div>

          <div className="information__motto">
            <p className="information">Life motto</p>
            <q className="information__motto-content"> {singleUser.favourite.motto} </q>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="users">
        <h4 className="users__title">USERS LIST</h4>
        <ul className="users__list">{this.renderUsers()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { fetchUsers })(Users);
