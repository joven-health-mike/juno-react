import ApiCalendar from 'react-google-calendar-api';

const config = {
  clientId:
    '83459608400-u9dmcp8c2abrv5n9bkq0gb7s94pc7g8g.apps.googleusercontent.com',
  apiKey: 'AIzaSyC9AXgEjG1oTDRwun_Q6tyQ0kqRgn-rRlk',
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ],
};

export const apiCalendar = new ApiCalendar(config);
