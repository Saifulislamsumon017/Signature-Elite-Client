import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const ImageUploader = ({ onUpload, type = 'profile' }) => {
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState('');
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const handleImageChange = async e => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    // Local preview
    const localUrl = URL.createObjectURL(imageFile);
    setLocalPreview(localUrl);

    // Upload to imgbb
    setUploading(true);
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      const uploadedUrl = response.data.data.display_url;
      onUpload(uploadedUrl);
    } catch (err) {
      console.error('Image upload failed', err.response?.data || err);
      alert('Image upload failed. Please check your API key or quota.');
    } finally {
      setUploading(false);
    }
  };

  // Conditional preview style
  const previewClasses =
    type === 'profile'
      ? 'w-[100px] h-[100px] rounded-full object-cover border'
      : 'w-[200px] rounded-lg object-cover border';

  return (
    <div className="p-4 w-full m-auto rounded-lg flex-grow">
      <div className="file_upload px-5 py-3 relative border border-gray-300 rounded-lg">
        <div className="flex flex-col items-center gap-4 w-max mx-auto text-center">
          {/* Image Preview */}
          {localPreview && (
            <div className="w-full flex justify-center">
              <img
                className={previewClasses}
                src={localPreview}
                alt="Selected Preview"
              />
            </div>
          )}

          {/* Upload Button */}
          <label>
            <input
              onChange={handleImageChange}
              className="hidden"
              type="file"
              accept="image/*"
            />
            <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-600">
              {uploading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  Uploading...
                </span>
              ) : (
                'Upload'
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
