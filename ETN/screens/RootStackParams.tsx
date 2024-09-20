export type RootStackParamList = {
    Home: undefined;
    CourseDetails: { course: CourseDetails }; 
    ContactUs: undefined;
    Apply: undefined;
  };
  
  export interface CourseDetails {
    
    title: string;
    fees: string;
    purpose: string;
    content: string[];
  }