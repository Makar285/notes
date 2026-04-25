// Управление ланными и бизнес логика

import { inputAddNoteFormTitle, inputAddNoteFormContent, TypeNote, type TypeDataNoteObjectIn} from '../config';
import { projectState } from './State';


export function defaultValudLocalStorage() {
  if(JSON.parse((localStorage.getItem('notes') as string))) {
    return JSON.parse((localStorage.getItem('notes') as string))
  } else {
    localStorage.setItem('notes', JSON.stringify({}));
  return {};
  };
};

export function getDataInForm() {
  const inputAddNoteFormTitleData: string = inputAddNoteFormTitle.value;
  const inputAddNoteFormContentData: string = inputAddNoteFormContent.value;
  let error = false;
  if(!inputAddNoteFormTitleData || !inputAddNoteFormContentData) {
    error = true;
  };

  return {
    title: inputAddNoteFormTitleData,
    content: inputAddNoteFormContentData,
    isError: error
  };
};

export function getDataInFormPoIdNote(n: number) {
  const el = document.querySelector(`.noteId--${n}`)! as HTMLDivElement;

  const inputEl = el?.querySelector('input')! as HTMLInputElement;
  const textareaEl = el.querySelector('textarea')! as HTMLTextAreaElement;

  let error = false;
  if(!inputEl.value || !textareaEl.value) {
    error = true;
  };

  return {
    title: inputEl.value,
    content: textareaEl.value,
    isError: error
  };
}

export function getDataInLocalStorage() {
  const data = JSON.parse(localStorage.getItem('notes') as string);
  console.log(data);
  if(data) {
    return data;
  } else {
    return undefined;
  };
};

export function updataLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(projectState.notes));
};