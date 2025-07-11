"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import React from "react";
import ResultDetail from "./ResultDetail";
import { CalculateResult } from "@/types/financial-check-result";
import FooterResult from "./FooterResult";
import Image from "next/image";
import { useSession } from "next-auth/react";

type ResultProps = {
  data: CalculateResult;
  onRetry: () => void;
};

const Result = ({ data, onRetry }: ResultProps) => {
  const { data: session } = useSession();
  const { percent: score, details: indicators } = data;

  const getStatus = (score: number) => {
    if (score === 100)
      return {
        text: "Kondisi keuanganmu saat ini sehat.",
        color: "bg-green-600",
        hex: "#16a34a", // Tailwind green-600
      };
    if (score >= 90)
      return {
        text: "Kondisi keuanganmu cukup sehat. Namun masih ada bagian yang perlu dioptimalkan.",
        color: "bg-green-500",
        hex: "#22c55e", // Tailwind green-500
      };
    if (score >= 41)
      return {
        text: "Kondisi keuanganmu belum optimal. Masih ada yang perlu diperbaiki.",
        color: "bg-orange-600",
        hex: "#ea580c", // Tailwind orange-600
      };
    return {
      text: "Kondisi keuanganmu tidak sehat.",
      color: "bg-red-600",
      hex: "#dc2626", // Tailwind red-600
    };
  };

  const { text, color, hex } = getStatus(score);

  return (
    <div className="bg-white rounded-md shadow-md p-6 flex flex-col items-strecth">
      <div className="flex border-b-[1px] justify-center mb-6">
        <div className="w-25 md:w-30 pb-2">
          <Image
            className="w-full"
            width={100}
            height={100}
            src="/images/Logo-text.png"
            alt="logo"
          />
        </div>
      </div>

      {/* Donut Chart Container */}
      <div className="flex justify-center">
        <div className="relative w-[200px] h-[200px] mb-3 ">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: score, color: `${hex}` },
                  { id: 1, value: 100 - score, color: "#e5e7eb" },
                ],
                innerRadius: 50,
                outerRadius: 90,
                cornerRadius: 4,
                highlightScope: {
                  fade: "none",
                  highlight: "none",
                },
              },
            ]}
            slotProps={{
              tooltip: { trigger: "none" },
            }}
            width={200}
            height={200}
          />

          {/* Centered Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-4xl font-bold text-gray-800">{score}%</span>
          </div>
        </div>
      </div>

      {/* Result Message Box */}
      <div
        className={`relative mt-2 px-6 py-3 text-center text-white rounded-md ${color} w-full max-w-xl mx-auto`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-inherit" />
        <p className="text-sm font-semibold">{text}</p>
      </div>

      <div className="flex pt-5 flex-col items-center justify-center">
        <h2 className="font-semibold">
          Hai, <span>{session?.user?.name}</span> Hasil Financial Check Up Anda
          sudah keluar!
        </h2>
        <p>Mari kita review satu persatu.</p>
      </div>

      {/* Result Detail */}
      <ResultDetail results={indicators} />

      {/* Footer */}
      <FooterResult onRetry={onRetry} />
    </div>
  );
};

export default Result;
