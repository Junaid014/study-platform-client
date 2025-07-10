import React from 'react';
import ApprovedStudySessions from '../StudySession/ApprovedStudySessions';
import Count from './Count';
import { ContactDetails, FeedbackForm, SupportCards } from './SupportCards';

const Home = () => {
       return (
              <div>

                     <ApprovedStudySessions />
                     <Count />
                     <SupportCards />
                     <ContactDetails />
                     <FeedbackForm />
              </div>
       );
};

export default Home;