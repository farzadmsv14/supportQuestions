"use client";

import React, { useEffect, useState } from "react";
import { getSupportQuestions, getSupportQuestions2 } from "../servise/support.Servise";
import DescriptionUpload from "./descriptions";
import { AnimatePresence, motion } from "framer-motion";

const Support = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [history, setHistory] = useState<{ id: number }[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [cache, setCache] = useState<Record<number, Question[]>>({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const data = await getSupportQuestions();
    setQuestions(data);
    setHistory([]);
    setOpenId(null);
    setCache({ 0: data });
  };

  const handleClick = async (item: Question) => {
    console.log(cache);

    if (item.answer) {
      setOpenId(openId === item.id ? null : item.id);
      return;
    }
    try {
      setHistory((prev) => [...prev, { id: item.id }]);
      if (cache[item.id]) {
        setQuestions(cache[item.id]);
        setOpenId(null);
        return;
      }
      const data = await getSupportQuestions2({ id: item.id });
      setQuestions(data);
      setOpenId(null);
      setCache((prev) => ({ ...prev, [item.id]: data }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = async () => {
    console.log(cache);

    const newHistory = [...history];
    newHistory.pop();

    if (newHistory.length === 0) {
      setQuestions(cache[0]);
      setHistory([]);
      setOpenId(null);
    } else {
      const prev = newHistory[newHistory.length - 1];

      if (cache[prev.id]) {
        setQuestions(cache[prev.id]);
        setHistory(newHistory);
        setOpenId(null);
      }
    }
  };

  return (
    <div dir="rtl" className="p-4 sm:p-10">
      <div className="flex">
        {history.length > 0 && (
          <button onClick={handleBack} className="ms-3 text-black hover:text-red-600 transition text-2xl sm:text-3xl">
            ➔
          </button>
        )}
        <h1 className="text-xl sm:text-2xl font-bold text-start IRANSans">پشتیبانی</h1>
      </div>
      <div className="mt-6 space-y-4">
        <div className="w-full text-right p-4 transition-colors flex flex-col justify-between items-start border-b border-gray-300">
          <h2 className="text-base sm:text-lg font-bold mb-2">در حال حاضر سفارشی ندارید</h2>
          <p className="m-0 text-sm sm:text-base">متاسفانه این قابلیت در حال حاضر برای شما در دسترس نیست. اعلام مشکل در ۳۰ روز گذشته، سفارشی با پرداخت شما ثبت نشده.</p>
        </div>
      </div>
      <div className="">
        <h2 className="text-base sm:text-lg font-bold my-4">سوالات متداول</h2>
      </div>
      {questions.map((item) => (
        <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="my-3">
          <button
            onClick={() => handleClick(item)}
            className={`w-full text-right p-4 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors 
              flex justify-between items-center cursor-pointer ${item.answer && openId === item.id ? "border-b-0 rounded-b-none" : ""}
              `}>
            <div>
              <h2 className="text-base sm:text-lg font-bold mb-2">{item.question}</h2>
              <p className="m-0 text-sm sm:text-base">{item.description}</p>
            </div>
            {item.answer && <span className="mx-2 text-xl">{openId === item.id ? "-" : "+"}</span>}
          </button>
          <AnimatePresence>
            {item.answer && openId === item.id && (
              <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden bg-white border border-t-0 border-gray-300 rounded-b-lg text-sm sm:text-base leading-relaxed">
                <div className="p-4">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      <DescriptionUpload />
    </div>
  );
};

export default Support;
