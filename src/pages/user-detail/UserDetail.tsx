import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import { fetchUserDetail, UserDetailModel } from '../../ducks/users';
import { Loading } from '../../bricks';
// import { Button } from '../../bricks';
import './UserDetail.css';

interface UserDetailProps {
  fetchUserDetail: (id: number) => { type: string; id: number };
  userDetail: UserDetailModel;
  match: any;
}

class UserDetail extends Component<UserDetailProps> {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchUserDetail(id);
  }

  render() {
    const { userDetail } = this.props;
    if (!userDetail) {
      return <Loading />;
    }

    return (
      <div className="clearfix user-detail">
        <img className="user-detail__image" src={userDetail.image} alt="user-avatar" />

        <div className="user-detail-basic-info">
          <p className="user-detail-basic-info__name">{userDetail.userName}</p>
          <p>
            <span className="user-detail-basic-info__title">City:</span> {userDetail.city}
          </p>
          <p>
            <span className="user-detail-basic-info__title">County:</span> {userDetail.county}
          </p>

          <div className="user-detail-basic-info__btns">
            <button className="btn btn-info user-detail-basic-info__btn">Like</button>
            <button className="btn btn-info  user-detail-basic-info__btn">Edit</button>
            <button className="btn btn-info ">Delete</button>
          </div>
        </div>

        <div className="clearfix user-detail-specific-info">
          <p>
            <span className="user-detail-specific-info__title">Place of birth: </span>
            {userDetail.placeOfBirth}
          </p>
          <p>
            <span className="user-detail-specific-info__title">Age:</span> {userDetail.age}
          </p>
          <p>
            <span className="user-detail-specific-info__title">Job:</span> {userDetail.job}
          </p>
          <p>
            <span className="user-detail-specific-info__title">Favourite book: </span>
            {userDetail.favourite.book}
          </p>
          <p>
            <span className="user-detail-specific-info__title">Favourite film: </span>
            {userDetail.favourite.film}
          </p>
          <p>
            <span className="user-detail-specific-info__title">Favourite song: </span>
            {userDetail.favourite.song}
          </p>
        </div>

        <div>
          <p className="user-detail__title">Life motto </p>
          <q className="user-detail__motto">{userDetail.favourite.motto}</q>
        </div>

        <p className="user-detail__created-user">
          Created at {format(userDetail.createdAt, 'DD. MMM. YYYY')}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userDetail: state.userDetail,
  };
};

export default connect(mapStateToProps, { fetchUserDetail })(UserDetail);
