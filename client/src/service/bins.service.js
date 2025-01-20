import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

export const getAllBins = async () => {
  const response = await axios.get(BASE_URL + '/bins');
  return response.data;
};

export const getNewRandomBinId = async () => {
  const response = await axios.get(BASE_URL + '/new_bin_id');
  return response.data;
};
