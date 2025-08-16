import React from 'react';
import ApprovedStudySessions from '../StudySession/ApprovedStudySessions';
import Count from './Count';
import { ContactDetails, FeedbackForm, SupportCards } from './SupportCards';
import EduSlider from './EduSlider';

const Home = () => {
       return (
              <div>
                     <EduSlider/>
                     <ApprovedStudySessions />
                     {/* <Count /> */}
                     {/* <SupportCards /> */}
                     
                     {/* <FeedbackForm /> */}
                     {/* <ContactDetails /> */}
              </div>
       );
};

export default Home;