import axios from "axios";
import Cookies from "js-cookie";


const API_URL = 'http://localhost:8080/api'

export const $axios = axios.create({
   baseURL: API_URL,
   headers: {
      'Content-Type': 'application/json',
      Authorization: Cookies.get('Blitzo&Stolas') ? `Bearer ${Cookies.get('Blitzo&Stolas')}` : ''
   }
})