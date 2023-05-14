import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const Ckeditor = () => {
    // const [images, setImages] = useState("");

    const uploadPlugin = (editor)=>{
        editor.plugins.get("FileRepository").createUploadAdapter = (loader)=>{
            return URL.createObjectURL(loader)
        }
    }
  return (
    <>
      <CKEditor
    //   config={{
    //     extraPlugins:[uploadPlugin]
    //   }}
        editor={ClassicEditor}
        
        data="<p>Hello from CKEditor 5!</p>"
        
      />
    </>
  );
};
