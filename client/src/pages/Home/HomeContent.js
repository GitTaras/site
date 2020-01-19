import React  from 'react';
import styles from "./Home.module.sass";
import DashboardHeader from "../../components/Header/DashboardHeader";
import Header from "../../components/Header/Header";
import images from "../../constants/images";
import Button from "../../components/Button/Button";
import CarouselNames from "../../components/Carousel/CarouselNames";
import CarouselForSale from "../../components/Carousel/CarouselForSale";
import CarouselCustomers from "../../components/Carousel/CarouselCustomers";
import Footer from "../../components/Footer/Footer";

const HomeContent = (props) => {
  const {user, history, logoff, startContest} = props;
  return (
    <div className={styles.container}>
      {user
        ? <DashboardHeader history={history} user={user} logoff={logoff}/>
        : <Header history={history}/>}
      <div className={styles.wrapper}>
        <div className={styles.logoStart}>
          <img src={images.colorLogo} alt="logo"/>
          <div className={styles.logoStartNavigation}>
            <span className={styles.myDashboard} onClick={() => history.push('/dashboard/active')}>Dashboard</span>
            <div className={styles.logoStartBtn}>
              <Button content="start contest" btnStyle="home" onClick={startContest}/>
            </div>
          </div>
        </div>
        <div className={styles.title}>
          <span className={styles.mainText}>Find the Perfect Name for a Company</span>
          <span className={styles.firstLine}>
Launch a naming contest to engage hundreds of naming experts as
              you’re guided through our agency-level naming process.
            {' '}
            </span>
          <span className={styles.secondLine}>
Or, explore our hand-picked collection of premium names available
              for immediate purchase
            </span>
          <div className={styles.btnStartContest}>
            <Button content="start a contest" btnStyle="create" onClick={startContest}/>
            <span>or</span>
            <Button content="explore names for sale" btnStyle="home"/>
          </div>
        </div>
      </div>
      <div className={styles.slider}>
        <div className={styles.sliderWrapper}>
          <CarouselNames/>
          <div className={styles.sliderBtn}>
            <Button content="more names examples" btnStyle="home"/>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.centerText}>
          <span>Why Squadhelp?</span>
          <hr/>
        </div>
        <div className={styles.advantages}>
          <div className={styles.item}>
            <img src={images.community} alt="community"/>
            <span className={styles.text}>Largest Naming Community</span>
            <span className={styles.description}>
Our unique approach allows you to receive an unmatched breadth of
                business name ideas from world's
                largest community of naming experts. With 75,000+ creatives and 15,000+ successful naming projects,
                Squadhelp is by far the largest naming platform across the globe .
              </span>
          </div>
          <div className={styles.item}>
            <img src={images.quality} alt="community"/>
            <span className={styles.text}>High Quality & Collaboration</span>
            <span className={styles.description}>
Using an advanced Quality Scoring Algorithm and Machine Learning,
                we ensure that you receive more ideas from our top-quality creatives, and Gamification best practices
                ensure two-way communication throughout your contest.
              </span>
          </div>
          <div className={styles.item}>
            <img src={images.trademark} alt="community"/>
            <span className={styles.text}>Agency-Level Features</span>
            <span className={styles.description}>
Squadhelp's high end Audience Testing service allows you to poll
                your target demographics to get unbiased feedback on your favorite names. Also receive Trademark
                support from our team of Licensed Trademark Attorneys, so you can pick your name with confidence.
              </span>
          </div>
        </div>
      </div>
      <div className={styles.brands}>
        <div className={styles.brandWrapper}>
          <div className={styles.firstLineBrands}>
            <img src={images.forbes} alt="forbes"/>
            <img src={images.web} alt="web"/>
            <img src={images.chicago} alt="chicago"/>
            <img src={images.mashable} alt="mashable"/>
          </div>
          <div className={styles.secondLineBrands}>
            <div className={styles.counting}>
              <span>115,635</span>
              <span>Creatives</span>
            </div>
            <div className={`${styles.counting} ${styles.border}`}>
              <span>21,717 </span>
              <span>Customers</span>
            </div>
            <div className={styles.counting}>
              <span>85 </span>
              <span>Industries</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.centerText}>
          <span>How Do Name Contests Work?</span>
        </div>
        <div className={styles.steps}>
          <div className={styles.StepWrapper}>
            <div className={styles.stepsText}>
              <span className={styles.nameStep}>Step 1: Launch a Naming Contest</span>
              <div className={styles.stepsItem}>
                <i className="fa fa-check"/>
                <span>Start your project right with our proven Naming Brief template</span>
              </div>
              <div className={styles.stepsItem}>
                <i className="fa fa-check"/>
                <span>
