import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import imageCompression from 'browser-image-compression';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function compressFile(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1,             // target maximum size in MB
    maxWidthOrHeight: 1024,   // resize to fit within this dimension
    useWebWorker: true,       // offload to a Worker thread
  };
  // returns a Blob/File of the compressed image
  return await imageCompression(file, options);
}