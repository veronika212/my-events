import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './user-form.css';
import '../../App.css';
import { createUser } from '../../ducks/users';
import { required, isNumber } from '../../helpers/FormHelpers';

interface UserFormData extends InjectedFormProps {
  userName?: string;
  county?: string;
  city: string;
  placeOfBirth: string;
  age: number;
  job: string;
  favourite: {
    book: string;
    song: string;
    motto: string;
    film: string;
  };
  createUser: any;
}

const selectOptionsCounty = [
  {
    label: 'County',
    value: '',
  },
  {
    label: 'Banskobystricky kraj',
    value: 'Banskobystricky kraj',
  },
  {
    label: 'Bratislavsky kraj',
    value: 'Bratislavsky kraj',
  },
  {
    label: 'Nitriansky kraj',
    value: 'Nitriansky kraj',
  },
  {
    label: 'Presovsky kraj',
    value: 'Presovsky kraj',
  },
  {
    label: 'Kosicsky kraj',
    value: 'Kosicsky kraj',
  },
  {
    label: 'Trenciansky kraj',
    value: 'Trenciansky kraj',
  },
  {
    label: 'Trnavsky kraj',
    value: 'Trnavsky kraj',
  },
  {
    label: 'Zilinsky kraj',
    value: 'Zilinsky kraj',
  },
];

class UserFormPresenter extends Component<UserFormData> {
  onSubmit = values => {
    this.props.createUser(values, () => {
      console.log('calback');
    });
  };

  renderInput = field => {
    const {
      meta: { touched, error },
    } = field;
    const className = `${touched && error ? 'input-error' : ''}`;
    return (
      <div className={className}>
        <input
          {...field.input}
          className="form-control"
          type="text"
          placeholder={field.placeholder}
        />
        <div>{touched ? error : ''}</div>
      </div>
    );
  };

  renderSelect = (name, options) => {
    return (
      <Field className="form-control" name={name} component="select" validate={[required]}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    );
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container-fluid">
        <form className="user-form" onSubmit={handleSubmit(this.onSubmit)}>
          <h4 className="user-form__title">Form of user</h4>
          <div className="row clearfix">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 user-form__item">
              <Field
                name="userName"
                component={this.renderInput}
                placeholder="Name of user"
                validate={[required]}
              />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6  user-form__item">
              <Field
                name="job"
                component={this.renderInput}
                placeholder="Job"
                validate={[required]}
              />
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 user-form__item">
              {this.renderSelect('caunty', selectOptionsCounty)}
            </div>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6  user-form__item">
              <Field
                name="city"
                component={this.renderInput}
                placeholder="City"
                validate={[required]}
              />
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6  user-form__item">
              <Field
                name="placeOfBirth"
                component={this.renderInput}
                placeholder="Place of birth"
                validate={[required]}
              />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 user-form__item">
              <Field
                name="age"
                component={this.renderInput}
                placeholder="Age"
                validate={[required, isNumber]}
              />
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6  user-form__item">
              <Field
                name="favourite.book"
                component={this.renderInput}
                placeholder="Favourite book"
                validate={[required]}
              />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 user-form__item">
              <Field
                name="favourite.film"
                component={this.renderInput}
                placeholder="Favourite film"
                validate={[required]}
              />
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 -md-6 user-form__item">
              <Field
                name="favourite.song"
                component={this.renderInput}
                placeholder="Favourite song"
                validate={[required]}
              />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6  user-form__item">
              <Field
                name="favourite.motto"
                component={this.renderInput}
                placeholder="Favourite life motto"
                validate={[required]}
              />
            </div>
          </div>

          <div className="user-form-button">
            <button type="submit" className="btn btn-primary user-form-button__left-btn">
              Submit
            </button>
            <Link to="/" className="btn btn-danger">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const UserForm = connect(null, { createUser })(UserFormPresenter);

export default reduxForm({
  form: 'userForm',
})(UserForm);
