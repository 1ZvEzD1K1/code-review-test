import React, { useState, useEffect } from 'react';
import css from '~/pages/annotations/annotations.module.scss';

import picture from './picture.png';
import path from './path.png';
import bin from './bin.png';

import { StyledCommentField, StyledDataAnnotations } from './dataAnnotations.style';

interface IXYCoordinates {
  x: number
  y: number
};

interface IAnnotationsFromDB {
  id: number,
  author: string,
  comment: string,
  pos: IXYCoordinates
};

interface IComment {
  id: number,
  pos: IXYCoordinates,
};

export const AnnotationComponentSecond = () => {

  const [ dataAnnotations, setDataAnnotations ] = useState<IAnnotationsFromDB[]>([{
    id: 1,
    author: "Empty",
    comment: "Empty",
    pos: {
      x: 0,
      y: 0
    }
  }]);

  const [ lastCommentsPosition, setLastCommentsPosition ] = useState<IComment>({ id: -1, pos: {x: -1, y: -1}});
  const [ isRenderCommentField, setIsRenderCommentField ] = useState<boolean>(false);
  const [ isRenderFullComment, setIsRenderFullComment ] = useState<boolean>(false);
  const [ triggeredComment, setTriggeredComment ] = useState<number>(0);
  const [ commentValue, setCommentValue ] = useState<string>('');

  useEffect( () => {

    fetch('http://localhost:3000/annotations')
      .then( res => res.json() )
      .then( json => {console.log(json); setDataAnnotations(json) ; console.log(dataAnnotations);} )
  }, [])

  async function openCommentField(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    
    const valueX = event.clientX - event.currentTarget.offsetLeft;
    const valueY = event.clientY - event.currentTarget.offsetTop;

    setLastCommentsPosition({
      id: dataAnnotations[dataAnnotations.length - 1].id + 1,
      pos: {
        x: valueX,
        y: valueY,
      }
    });
    
    setIsRenderCommentField(true);

  };

  async function leaveComment(
      position: IXYCoordinates,
      comment: string,
      author: string
    ) {

      setIsRenderCommentField(false);

      await fetch(`http://localhost:3000/annotations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author,
          comment: comment,
          pos: {
            x: position.x,
            y: position.y,
          }
        }),
      })

      await fetch(`http://localhost:3000/annotations`)
        .then( res => res.json())
        .then( json => setDataAnnotations(json));

    };

  async function removeComment(id: number) {
    await fetch(`http://localhost:3000/annotations/${id}`, {
      method: 'DELETE',
    })
    .then( res => {
      fetch('http://localhost:3000/annotations')
        .then( res => res.json() )
        .then( json => setDataAnnotations(json) );
    });
  };

  return (
    <div className={css.pictureAnnotation}>
      <div 
        className='wrapperPicture'
        style={{
          backgroundImage: `url(${picture})`,
          width: '323px',
          height: '576px',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
        onClick={openCommentField}
      >
        {
          dataAnnotations.map( (annotation: IAnnotationsFromDB) => {
            if (annotation.id) {            
              return (
                <StyledDataAnnotations
                  theme={annotation} 
                  key={annotation.id}
                  onClick={ (e) => {
                    e.stopPropagation();
                    setIsRenderCommentField(false);
                    setTriggeredComment(annotation.id);
                    setIsRenderFullComment(!isRenderFullComment);
                  }}
                >
                  <div>{ annotation.id }</div>
                  {
                    (isRenderFullComment && annotation.id === triggeredComment)
                    &&
                    <div className='fullComment' onClick={ (e) => { e.stopPropagation() }}>
                      <div>{annotation.author.match(/\b\w/gm)}</div>
                      <div>
                        <div className='authorComment'>{annotation.author}</div>
                        <div className='commentComment'>{annotation.comment}</div>
                      </div>
                      <img 
                        src={bin}
                        onClick={ () => removeComment(annotation.id)}
                      />
                    </div>
                  }
                  
                </StyledDataAnnotations>
              );
            };
          })
        }
        {

          (lastCommentsPosition.id > 0 && isRenderCommentField)
          &&
          <StyledCommentField 
            theme={lastCommentsPosition.pos} 
            key={lastCommentsPosition.id}
            onClick={ (e) => { e.stopPropagation(); setIsRenderCommentField(false); } }
          >
            <span>{ lastCommentsPosition.id }</span>
            <div onClick={ (e) => e.stopPropagation() }>
              <input type='text' placeholder='Leave a comment' onChange={ (e) => setCommentValue(e.currentTarget.value) }/>
              <img src={path} onClick={ () => leaveComment(lastCommentsPosition.pos, commentValue, 'New Author') } />
            </div>
          </StyledCommentField>

        }
      </div>
    </div>
  );
};