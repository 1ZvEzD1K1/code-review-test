import axios from 'axios';
import { Annotation } from '~/types/Annotation';
import { Photo } from '~/types/Photo';

const BASE_URL = 'http://localhost:5000/';

export const postPhoto = async (data: Photo) => {
  return await axios.post<Photo>(`${BASE_URL}photo`, data)
    .then((response) => (
      response.data))
    .catch(() => {
      throw new Error()
    });
};

export const getPhoto = async () => {
  return await axios.get<Photo[]>(`${BASE_URL}photo`)
    .then((response) => (
      response.data))
    .catch(() => {
      throw new Error()
    });
};

export const getAnnotations = async () => {
  return await axios.get<Annotation[]>(`${BASE_URL}annotations`)
    .then((response) => (
      response.data))
    .catch(() => {
      throw new Error()
    });
};

export const postAnnotation = async (data: Annotation) => {
  return await axios.post<Annotation>(`${BASE_URL}annotations`, data)
    .then((response) => (
      response.data))
    .catch(() => {
      throw new Error()
    });
};

export const deleteAnnotation = async (id: number) => {
  return await axios.delete(`${BASE_URL}annotations/${id}`)
  .then((response) => (
    response.data))
  .catch(() => {
    throw new Error()
  });
}
