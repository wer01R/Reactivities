import axios from "axios";

const sleep = (delay: number) => {
  return new Promise((resolve => {
    setTimeout(resolve, delay);
  }))
}

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

agent.interceptors.response.use(async response => {
  try {
    await sleep(500);
    return response;
  } catch(err) {
    console.log(err);
    return Promise.reject(err);
  }
})

export default agent;