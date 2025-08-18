import React from 'react';
import ApprovedStudySessions from '../StudySession/ApprovedStudySessions';
import Count from './Count';
import { ContactDetails, FeedbackForm, SupportCards } from './SupportCards';
import EduSlider from './EduSlider';
import FreeSessionsSlider from './FreeSessionsSlider';
import Testimonials from '../../Component/Testimonials/Testimonials';

const Home = () => {
       return (
              <div>
                     <EduSlider/>
                    
                     <ApprovedStudySessions />
                     <Count />
                      <FreeSessionsSlider/>
                     <SupportCards />
                     <Testimonials/>
                     <FeedbackForm />
                     <ContactDetails />
              </div>
       );
};

export default Home;