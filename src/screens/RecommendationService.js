import axios from 'axios';

export const getRecommendations = async (workshop) => {
  try {
    const response = await axios.get('https://us-central1-events-network-cc384.cloudfunctions.net/api/events');
    const workshops = response.data;

    // console.log('Workshops:', workshops);

    const selectedWorkshop = workshops.find((item) => item.Workshop === workshop);
    const genre = selectedWorkshop ? selectedWorkshop.Genre : '';

    const filteredWorkshops = workshops.filter((item) => {
      return item.Genre === genre && item.Ratings >= 4;
    });

    // console.log('Filtered Workshops:', filteredWorkshops);

    if (filteredWorkshops.length === 0) {
      console.log('No recommendations found.');
      return [];
    }

    const sortedWorkshops = filteredWorkshops.sort((a, b) => b.Ratings - a.Ratings);

    // console.log('Sorted Workshops:', sortedWorkshops);

    return sortedWorkshops;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};
