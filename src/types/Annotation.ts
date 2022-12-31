interface Properties {
  message: string,
  x: number,
  y: number,
  isOpen: boolean,
};

export interface Annotation {
  id: number,
  imageId: number,
  author: string,
  properties: Properties,
};
