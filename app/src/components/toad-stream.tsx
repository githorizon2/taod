"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export function ToadStreamComponent() {
  const [isLive, setIsLive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#89C7F4] relative overflow-hidden">
      <div className="z-10 flex flex-col items-center w-full max-w-7xl px-4 py-8">
        <header className="w-full flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-white text-shadow">
              Toad's Livestream
            </h1>
          </div>
        </header>

        <main className="w-full">
          <div
            className={`relative w-full aspect-video rounded-lg overflow-hidden ${
              isLive ? "border-green-500" : "border-red-500"
            } border-8 transition-colors duration-300`}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover bg-black"
            />
            <div
              className={`absolute top-4 left-4 ${
                isLive ? "bg-green-500" : "bg-red-500"
              } text-white px-2 py-1 rounded-full text-sm font-bold flex items-center transition-colors duration-300`}
            >
              <div
                className={`w-2 h-2 ${
                  isLive ? "bg-white" : "bg-red-200"
                } rounded-full mr-2 ${isLive ? "animate-pulse" : ""}`}
              />
              {isLive ? "LIVE" : "OFFLINE"}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              className="bg-[#FDE101] text-black hover:bg-[#FFB900]"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.play();
                }
              }}
            >
              Start Watching
            </Button>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .cloud {
          position: absolute;
          width: 200px;
          height: 60px;
          background-color: white;
          border-radius: 200px;
          animation: float 10s ease-in-out infinite;
        }

        .cloud:before,
        .cloud:after {
          content: "";
          position: absolute;
          background-color: white;
          width: 100px;
          height: 80px;
          top: -15px;
          left: 10px;
          border-radius: 100px;
        }

        .cloud:after {
          width: 120px;
          height: 120px;
          top: -55px;
          left: auto;
          right: 15px;
        }

        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
