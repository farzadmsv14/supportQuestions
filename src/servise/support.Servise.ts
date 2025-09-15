import axios from "axios";
import env from "@/environment";

export const getSupportQuestions = async () => {
  const response = await axios.get(env.apiBaseUrl);
  return response.data;
};

export const getSupportQuestions2 = async (params: { id: number }) => {
  const response = await axios.get(env.apiBaseUrl2, { params });
  return response.data;
};


// export const getSupportQuestions2 = async (params: { id: number }) => {
//   const url = `${env.apiBaseUrl2}/${params.id}`;
//   const response = await axios.get(url);
//   return response.data;
// };