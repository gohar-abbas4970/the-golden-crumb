import { useRef, useState, useCallback } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';

interface ImageUploadPreviewProps {
  onImageSelected: (fileName: string | null) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function ImageUploadPreview({ onImageSelected }: ImageUploadPreviewProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError('Please upload a JPG, PNG, or WebP image.');
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('Image must be under 5MB.');
        return;
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFileName(file.name);
      onImageSelected(file.name);
    },
    [onImageSelected],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFileName(null);
    setError(null);
    onImageSelected(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      {previewUrl ? (
        <div className="relative rounded-xl-card overflow-hidden border border-beige/50 bg-white">
          <img src={previewUrl} alt="Reference image preview" className="w-full max-h-64 object-contain bg-beige/20" />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-chocolate flex items-center justify-center hover:bg-white hover:shadow-md transition-all"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="p-3 text-center">
            <p className="text-xs text-chocolate/60 truncate">{fileName}</p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-beige rounded-xl-card p-8 text-center cursor-pointer hover:border-caramel hover:bg-blush/10 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-blush/30 flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6 text-caramel" />
          </div>
          <p className="text-chocolate font-medium text-sm">Upload a reference image</p>
          <p className="text-chocolate/50 text-xs mt-1">JPG, PNG, or WebP — max 5MB</p>
          <p className="text-chocolate/40 text-xs mt-2">
            This image stays in your browser session only and will not automatically reach the bakery.
            It will be included in your order description.
          </p>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleInputChange}
        className="hidden"
        aria-label="Upload reference image"
      />
      {previewUrl && (
        <p className="text-xs text-chocolate/40 mt-2 flex items-center gap-1">
          <ImageIcon className="w-3 h-3" />
          This is a reference only — the final cake design requires bakery approval.
        </p>
      )}
    </div>
  );
}
