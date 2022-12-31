import React, { FC, useState, useEffect, Fragment, useCallback } from 'react';
import { CenteredLayout } from '~/components';
import './annotations.scss';

import { deleteAnnotation, getAnnotations, getPhoto, postAnnotation, postPhoto } from '~/api/api';
import { Annotation } from '~/types/Annotation';
import { Tips } from './Tips';
import { UploadInfo } from './UploadInfo';
import { NewComment } from './NewComment';
import { Comments } from './Comments';

export const Annotations: FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const [imageId, setImageId] = useState(0);
  const [comment, setComment] = useState<Annotation | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  
  const uploadPhoto = useCallback(async () => {
    try {
      if (image) {
        const current = await getPhoto();
        let maxId = 1;

        if (current.length !== 0) {
          maxId = Math.max(...current.map(elem => elem.id)) + 1;
        }

        const isExist = current.find(photo => photo.name === image.name) || null;

        if (isExist) {
          setImageId(() => isExist.id);

          return;
        }

        const data = {
          id: maxId,
          name: image.name,
        }

        await postPhoto(data);
        setImageId(maxId);
      }
    } catch (error) {
      throw new Error();
    }
  }, [image]);

  const loadAnnotations = useCallback(async () => {
    try {
      const annotationsFromApi = await getAnnotations();

      const visibleAnnotations = [...annotationsFromApi]
        .filter(annotation => annotation.imageId === imageId);

      setAnnotations(visibleAnnotations);
    } catch (error) {
      throw new Error();
    }
  }, [imageId]);

  const handleImageUpload = useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return;
    }

    setImage(event.target.files[0]);
  }, []);

  const handleSizeChange = useCallback((event: React.WheelEvent) => {
    setScale(current => {
      let scale = current;

      scale += event.deltaY * -0.001;
      scale = Math.min(Math.max(1, scale), 1.5);

      return scale;
    });
  }, []);

  const createComment = useCallback(async (event: React.MouseEvent<HTMLImageElement>) => {
    if (!image) {
      return;
    }

    try {
      const annotationsFromApi = await getAnnotations();
      let maxId = 1;

      if (annotationsFromApi.length !== 0) {
        maxId = Math.max(...annotationsFromApi.map(elem => elem.id)) + 1;
      }

      const newAnnotation = {
        id: maxId,
        imageId,
        author: '',
        properties: {
          message: '',
          x: event.nativeEvent.offsetX / scale,
          y: event.nativeEvent.offsetY / scale,
          isOpen: false,
        }
      }

      setComment(newAnnotation);
    } catch (error) {
      throw new Error();
    }
  }, [image]);

  const handleTipClick = useCallback(() => {
    if (!comment?.properties.message) {
      setComment(null);
    }
  }, [comment]);

  const createAnnotation = useCallback(async (author: string, message: string) => {
    let annotation;

    if (comment) {
      annotation = {
        id: comment.id,
        imageId: comment.imageId,
        author: author.trim(),
        properties: {
          message: message.trim(),
          x: comment.properties.x,
          y: comment.properties.y,
          isOpen: comment.properties.isOpen,
        }
      }

      try {
        await postAnnotation(annotation);
        loadAnnotations();
        setComment(null);
      } catch (error) {
        throw new Error();
      }
    }
  }, [comment]);

  const handleAnnotationDetails = (id: number) => {
    setAnnotations(current => (
      current.map(element => element.id === id
        ? {
        ...element,
        properties: {
          ...element.properties,
          isOpen: !element.properties.isOpen
        }}
        : element
      )))
  };

  const clearAnnotation = async (id: number) => {
    try {
      await deleteAnnotation(id);
      loadAnnotations();
    } catch (error) {
      throw new Error();
    }
  }

  useEffect(() => {
    uploadPhoto();
  }, [image]);

  useEffect(() => {
    loadAnnotations();
  }, [imageId]);

  return (
    <CenteredLayout className="pb-0">
      <section className="annotations">
        <UploadInfo
          image={image}
          handleImageUpload={handleImageUpload}
        />

        <div
          className="annotations__image-box"
        >
          <div
            className="annotations__wrapper"
            onWheel={handleSizeChange}
          >
            {image && (
              <>
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="annotations__preview"
                  style={{
                    width: `${scale * 100}%`,
                    height: `${scale * 100}%`,
                    objectPosition: 'center'
                  }}
                onClick={createComment}
                />

                {annotations && (
                  annotations.map(annotation => (
                    <Comments 
                      key={annotation.id}
                      annotation={annotation}
                      scale={scale}
                      clearAnnotation={clearAnnotation}
                      handleAnnotationDetails={handleAnnotationDetails}
                    />
                  ))
                )}

                {comment && (
                  <NewComment 
                    comment={comment}
                    scale={scale}
                    handleTipClick={handleTipClick}
                    createAnnotation={createAnnotation}
                  />
                )}
              </>
            )}
          </div>
        </div>

        <Tips />
      </section>
    </CenteredLayout>
  )
}
