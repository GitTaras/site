import React from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from './EditContest.module.sass';
import Input from '../../components/Input/Input';
import MySelect from '../../components/Input/MySelect';
import options from '../../constants/constants';
import { EditContestSchema } from '../../utils/validationForm';
import ExtraInfoContest from '../../components/ExtraInfoContest/ExtraInfoContest';
import { imgUrl } from '../../api/baseURL';
import { toastError } from '../../components/Notification/Notification';
import Checkbox from '../../components/Input/CheckBox';

const FormEditContest = (props) => {
  const {
    contest, user, history, changeContestPicture, match, save,
  } = props;
  const pastTime = moment(contest.createdAt).toNow(true);

  const onSubmit = (values, setSubmitting) => {
    values.industry = values.industry.map(item => item.value);
    save(values);
    setSubmitting(false);
  };

  const onChangeFile = (event) => {
    const FileSize = event.target.files[0].size / 1024 / 1024;
    if (FileSize > 6) {
      return toastError('Picture is too large. Please, upload another photo (max 6 MB).');
    }
    const formData = new FormData();
    formData.append('files', event.target.files[0]);
    changeContestPicture(formData, match.params.id, history);
  };

  const deletePicture = () => {
    const formData = new FormData();
    formData.append('files', '');
    changeContestPicture(formData, match.params.id, history);
  };

  const renderForm = (values, errors, handleChange, handleSubmit, setFieldValue) => (
    <form className={styles.form}>
      <div className={styles.mainContainer}>
        <div className={styles.briefWrapper}>
          <div className={styles.content}>
            <div className={styles.briefCardContainer}>
              <div className={styles.container}>
                <div className={styles.wrapper}>
                  <div className={styles.row}>
                    <span className={styles.title}>Name </span>
                    <Input
                      character="edit"
                      name="name"
                      value={values.name || ''}
                      onChange={handleChange}
                    />
                    <span className={styles.description}>{`(# ${contest.id})`}</span>
                  </div>
                  <div className={`${errors.name && styles.containerError}`}>
                    {errors.name}
                  </div>
                  <div className={styles.row}>
                    <span className={styles.title}>Type </span>
                    <span className={styles.description}>{contest.type}</span>
                    <span className={styles.description}>{`(posted ${pastTime} ago)`}</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.title}>My company</span>
                    <Input
                      character="edit"
                      name="purpose"
                      value={values.purpose || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={`${errors.purpose && styles.containerError}`}>
                    {errors.purpose}
                  </div>
                  <div className={styles.row}>
                    <span className={styles.title}>Type of Industry</span>
                    <div className={styles.industry}>
                      <MySelect
                        options={options.industry}
                        isMulti
                        name="industry"
                        value={values.industry}
                        onChange={setFieldValue}
                      />
                    </div>
                  </div>
                  <div className={`${errors.industry && styles.containerError}`}>
                    {errors.industry}
                  </div>
                  <div className={styles.row}>
                    <span className={styles.title}>Description my business</span>
                  </div>
                  <div className={[styles.row, styles.business].join(' ')}>
                    <div className={[styles.description, styles.business].join(' ')}>
                      <textarea
                        name="businessDo"
                        value={values.businessDo}
                        onChange={handleChange}
                        className={styles.textarea}
                        maxLength={300}
                      />
                    </div>
                  </div>
                  <div className={`${errors.businessDo && styles.containerError}`}>
                    {errors.businessDo}
                  </div>
                  <div className={styles.row}>
                    <span className={styles.title}>Target customer</span>
                  </div>
                  <div className={[styles.row, styles.business].join(' ')}>
                    <div className={[styles.description, styles.business].join(' ')}>
                      <textarea
                        name="targetCustomer"
                        value={values.targetCustomer}
                        onChange={handleChange}
                        className={styles.textarea}
                        maxLength={300}
                      />
                    </div>
                  </div>
                  <div className={`${errors.targetCustomer && styles.containerError}`}>
                    {errors.targetCustomer}
                  </div>
                  <div className={styles.row}>
                    <span className={styles.title}>Preferences for style</span>
                  </div>
                  {options[contest.type].style.map(item => (
                    <div key={item} className={`${styles.row} ${styles.checkboxStyles}`}>
                      <Checkbox
                        name="style"
                        value={item}
                      />
                    </div>
                  ))}
                  {contest.photos
                  && (
                    <>
                      <i className={`fa fa-minus-circle ${styles.deletePictureIcon}`} onClick={deletePicture} />
                      <img
                        src={`${imgUrl}/${contest.owner_id}/${contest.photos}`}
                        alt="photos"
                        className={styles.photoContest}
                      />
                    </>
                  )}
                  <div className={styles.wrapperFile}>
                    <label className={styles.fileContainer}>
                      Change photo
                      <Input type="file" onChange={onChangeFile} multiple name="file" />
                    </label>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.price}>
                      <i className="fa fa-diamond" />
                    </div>
                    <span className={styles.price}>{`$ ${contest.price}`}</span>
                  </div>
                </div>
                <div className={styles.edit}>
                  <span className={styles.title} onClick={handleSubmit}>save</span>
                </div>
              </div>
            </div>
            <ExtraInfoContest {...props} user={user} history={history} pastTime={pastTime} />
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <Formik
      initialValues={{
        name: contest.name,
        purpose: contest.purpose,
        industry: contest.industry.map(item => ({ label: item, value: item })),
        businessDo: contest.businessDo,
        targetCustomer: contest.targetCustomer,
        style: contest.style,
      }}
      validationSchema={EditContestSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({
        values, errors, handleChange, handleSubmit, setFieldValue,
      }) => (
        renderForm(values, errors, handleChange, handleSubmit, setFieldValue)
      )}
    </Formik>
  );
};


FormEditContest.propTypes = {
  save: PropTypes.func.isRequired,
  contest: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  allEntries: PropTypes.arrayOf(PropTypes.any).isRequired,
  serverError: PropTypes.objectOf(PropTypes.any),
};

export default FormEditContest;
