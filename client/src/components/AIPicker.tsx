import React from 'react'

import {CustomButton} from './CustomButton';
import { useGlobalStore } from '../store';

interface IAIPickerProps {
  prompt:string,
   setPrompt:Function,
    generatingImg:boolean,
     handleSubmit:Function
}

function dataURLToBlob(dataURL:string) {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}
function downloadDataURL(dataURL:string, filename:string) {
  const blob = dataURLToBlob(dataURL);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }:IAIPickerProps) => {
  const {logoDecal,fullDecal} = useGlobalStore();
  const handleDownload = (type:string)=>{
    let imgBase64 = ''
    if(type=='logo'){
      imgBase64 = logoDecal;
    }else if(type==='full'){
      imgBase64 = fullDecal;
    }
    if(!imgBase64.startsWith('data:image')){
      return alert("not generage")
    }
    const date = Math.floor(Date.now() / 100);
    downloadDataURL(imgBase64,`${type}-${date}.png`)


  }
  return (
    <div className="aipicker-container">
      <textarea 
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      />
      <div className="flex  gap-3">
        {generatingImg ? (
          <CustomButton 
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton 
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
              customStyles="text-xs"
            />

            <CustomButton 
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit('full')}
              customStyles="text-xs"
            />
             <CustomButton 
              type="filled"
              title="down Logo"
              handleClick={() => handleDownload('logo')}
              customStyles="text-xs"
            />
               <CustomButton 
              type="filled"
              title="down Full"
              handleClick={() => handleDownload('full')}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  )
}

