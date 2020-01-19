import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import options from '../../constants/constants';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Input/CheckBox';
import MySelect from '../../components/Input/MySelect';
import { CreateContestSchema } from '../../utils/validationForm';
import styles from './CreateContest.module.sass';
import { toastError } from '../../components/Notification/Notification';

const FormCreateContest = (props) => {
  const {
    match, user, history, send, currentType
  } = props;
  const [selectedFile, setFile] = useState('');
  const packageTypes = match.params.type.split(',');
  const currentCases = options[currentType];

  const onSubmit = (values, setSubmitting, resetForm) => {
    const data = shapeFullContest(values, selectedFile.name);
    send(data, selectedFile);
    setSubmitting(false);
    resetForm();
    setFile('');
  };

  const shapeFullContest = (values, fileName) => {
    const data = { ...values };
    if (currentType === 'Name') {
      data.purpose = values.purpose.value;
    }
    data.industry = values.industry.map(item => item.value);
    data.owner_id = user.id;
    data.type = currentType;
    data.price = Math.round(100 / packageTypes.length);
    data.package = packageTypes;
    data.photos = fileName;
    return data;
  };

  const onChangeFile = (event) => {
    const FileSize = event.target.files[0].size / 1024 / 1024;
    if (FileSize > 6) {
      return toastError('Picture is too large. Please, upload another photo (max 6 MB).');
    }
    return setFile(event.target.files[0]);
  };

  const renderForm = (values, errors, handleChange, handleSubmit,
    setFieldValue, setFieldTouched, currentCases) => (
      <form>
        <div className={styles.title}>
          <div className={styles.text}>
            <span>{currentType}</span>
            <span>
Tell us a bit more about your business as well as your preferences so that creatives get a better
          idea about what you are looking for
            </span>
          </div>
        </div>
        <div className={styles.fields}>
          <div className={styles.wrapperField}>
            <>
              <span>Title of your contest</span>
              <Input
                character="contest"
                name="name"
                value={values.name}
                wrongdata={errors.name && 'wrongdata'}
                onChange={handleChange}
              />
            </>
            <div className={`${errors.name && styles.containerError}`}>
              {errors.name}
            </div>
          </div>
          {currentType === 'Name' ? (
            <div className={styles.wrapperField}>
              <>
                <span>What type of Name are you looking for?</span>
                <MySelect
                  value={values.purpose}
                  options={currentCases.purpose}
                  placeholder={values.purpose}
                  onChange={setFieldValue}
                  name="purpose"
                />
              </>
              <div className={`${errors.purpose && styles.containerError}`}>
                {errors.purpose}
              </div>
            </div>
          ) : (
            <div className={styles.wrapperField}>
              <>
                <span>Name of the company / business?</span>
                <Input
                  character="contest"
                  name="purpose"
                  value={values.purpose}
                  onChange={handleChange}
                />
              </>
              <div className={`${errors.purpose && styles.containerError}`}>
                {errors.purpose}
              </div>
            </div>
          )
        }
          <div className={styles.wrapperField}>
            <span>Type of Industry</span>
            <MySelect
              options={options.industry}
              isMulti
              name="industry"
              onChange={setFieldValue}
              value={values.industry}
            />
            <div className={`${errors.industry && styles.containerError}`}>
              {errors.industry}
            </div>
          </div>
          <div className={styles.wrapperField}>
            <span>What does your company or business do?</span>
            <Input
              character="contest"
              name="businessDo"
              value={values.businessDo}
              wrongdata={errors.businessDo && 'wrongdata'}
              onChange={handleChange}
            />
            <div className={`${errors.businessDo && styles.containerError}`}>
              {errors.businessDo}
            </div>
          </div>
          <div className={styles.wrapperField}>
            <>
              <span>Who are your target customers?</span>
              <Input
                character="contest"
                name="targetCustomer"
                value={values.targetCustomer}
                wrongdata={errors.targetCustomer && 'wrongdata'}
                onChange={handleChange}
              />
            </>
            <div className={`${errors.targetCustomer && styles.containerError}`}>
              {errors.targetCustomer}
            </div>
          </div>
          <div className={styles.wrapperField}>
            <span>Preferences for style (Choose one or more)</span>
            {currentCases && currentCases.style.map(item => (
              <div key={item}>
                <Checkbox
                  name="style"
                  value={item}
                />
              </div>
            ))}
          </div>
          <div className={styles.wrapperField}>
            <span>You can upload a file as well</span>
            <div className={styles.wrapperFile}>
              <label className={styles.fileContainer}>
              Choose file
                <Input type="file" onChange={onChangeFile} multiple name="file" />
              </label>
              <label className={styles.labelPhotoName}>{selectedFile.name}</label>
            </div>
          </div>
        </div>
        <div className={styles.nextStep}>
          <div className={styles.wrapperNavigation}>
            <span>You are almost finished. Select a pricing package in the next step</span>
            <div className={styles.navigationBtn}>
              <Button btnStyle="back" content="back" onClick={history.goBack} />
              <Button btnStyle="next" content="next" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </form>
  );

  return (
    <Formik
      initialValues={{
        name: '',
        purpose: [],
        industry: [],
        businessDo: '',
        targetCustomer: '',
        style: [],
      }}
      validationSchema={CreateContestSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values, setSubmitting, resetForm);
      }}
    >
      {({
        values, errors, handleChange, handleSubmit, setFieldValue, setFieldTouched,
      }) => (
        renderForm(values, errors, handleChange, handleSubmit,
          setFieldValue, setFieldTouched, currentCases)
      )}
    </Formik>
  );
};

FormCreateContest.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

FormCreateContest.defaultProps = {
  user: {},
};

export default FormCreateContest;
