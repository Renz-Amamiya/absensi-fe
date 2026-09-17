"use client";

import { useEffect, useState } from "react";
import { Camera, ScanFace, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LiveCameraProps {
  onLog?: (mode: "checkIn" | "checkOut", name: string) => void;
}

export function LiveCamera({ onLog }: LiveCameraProps = {}) {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState<{ id: number; x: number; y: number; name: string }[]>([]);
  const [scanMode, setScanMode] = useState<"checkIn" | "checkOut">("checkIn");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Initial time set
    setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    
    // Time update interval
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    // Face detection simulation interval
    const scanInterval = setInterval(() => {
      setIsScanning(true);

      if (Math.random() > 0.3) {
        const fakeName = Math.random() > 0.5 ? "Pengguna Dikenali" : "John Doe";
        setDetectedFaces([{
          id: Date.now(),
          x: 20 + Math.random() * 50,
          y: 20 + Math.random() * 50,
          name: fakeName
        }]);
        
        if (onLog && fakeName === "John Doe") {
           onLog(scanMode, fakeName);
        }
      } else {
        setDetectedFaces([]);
      }

      setTimeout(() => setIsScanning(false), 500);
    }, 3000);

    return () => {
      clearInterval(scanInterval);
      clearInterval(timeInterval);
    };
  }, [onLog, scanMode]);

  return (
    <Card className="bg-white border border-blue-100 shadow-md overflow-hidden transition-all duration-500 relative group rounded-2xl">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-100/30"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-blue-100 bg-white/80 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Camera className="w-5 h-5 text-blue-400 z-10 relative" />
            <div className="absolute inset-0 bg-blue-400 blur-sm opacity-40"></div>
          </div>
          <CardTitle className="text-sm font-mono tracking-wider text-blue-900">SYS.CAM_01</CardTitle>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
          </span>
          <span className="text-[10px] font-mono tracking-widest text-blue-700 font-bold">REC (GATE A)</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 relative z-10">
        <div className="relative w-full aspect-video bg-slate-50 flex items-center justify-center overflow-hidden">
          
          {/* Base Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          {/* Subtle Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 via-transparent to-slate-100/50 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100/50 via-transparent to-slate-100/50 pointer-events-none"></div>

          {/* Central Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20 pointer-events-none flex items-center justify-center">
            <div className="w-full h-[1px] bg-blue-500/50 absolute"></div>
            <div className="w-[1px] h-full bg-blue-500/50 absolute"></div>
            <div className="w-24 h-24 rounded-full border border-blue-500/30 absolute"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400/50 absolute"></div>
          </div>

          {/* Radar Sweep Animation */}
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] opacity-70 animate-[scan_3s_ease-in-out_infinite]" />

          {detectedFaces.length === 0 ? (
            <div className="flex flex-col items-center gap-4 z-10 backdrop-blur-sm bg-white/80 px-6 py-4 rounded-xl border border-blue-100 shadow-sm">
              <ScanFace className={cn("w-14 h-14 transition-all duration-500", isScanning ? "text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.4)] animate-pulse scale-110" : "text-blue-300")} />
              <div className="flex flex-col items-center">
                <p className={cn("text-xs font-mono tracking-widest font-bold", isScanning ? "text-blue-600" : "text-blue-400")}>
                  {isScanning ? "MEMPROSES BINGKAI..." : "MENUNGGU SUBJEK"}
                </p>
              </div>
            </div>
          ) : (
            detectedFaces.map((face) => (
              <div
                key={face.id}
                className="absolute z-20 flex flex-col items-center justify-center transition-all duration-300"
                style={{
                  left: `${face.x}%`,
                  top: `${face.y}%`,
                  width: '140px',
                  height: '140px',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Face Targeting Box */}
                <div className="w-full h-full relative group">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"></div>
                  
                  {/* Inner fill glow */}
                  <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"></div>
                  
                  {/* Connecting lines to info box */}
                  <div className="absolute -right-8 top-1/2 w-8 h-[1px] bg-yellow-400/50 hidden md:block"></div>
                </div>

                {/* Subject Info Panel */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+8px)] hidden md:flex flex-col bg-white/95 backdrop-blur-md border border-blue-200 px-3 py-2 rounded-r-lg shadow-md whitespace-nowrap min-w-[120px]">
                  <div className="text-[10px] text-blue-500 font-mono mb-1 tracking-widest uppercase font-bold">Kecocokan Target</div>
                  <div className="text-xs text-slate-800 font-bold tracking-wide">{face.name}</div>
                  <div className="text-[9px] text-green-600 font-mono mt-1 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> CONF: 98.4%
                  </div>
                </div>
                
                {/* Mobile Info Panel (fallback) */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:hidden bg-white/95 border border-blue-200 px-3 py-1 rounded shadow-md whitespace-nowrap">
                   <div className="text-xs text-slate-800 font-bold">{face.name}</div>
                </div>
              </div>
            ))
          )}

          {/* Bottom Data Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none z-30">
            <div className="flex flex-col gap-1 text-[9px] font-mono text-blue-700 tracking-widest font-bold">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 animate-pulse text-blue-600" />
                <span className="bg-white/80 px-1 py-0.5 rounded border border-blue-200 shadow-sm">NVIDIA_JETSON_NANO_AI</span>
              </div>
              <span className="px-1">FR_ENGINE: v4.2.1-stable</span>
            </div>
            
            <div className="flex flex-col gap-1 items-end text-[9px] font-mono text-blue-700 tracking-widest font-bold">
               <span className="bg-white/80 px-1 py-0.5 rounded border border-blue-200 shadow-sm">LAT: 32ms</span>
               <span className="px-1 text-blue-800">{currentTime || "MENYINKRONKAN..."}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Mode Selector Panel */}
      <div className="border-t border-blue-100 bg-blue-50/30 p-3 relative z-10 flex items-center justify-center gap-4">
        <button
          onClick={() => setScanMode("checkIn")}
          className={cn(
            "px-6 py-2 rounded-lg font-mono text-xs tracking-widest font-bold transition-all duration-300 border",
            scanMode === "checkIn" 
              ? "bg-green-100 text-green-700 border-green-300 shadow-sm" 
              : "bg-white text-slate-500 border-blue-100 hover:bg-blue-50 shadow-sm hover:text-blue-600"
          )}
        >
          MODE: MASUK
        </button>
        <button
          onClick={() => setScanMode("checkOut")}
          className={cn(
            "px-6 py-2 rounded-lg font-mono text-xs tracking-widest font-bold transition-all duration-300 border",
            scanMode === "checkOut" 
              ? "bg-orange-100 text-orange-700 border-orange-300 shadow-sm" 
              : "bg-white text-slate-500 border-blue-100 hover:bg-blue-50 shadow-sm hover:text-blue-600"
          )}
        >
          MODE: KELUAR
        </button>
      </div>
    </Card>
  );
}
