"use client";

import { useState } from "react";
import { uploadDescriptionAndImage } from "../servise/descriptions.servise";

export default function DescriptionUpload() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const MAX_FILE_SIZE = 1 * 1024 * 1024;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setImageError("حجم عکس نباید بیشتر از ۱ مگابایت باشد.");
        setPreview(null);
        return;
      }
      setImageError("");
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await uploadDescriptionAndImage(description, image);
      setDescription("");
      setImage(null);
      setPreview(null);
      setImageError("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-100px)]" dir="rtl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 rounded-xl flex-grow">
        <label className="flex flex-col gap-2">
          توضیحات:
          <textarea className="border p-2 rounded" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="لطفاً جزئیات مشکل را توضیح دهید" />
        </label>
        <p className="text-sm text-gray-600 mb-4">توضیحات باید بیشتر از 10 حرف باشد</p>

        <label className="flex flex-col gap-2">
          بارگذاری تصویر (اختیاری):
          <label className="bg-white/30 backdrop-blur border border-dashed border-gray-300 text-gray-700 rounded px-4 py-2 cursor-pointer hover:bg-white/40 transition w-full text-center">
            انتخاب عکس
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          {imageError && <span className="text-red-500 text-sm">{imageError}</span>}
        </label>

        {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded border self-center" />}
      </form>

      <div className="p-4">
        <button
          type="submit"
          disabled={loading || description.length < 10}
          className={`w-full py-2 rounded text-white 
            ${loading || description.length < 10 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}
            `}
          onClick={handleSubmit}
        >
          {loading ? "در حال ارسال..." : "ثبت درخواست"}
        </button>
      </div>
    </div>
  );
}
