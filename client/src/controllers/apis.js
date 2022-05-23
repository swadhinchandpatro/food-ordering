import axios from 'axios';

const FETCH_RESTAURANTS_PATH = '/restaurants'

export const fetchServerData = async () => {
  try {
    let result = await axios.get(FETCH_RESTAURANTS_PATH);
    if(!result || /[4-5][0-9]{2}/.test(result.status) || !result.data) {
      return [];
    }
    return result.data;
  } catch (error) {
    return [];
  }
}
