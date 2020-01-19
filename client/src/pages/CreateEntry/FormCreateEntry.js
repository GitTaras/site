import React, { useState } from 'react';
import { Formik } from 'formik';
import _ from 'lodash';
import styles from './CreateEntry.module.sass';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { checkingDataCreateEntry } from '../../utils/validationForm';
import { toastError } from '../../components/Notification/Notification';

const FormCreateEntry = (props) => {
  const [selectedFile, setFile] = useState('');
  const [requeriedPhoto, setRequeriedPhoto] = useState('');
  const { contest } = props;
  const onChangeFile = (event) => {
    const FileSize = event.target.files[0].size / 1024 / 1024;
    if (FileSize > 6) {
      return toastError('Picture is too large. Please, upload another photo (max 6 MB).');
    }
    setRequeriedPhoto('');
    return setFile(event.target.files[0]);
  };

  const onSubmit = (values, setSubmitting) => {
    const {
      history, user, match, createEntry, contest
    } = props;
    const formData = new FormData();
    const data = _.cloneDeep(values);
    data.user = user.id;
    if (!selectedFile && contest.type === 'Logo') {
      return setRequeriedPhoto('Choose file!');
    }
    if (contest.type !== 'Logo') {
      createEntry(data, match.params.id, history, contest.owner_id);
      setSubmitting(false);
      return;
    }
    formData.append('files', selectedFile);
    formData.append('formData', JSON.stringify(data));
    createEntry(formData, match.params.id, history, contest.owner_id);
    setSubmitting(false);
  };

  const renderForm = (values, errors, handleChange, handleSubmit) => {
    const { error, contest } = props;
    return (
      <form className={styles.form}>
        <div className={styles.wrapperInput}>
          <h3 className={styles.title}>Your suggestion</h3>
          <div className={(error || requeriedPhoto) && styles.serverError}>
            {error || requeriedPhoto}
          </div>
          {contest && contest.type !== 'Logo'
            ? (
              <>
                <div className={styles.containerInput}>
                  <Input
                    wrongdata={errors.suggestion && 'wrongdata'}
                    character="entry"
                    placeholder="Your offer"
                    type="text"
                    name="suggestion"
                    value={values.suggestion}
                    onChange={handleChange}
                  />
                </div>
                <div className={errors.suggestion && styles.containerError}>
                  {errors.suggestion}
                </div>
              </>
            )
            : (
              <div className={styles.wrapperFile}>
                <label className={styles.fileContainer}>
                  Choose file
                  <Input type="file" onChange={onChangeFile} multiple name="file"/>
                </label>
                <label className={styles.labelPhotoName}>{selectedFile.name}</label>
              </div>
            )}
            <Button content="Send" btnStyle="entry" onClick={handleSubmit}/>
        </div>
      </form>
    );
  };

  return (
    <Formik
      initialValues={{
        suggestion: '',
      }}
      validate={values => checkingDataCreateEntry(values, contest)}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({
          values, errors, handleChange, handleSubmit,
        }) => (
        renderForm(values, errors, handleChange, handleSubmit)
      )}
    </Formik>
  );
};

export default FormCreateEntry;
