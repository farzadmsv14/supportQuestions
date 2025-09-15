import axios from "axios";

const API_URL = "https://mocki.io/v1/8902a508-f208-4fd9-a6d4-67309e746d66";

export async function uploadDescriptionAndImage(description: string, image: File | null) {
  const formData = new FormData();
  formData.append("description", description);

  if (image) {
    formData.append("image", image);
  }

  const res = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}
