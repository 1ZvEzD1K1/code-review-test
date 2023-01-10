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

interface ITheme {
  allComments: IAnnotationsFromDB[],
  currentComment: IXYCoordinates,
};

interface IComment {
  id: number,
  pos: IXYCoordinates,
};

export const AnnotationComponent = () => {

  const [ xyMouse, setXYMouse ] = useState<IXYCoordinates>({
    x: 0,
    y: 0,
  });

  const [ dataAnnotations, setDataAnnotations ] = useState<IAnnotationsFromDB[]>([{
    id: 1,
    author: "Josh Dun",
    comment: "Please remove this image from the slide.",
    pos: {
      x: 0.609,
      y: 0.6401
    }
  }]);
  const [ currentID, setCurrentID ] = useState<number>(0);

  // const [ arrayCommentsCount, setArrayCommentsCount ] = useState<IArrayCommentCount[]>([]);
  const [ lastCommentsPosition, setLastCommentsPosition ] = useState<IComment>({ id: -1, pos: {x: -1, y: -1}});
  const [ isRenderCommentField, setIsRenderCommentField ] = useState<boolean>(false);
  const [ isRenderLeftComment, setIsRenderLeftComment ] = useState<boolean>(false);
  const [ isRenderFullComment, setIsRenderFullComment ] = useState<boolean>(false);
  const [ triggeredComment, setTriggeredComment ] = useState<number>(0);
  const [ commentValue, setCommentValue ] = useState<string>('');

  useEffect( () => {

    // fetch('http://localhost:3000/annotations/', {
    //   method: 'DELETE',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ id: 5 })
    // })
    // .then( res => { console.log(res); return res.json()})
    // .then( json => console.log(json))

    fetch('http://localhost:3000/annotations')
      .then( res => res.json() )
      .then( json => setDataAnnotations(json) )
  }, [])

  async function openCommentField(event: React.MouseEvent<HTMLElement, MouseEvent>) {

    setIsRenderCommentField(false);

    
    

    const valueX = event.clientX - event.currentTarget.offsetLeft;
    const valueY = event.clientY - event.currentTarget.offsetTop;

    // setArrayCommentsCount((prev) => [ ...prev, {
    //   id: arrayCommentsCount.length + 1,
    //   pos: {
    //     x: valueX,
    //     y: valueY,
    //   }
    // }]);

    await fetch('http://localhost:3000/annotations')
      .then( res => res.json() )
      .then( json => {
        setTimeout( () => {
          setIsRenderCommentField(true);
        });
        setLastCommentsPosition( (prev) => ({
          ...prev,
          id: json.length + 1,
          pos: {
            x: valueX,
            y: valueY,
          }
        }))
      });

//     setLastCommentsPosition(pos.x = valueX);
// setLastCommentsPosition(json.length + 1)
  };


  async function leaveComment(
      // event: React.MouseEvent<HTMLElement, MouseEvent>,
      position: IXYCoordinates,
      comment: string,
      author: string
    ) {

    // const valueX = event.clientX - event.currentTarget.offsetLeft;
    // const valueY = event.clientY - event.currentTarget.offsetTop;
    // let annotationArrayID: number[] = [];

    // await fetch('http://localhost:3000/annotations')
    //   .then( res => res.json() )
    //   .then( (json: IAnnotationsFromDB[]) => {
        
    //     for ( let annotation in json ) {
    //       if ( json.hasOwnProperty(annotation) ) {
    //         annotationArrayID.push(json[annotation].id);
    //       }
    //     }
    //     return json;
    //     })
    //   .then( json => {
    //     console.log(annotationArrayID);
    //     console.log(currentID);

    //     for ( let i = 1 ; i - 1 <= annotationArrayID.length ; i++ ) {
    //       console.log(annotationArrayID[i]);
    //     }
    //   });


    await fetch('http://localhost:3000/annotations', {
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
    .then( res => { console.log(res); return res.json()})
    .then( json => console.log(json, "currentID: " + currentID, dataAnnotations))

    await fetch('http://localhost:3000/annotations')
      .then( res => res.json() )
      .then( json => {console.log(json) ; setDataAnnotations(json)} );

    setIsRenderCommentField(false);
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

  const theme: ITheme = {
    allComments: dataAnnotations,
    currentComment: xyMouse,
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
        // onClick={leaveComment}
        onClick={openCommentField}

      >
        {/* <div style={{position: 'absolute',}}></div> */}
        {
          // dataAnnotations
          // &&
          dataAnnotations.map( (annotation: IAnnotationsFromDB) => {
            if (dataAnnotations[annotation.id]) {
            // if (annotation.id) {
            
              return (
                <StyledDataAnnotations 
                  theme={dataAnnotations[annotation.id - 1]} 
                  key={annotation.id}
                  onClick={ (e) => { 
                    e.stopPropagation(); 
                    setIsRenderLeftComment(true); 
                    setIsRenderCommentField(false);
                    setIsRenderFullComment(!isRenderFullComment);
                    setTriggeredComment(annotation.id);
                  }}
                  onMouseEnter={ (e) => {
                    e.stopPropagation(); 
                    // setIsRenderFullComment(true);
                    // setTriggeredComment(annotation.id);
                  }}
                  onMouseLeave={ (e) => {
                    e.stopPropagation(); 
                    // setIsRenderFullComment(false);
                    // setTriggeredComment(0);
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
                        onClick={ (e) => { 
                          e.stopPropagation();
                          setIsRenderLeftComment(false); 
                          setIsRenderCommentField(false);
                          setIsRenderFullComment(false);
                          setTriggeredComment(0);
                          console.log("annotation.id " + annotation.id)
                          removeComment(annotation.id);
                        }}
                      />
                    </div>
                  }
                  
                </StyledDataAnnotations>
              );
            };
          })
        }
        {
          // arrayCommentsCount.map( (commentField: IArrayCommentCount) => {
          //   if (commentField.id === arrayCommentsCount.length) {
          //     return (
          //       <StyledCommentField theme={commentField.pos} key={commentField.id}>
          //         <span>{ commentField.id }</span>
          //         <div onClick={ (e) => e.stopPropagation() }>
          //           <input type='text' placeholder='Leave a comment'/>
          //           <img src={path} onClick={ () => leaveComment(commentField.pos, 'comment', 'author') } />
          //         </div>
          //       </StyledCommentField>
          //     );
          //   }
          // }) 

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
          //     );
        }
      </div>
    </div>
  );
};