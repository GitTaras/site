import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import style from './EditAccount.module.sass';
import {Formik} from 'formik';
import {editAccount} from '../../actions/actionCreator';
import Input from "../../components/Input/Input";
import {EditAccountSchema} from "../../utils/validationForm";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";

const EditAccount = (props) => {
  const {user, history, editAccount} = props;

  const onSubmit = (values, setSubmitting) => {
    editAccount(values, history);
    setSubmitting(false);
  };

  const renderForm = (values, errors, handleChange, handleSubmit, setFieldValue) => {
    return <form>
      <div className={style.row}>
        First name:
        <Input
          character="edit"
          name="firstName"
          value={values.firstName || ''}
          onChange={handleChange}
        />
      </div>
      <div className={`${errors.firstName && style.containerError}`}>
        {errors.firstName}
      </div>
      <div className={style.row}>
        Last name:
        <Input
          character="edit"
          name="lastName"
          value={values.lastName || ''}
          onChange={handleChange}
        />
      </div>
      <div className={`${errors.lastName && style.containerError}`}>
        {errors.lastName}
      </div>
      <div className={style.row}>
        Email:
        <Input
          character="edit"
          name="email"
          value={values.email || ''}
          onChange={handleChange}
        />
      </div>
      <div className={`${errors.email && style.containerError}`}>
        {errors.email}
      </div>
      <div className={style.confirm}>
        <span className={style.cancel} onClick={() => history.push('/dashboard/account')}>cancel</span>
        <span className={style.save} onClick={handleSubmit}>save</span>
      </div>
    </form>
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h3 className={style.title}>Your personal data</h3>
        <div className={style.userInfo}>
          <ProfilePicture user={user} size={'large'}/>
          <div className={style.personalData}>
            <Formik
              initialValues={{
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              }}
              validationSchema={EditAccountSchema}
              onSubmit={(values, {setSubmitting}) => {
                onSubmit(values, setSubmitting);
              }}
            >
              {({
                  values, errors, handleChange, handleSubmit, setFieldValue,
                }) => (
                renderForm(values, errors, handleChange, handleSubmit, setFieldValue)
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  editAccount: (dataUser, history) => dispatch(editAccount(dataUser, history)),
});

EditAccount.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
