// api.js
import axios from 'axios';

export const fetchEvents = async () => {
  const response = await axios.get('https://us-central1-events-network-cc384.cloudfunctions.net/api/events');
  return response.data;
};
