import React, { useEffect } from 'react';
import css from './annotations.module.scss';
import { CenteredLayout } from '~/components';

// import { ReactComponent as Plus } from './svg/Plus.svg';
// import { ReactComponent as Mouse } from './svg/Mouse.svg';

import plus from './pic/plus.png';
import mouse from './pic/mouse.png';
import { AnnotationComponent } from '~/components/annotationComponent';
import { AnnotationComponentSecond } from '~/components/annotationComponent/annotationComponentSecond';

export const Annotations = () => {

  // useEffect( () => {

    // fetch('http://localhost:3000/annotations/', {
    //   method: 'DELETE',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ id: 5 })
    // })
    // .then( res => { console.log(res); return res.json()})
    // .then( json => console.log(json))

  //   fetch('http://localhost:3000/annotations')
  //   .then( res => res.json())
  //   .then( json => console.log(json))
  // }, [])

  

  return (
    <CenteredLayout className={css.annotationsMain}>
      <div className={css.topLevel}>
        <span>Here goes the file name</span>
        <button>Upload image</button>
      </div>
      <div className={css.middleLevel}>
        <AnnotationComponentSecond/>
      </div>
      <div className={css.bottomLevel}>
        <span>To leave a comment, mouseover</span>
        <img src={plus}/>
        <span>on an image and click the left mouse button</span>
        <img src={mouse}/>
      </div>
    </CenteredLayout>
  )
};