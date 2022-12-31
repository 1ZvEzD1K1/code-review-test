import { FC, memo } from 'react';

type Props = {
  image: File | null,
  handleImageUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
}

export const UploadInfo: FC<Props> = memo(({
  image, handleImageUpload,
}) => {
  return (
    <div className="annotations__upload">
      <h2 className="annotations__title">
        {image 
        ? image.name
        : 'Here goes the file name'}
      </h2>

      <label className="annotations__upload-label">
        <input
          accept="image/*"
          type="file"
          className="annotations__upload-input"
          onChange={handleImageUpload}
        />
        Upload image
      </label>
  </div>
  )
});
