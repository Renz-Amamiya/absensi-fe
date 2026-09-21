"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, ScanFace, Activity, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LiveCameraProps {
  onLog?: (mode: "checkIn" | "checkOut", name: string) => void;
}

export function LiveCamera({ onLog }: LiveCameraProps = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scanMode, setScanMode] = useState<"checkIn" | "checkOut">("checkIn");
  const [currentTime, setCurrentTime] = useState("");
  const [statusMsg, setStatusMsg] = useState("MENYALAKAN KAMERA...");
  const [streamError, setStreamError] = useState(false);

  // Mulai Kamera
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatusMsg("MENUNGGU SUBJEK (SIAP SCAN)");
      } catch (err) {
        console.error("Camera error:", err);
        setStreamError(true);
        setStatusMsg("KAMERA TIDAK TERDETEKSI / DITOLAK");
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Update Waktu
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const handleCapture = async (mode: "checkIn" | "checkOut") => {
    if (!videoRef.current || !canvasRef.current || isScanning) return;

    setScanMode(mode);
    setIsScanning(true);
    setStatusMsg("MEMPROSES WAJAH KE AI...");

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Gambar frame saat ini ke canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Ubah canvas menjadi Blob (File gambar)
    canvas.toBlob(async (blob) => {
      if (!blob) {
        setStatusMsg("GAGAL MENGAMBIL FOTO");
        setIsScanning(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", blob, "absen.jpg");
      formData.append("device_loc", "Kamera Pintu Utama");

      try {
        const res = await fetch("/api/absen", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setStatusMsg(`BERHASIL: ${data.data.nama}`);
          if (onLog) {
            onLog(mode, data.data.nama);
          }
        } else {
          setStatusMsg(data.error?.toUpperCase() || "WAJAH TIDAK DIKENALI");
        }
      } catch (error) {
        console.error(error);
        setStatusMsg("ERROR JARINGAN / SERVER MATI");
      } finally {
        setTimeout(() => {
          setIsScanning(false);
          setStatusMsg("MENUNGGU SUBJEK (SIAP SCAN)");
        }, 2000);
      }
    }, "image/jpeg", 0.9);
  };

  return (
    <Card className="bg-white border border-blue-100 shadow-md overflow-hidden transition-all duration-500 relative group rounded-2xl">
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
            <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75", streamError ? "bg-red-500" : "bg-yellow-500 animate-ping")}></span>
            <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", streamError ? "bg-red-600" : "bg-yellow-400")}></span>
          </span>
          <span className={cn("text-[10px] font-mono tracking-widest font-bold", streamError ? "text-red-600" : "text-blue-700")}>
            {streamError ? "OFFLINE" : "REC (GATE A)"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0 relative z-10 bg-black">
        <div className="relative w-full flex items-center justify-center group min-h-[300px]">

          {/* Real Webcam Video */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn("w-full h-auto max-h-[70vh] object-contain scale-x-[-1] transition-opacity duration-500", streamError ? "opacity-0" : "opacity-100")}
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Fallback Grid & Error */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

          {streamError && (
            <div className="z-20 flex flex-col items-center justify-center text-red-500 gap-2">
              <AlertCircle className="w-12 h-12" />
              <span className="font-mono text-sm">Kamera tidak dapat diakses</span>
            </div>
          )}

          {/* Central Crosshair Overlay */}
          {!streamError && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-40 pointer-events-none flex items-center justify-center">
              <div className="w-full h-[1px] bg-blue-500/50 absolute"></div>
              <div className="w-[1px] h-full bg-blue-500/50 absolute"></div>
              <div className="w-40 h-40 rounded-full border-2 border-dashed border-blue-400/50 absolute animate-[spin_10s_linear_infinite]"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400 absolute"></div>
            </div>
          )}

          {/* Scanning Animation */}
          {isScanning && (
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] opacity-90 animate-[scan_1.5s_ease-in-out_infinite] z-20" />
          )}

          {/* Bottom Data Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none z-30">
            <div className="flex flex-col gap-1 text-[9px] font-mono tracking-widest font-bold">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 animate-pulse text-blue-400 drop-shadow-md" />
                <span className={cn("px-1 py-0.5 rounded shadow-sm", isScanning ? "bg-green-500 text-white" : "bg-black/50 text-white backdrop-blur-sm")}>
                  {statusMsg}
                </span>
              </div>
              <span className="px-1 text-white/70 drop-shadow-md">FR_ENGINE: v4.2.1-stable</span>
            </div>

            <div className="flex flex-col gap-1 items-end text-[9px] font-mono text-white/90 tracking-widest font-bold drop-shadow-md">
              <span className="bg-black/50 backdrop-blur-sm px-1 py-0.5 rounded border border-white/20 shadow-sm">LAT: {isScanning ? "..." : "32ms"}</span>
              <span className="px-1">{currentTime || "MENYINKRONKAN..."}</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Mode Selector Panel (Now Triggers Capture) */}
      <div className="border-t border-blue-100 bg-blue-50/30 p-4 relative z-10 flex items-center justify-center gap-4">
        <button
          onClick={() => handleCapture("checkIn")}
          disabled={isScanning || streamError}
          className={cn(
            "px-6 py-3 w-40 rounded-xl font-mono text-sm tracking-widest font-bold transition-all duration-300 border shadow-md hover:scale-105 active:scale-95 flex justify-center items-center gap-2",
            isScanning && scanMode === "checkIn"
              ? "bg-blue-100 text-blue-700 border-blue-300"
              : "bg-green-500 hover:bg-green-600 text-white border-green-600"
          )}
        >
          {isScanning && scanMode === "checkIn" ? "MEMPROSES..." : "SCAN MASUK"}
        </button>
        <button
          onClick={() => handleCapture("checkOut")}
          disabled={isScanning || streamError}
          className={cn(
            "px-6 py-3 w-40 rounded-xl font-mono text-sm tracking-widest font-bold transition-all duration-300 border shadow-md hover:scale-105 active:scale-95 flex justify-center items-center gap-2",
            isScanning && scanMode === "checkOut"
              ? "bg-blue-100 text-blue-700 border-blue-300"
              : "bg-orange-500 hover:bg-orange-600 text-white border-orange-600"
          )}
        >
          {isScanning && scanMode === "checkOut" ? "MEMPROSES..." : "SCAN KELUAR"}
        </button>
      </div>
    </Card>
  );
}
