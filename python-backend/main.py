from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Izinkan Next.js (localhost:3000) untuk mengakses API ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Server AI Absensi Berjalan Lancar!"}

@app.post("/api/recognize-face")
async def recognize_face(file: UploadFile = File(...)):
    # Saat ini hanya simulasi, model AI aslinya belum dipasang
    image_bytes = await file.read()
    
    # --- Di sini nanti kode untuk run model AI Anda ---
    # result = my_face_model.predict(image_bytes)
    # ---------------------------------------------------

    print(f"Menerima gambar: {file.filename} dengan ukuran {len(image_bytes)} bytes")
    
    # Kembalikan respons dummy seolah-olah wajah dikenali
    return {
        "status": "success",
        "user_id": "1",
        "name": "Budi (Simulasi)",
        "confidence": 0.95
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
