import React from "react";
import ImageUploading from "react-images-uploading";

import "./Uploader.scss";

export function Uploader({ images, setImages }) {
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <div className="header">
              <div className="btns">
                <button style={{}} onClick={onImageUpload} {...dragProps}>
                  Добавить документы
                </button>
                &nbsp;
                <button
                  onClick={onImageRemoveAll}
                  style={{
                    backgroundColor: "rgb(146, 5, 5)",
                  }}
                >
                  Удалить все изображения
                </button>
              </div>
              <div className="hint">
                Для удаления изображения дважды кликните на него
              </div>
            </div>
            <div className={imageList.length ? "items" : ""}>
              {imageList.length ? (
                imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={image["data_url"]}
                      onDoubleClick={() => onImageRemove(index)}
                      alt=""
                    />
                  </div>
                ))
              ) : (
                <div className="error">Требуется добавить документы</div>
              )}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default Uploader;