We’ll walk you through exactly what you need to share about your project in order
                  to get an awesome Name
                  </span>
              </div>
            </div>
            <img src={images.step1} alt="step1" className={styles.stepsImg}/>
          </div>
        </div>
      </div>
      <div className={styles.secondStep}>
        <div className={styles.secondStepWrapper}>
          <img src={images.step2} alt="step2" className={styles.stepsImg}/>
          <div className={styles.stepsText2}>
            <span className={styles.nameStep2}>Step 2: Ideas start pouring in within minutes</span>
            <div className={styles.stepsItem2}>
              <i className="fa fa-check"/>
              <span>100s of naming experts start submitting name ideas</span>
            </div>
            <div className={styles.stepsItem2}>
              <i className="fa fa-check"/>
              <span>Names automatically checked for URL availability</span>
            </div>
            <div className={styles.stepsItem2}>
              <i className="fa fa-check"/>
              <span>Instantly screened for Trademark conflicts</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.thirdStep}>
        <div className={styles.thirdStepWrapper}>
          <div className={styles.stepsText3}>
            <span className={styles.nameStep3}>Step 3. Rate Entries & Brainstorm with Creatives</span>
            <div className={styles.stepsItem3}>
              <i className="fa fa-check"/>
              <span>Provide instant feedback on Names</span>
            </div>
            <div className={styles.stepsItem3}>
              <i className="fa fa-check"/>
              <span>Send private feedback or public messages to all creatives</span>
            </div>
            <div className={styles.stepsItem3}>
              <i className="fa fa-check"/>
              <span>The more entries you rate - the submissions get better and better</span>
            </div>
          </div>
          <img src={images.step3} alt="step3" className={styles.stepsImg}/>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.centerText}>
          <span>Names For Sale</span>
          <span className={styles.extraText}>
Not interested in launching a contest? Purchase
              a name instantly from our hand-picked collection
              of premium names. Price includes a complimentary Trademark Report,
              a Domain name as well as a Logo design
            </span>
          <hr/>
        </div>
        <CarouselForSale/>
        <div className={styles.conclusionBtn}>
          <Button content="view all names for sale" btnStyle="home"/>
        </div>
      </div>
      <div className={styles.customersSay}>
        <div className={styles.customersSayWrapper}>
          <div className={styles.customerText}>
            <span>How Do Name Contests Work?</span>
            <hr/>
          </div>
          <CarouselCustomers/>
          <div className={styles.customersSayBtn}>
            <Button content="View All" btnStyle="white"/>
          </div>
        </div>
      </div>
      <div className={styles.basement}>
        <div className={styles.basementWrapper}>
          <div className={styles.basementBtn}>
            <Button content="start your contest" btnStyle="create" onClick={startContest}/>
          </div>
          <div className={styles.basementCol}>
            <div className={styles.circleImg}>
              <img src={images.cash} alt="cash"/>
            </div>
            <div className={styles.basementText}>
              <span>Pay a Fraction of cost vs hiring an agency</span>
              <span>For as low as $199, you can receive agency quality work from creatives across the globe</span>
            </div>
          </div>
          <div className={styles.basementCol}>
            <div className={styles.circleImg}>
              <img src={images.satisfaction} alt="satisfaction"/>
            </div>
            <div className={styles.basementText}>
              <span>Satisfaction Guarantee</span>
              <span>Complimentary Extension of your contest and consultation until you are satisfied</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.questions}>
        <div className={styles.questionsText}>
          <span>Questions?</span>
          <span>Speak with a Squadhelp platform expert to learn more and get your questions answered.</span>
          <div className={styles.questionsPhone}>
            <img src={images.phone} alt="phone"/>
            <span> (877) 355-3585</span>
          </div>
        </div>
        <div className={styles.questionsBtn}>
          <Button content="schedule consultation" btnStyle="home"/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomeContent;