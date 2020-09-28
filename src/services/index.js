import axios from 'axios';
import { FINN_HUB_API_URL } from '../config';

export const finnHubService = axios.create({
  baseURL: FINN_HUB_API_URL
});