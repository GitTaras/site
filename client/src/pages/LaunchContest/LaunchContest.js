import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../components/Card/Card';
import Question from '../../components/Question/Question';
import styles from './LaunchContest.module.sass';
import image from '../../constants/images';
import Chat from '../Chat/Chat';

class LaunchContest extends Component {
  chooseType = (typeContest) => {
    const { history } = this.props;
    window.scrollTo(0, 0);
    history.push(`/contest/create/${typeContest}`);
  };

  render() {
    const { openChat } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.popular}>
          <div className={styles.popularText}>
            <span>Our Most Popular Categories</span>
            <span className={styles.smallText}>Pick from our most popular categories, launch a contest and begin
              receiving submissions right away</span>
            <hr className={styles.line} />
          </div>
          <div className={styles.popularCategories}>
            <Card
              type="Name"
              description="Get up and running with the perfect name"
              img={image.companyNamesGrey}
              imgColor={image.companyNamesBlue}
              onClick={() => this.chooseType(['Name'])}
            />
            <Card
              type="Logo"
              description="Kick start your venture with a unique, memorable logo"
              img={image.logosGrey}
              imgColor={image.logosBlue}
              onClick={() => this.chooseType(['Logo'])}
            />
            <Card
              type="Tagline or Slogan"
              description="Connect deeply with your target audience with an on-target tagline"
              img={image.taglineGrey}
              imgColor={image.taglinesBlue}
              onClick={() => this.chooseType(['Tagline'])}
            />
          </div>
        </div>
        <div className={styles.packages}>
          <div className={styles.packagesText}>
            <span>Save With Our Bundle Packages</span>
            <span className={styles.smallText}>Launch multiple contests and pay a discounted bundle price</span>
            <hr className={styles.line} />
          </div>
          <div className={styles.packagesCategories}>
            <Card
              type="Name + Logo"
              darkTheme
              description="Get the essentials needed to establish your brand together and save"
              img={image.companyNamesGrey}
              secondImg={image.logosGrey}
              imgColor={image.companyNamesBlue}
              secondImgColor={image.logosBlue}
              onClick={() => this.chooseType(['Name', 'Logo'])}
            />
            <Card
              type="Name + Tagline"
              darkTheme
              description="Communicate your vision with the perfect Name/Tagline combo"
              img={image.companyNamesGrey}
              secondImg={image.taglineGrey}
              imgColor={image.companyNamesBlue}
              secondImgColor={image.taglinesBlue}
              onClick={() => this.chooseType(['Name', 'Logo'])}
            />
            <Card
              type="Logo + Tagline"
              darkTheme
              description="Description for Logo + Tagline will come here"
              img={image.logosGrey}
              secondImg={image.taglineGrey}
              imgColor={image.logosBlue}
              secondImgColor={image.taglinesBlue}
              onClick={() => this.chooseType(['Logo', 'Tagline'])}
            />
            <Card
              type="Name + Logo + Tagline"
              darkTheme
              description="Establish your entire brand identity and save with this bundle."
              img={image.companyNamesGrey}
              secondImg={image.logosGrey}
              thirdImg={image.taglineGrey}
              imgColor={image.companyNamesBlue}
              secondImgColor={image.logosBlue}
              thirdImgColor={image.taglinesBlue}
              onClick={() => this.chooseType(['Name', 'Logo', 'Tagline'])}
            />
          </div>
        </div>
        <Chat openChat={openChat} />
        <Question />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  openChat: state.chatReducer.openChat,
});

LaunchContest.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(LaunchContest);
