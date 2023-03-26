import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const response = await axios.post('/api/upload', formData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <Button variant="contained" color="primary" onClick={handleFileUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  );
}
