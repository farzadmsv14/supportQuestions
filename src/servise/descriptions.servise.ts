import axios from "axios";
import env from "@/environment";

export async function uploadDescriptionAndImage(description: string, images: File[]) {
  const formData = new FormData();
  formData.append("description", description);
  images.forEach((image, index) => {
    formData.append("images", image);
  });
  console.log(formData);
  const res = await axios.post(env.apiBaseUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
}
