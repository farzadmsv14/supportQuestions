"use client";

import { useState } from "react";
import { uploadDescriptionAndImage } from "../servise/descriptions.servise";

export default function DescriptionUpload() {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const MAX_IMAGES = 5;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles: File[] = [];
    const validPreviews: string[] = [];
    let hasError = false;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > MAX_FILE_SIZE) {
        hasError = true;
        continue;
      }

      validFiles.push(file);
      validPreviews.push(URL.createObjectURL(file));
    }

    if (hasError) {
      setImageError("حجم هر عکس نباید بیشتر از ۱ مگابایت باشد.");
    } else {
      setImageError("");
    }

    if (validFiles.length === 0) return;

    if (images.length + validFiles.length > MAX_IMAGES) {
      setImageError(`می‌توانید حداکثر ${MAX_IMAGES} عکس آپلود کنید.`);
      return;
    }

    setImages([...images, ...validFiles]);
    setPreviews([...previews, ...validPreviews]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.length < 10) return;

    try {
      setLoading(true);
      await uploadDescriptionAndImage(description, images);
      setDescription("");
      setImages([]);
      setPreviews([]);
      setImageError("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
    setImageError("");
  };

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-100px)]" dir="rtl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 rounded-xl flex-grow">
        <label className="flex flex-col gap-2">
          توضیحات:
          <textarea className="border p-2 rounded" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="لطفاً جزئیات مشکل را توضیح دهید" />
        </label>
        <p className="text-sm text-gray-600 mb-4">توضیحات باید بیشتر از 10 حرف باشد</p>

        <label className="flex flex-col gap-2">
          بارگذاری تصویر (اختیاری):
          <label className="bg-white/30 backdrop-blur border border-dashed border-gray-300 text-gray-700 rounded px-4 py-2 cursor-pointer hover:bg-white/40 transition w-full text-center">
            انتخاب عکس
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
          </label>
          {imageError && <span className="text-red-500 text-sm">{imageError}</span>}
        </label>

        <div className="flex gap-2 flex-wrap mt-2">
          {previews.map((src, index) => (
            <div key={index} className="relative">
              <img src={src} alt={`Preview ${index}`} className="w-32 h-32 rounded border" />
              <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                ×
              </button>
            </div>
          ))}
        </div>
      </form>

      <div className="p-4">
        <button type="submit" disabled={loading || description.length < 10} className={`w-full py-2 rounded text-white ${loading || description.length < 10 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} onClick={handleSubmit}>
          {loading ? "در حال ارسال..." : "ثبت درخواست"}
        </button>
      </div>
    </div>
  );
}
