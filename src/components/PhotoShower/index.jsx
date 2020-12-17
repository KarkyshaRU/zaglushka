import React from "react";
import ImageUploading from "react-images-uploading";

import "./Uploader.css";

export function PhotoShower({ images }) {
  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={() => {}}
        maxNumber={100}
        dataURLKey="data_url"
      >
        {({ imageList }) => (
          <div className="upload__image-wrapper">
            <div className={imageList.length ? "items" : ""}>
              {imageList.map((image, index) => {
                return (
                  <div key={index} className="image-item">
                    <img src={image} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default PhotoShower;
