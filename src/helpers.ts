// Функции нужные для всего проекта


export function returnNoteId(el: HTMLElement) {
  return el?.closest('.note')?.classList[2]?.slice(-1) as string;
};