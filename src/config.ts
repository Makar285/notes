// Переменные нужные для всего проекта



// Контейнер addNote
export const divAddNote = document.querySelector('.addMote')! as HTMLDivElement;
export const formAddNoteForm = document.querySelector('.addNote__form') as HTMLFormElement;
export const inputAddNoteFormTitle = document.querySelector('.addNote__form--title') as HTMLInputElement;
export const inputAddNoteFormContent = document.querySelector('.addNote__form--content') as HTMLInputElement;
export const buttonAddNoteFormBtn = document.querySelector('.addNote__form--btn')! as HTMLButtonElement;
export const divMessageContainer = document.querySelector('.message__container')! as HTMLDivElement;



// Контейнер statusNote
export const divStatusNote = document.querySelector('.statusNote')! as HTMLDivElement;

// Контейнер hign
export const divHigh = document.querySelector('.high')! as HTMLDivElement;
export const divHighContainerNote = document.querySelector('.highContainerNote')! as HTMLDivElement;

// Контейнер medium
export const divMedium = document.querySelector('.medium')! as HTMLDivElement;
export const divMediumContainerNote = document.querySelector('.mediumContainerNote')! as HTMLDivElement;

// Контейнер low
export const divLow = document.querySelector('.low')! as HTMLDivElement;
export const divLowContainerNote = document.querySelector('.lowContainerNote')! as HTMLDivElement;


// Для Drag and Drop
export let allNoteDivElement = document.querySelectorAll('.note')! as NodeListOf<HTMLDivElement>;
export let allContainerNoteDivElement = document.querySelectorAll('.noteContainer')! as NodeListOf<HTMLDivElement>;
export function updateAllNoteDivElement(els: NodeListOf<HTMLDivElement>) {
  allNoteDivElement = els;
};



// Типы для заметкок
export enum TypeNote {'high' = 'High', 'medium' = 'Medium', 'low' = 'Low'};
export interface TypeDataNote {
  [n: number]: {
    title: string,
    content: string,
    typeNote: TypeNote,
    isDeleted: boolean,
    isChange: boolean
  }
};
export interface TypeDataNoteObjectIn {
  title: string,
  content: string,
  typeNote: TypeNote,
  isDeleted: boolean,
  isChange: boolean
};