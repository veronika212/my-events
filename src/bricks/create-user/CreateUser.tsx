import React from 'react';
import { connect } from 'react-redux';

import UserForm from '../../components/user-form/UserForm';
import { createUser } from '../../ducks/users';

const CreateUser = props => {
  const handleFormSubmit = values => {
    props.createUser(values, () => {
      props.history.push('/users');
    });
  };

  return (
    <div>
      <UserForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default connect(null, { createUser })(CreateUser);
