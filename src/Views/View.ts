// Все View файлы изменяют DOM
// Здесь пишется класс который будет родителем каждого класса в View файлах, сначала он импортируется import View from './VIew.ts', 
// После от него наследуются все что есть в нем в классы дети, вот так class названиеКласса(название класса = названию файла) extends View;
// Каждый View файл возвращает экземпляр своего класса, вот так export default new названиеКласса(название класса = названию файла)


import { type TypeDataNote, divHighContainerNote, divMediumContainerNote, divLowContainerNote, inputAddNoteFormTitle, inputAddNoteFormContent, divMessageContainer } from '../config';

export default class View {
  constructor() {};

  renderAllNotes(obj: TypeDataNote) {
    divHighContainerNote.innerHTML = '';
    divMediumContainerNote.innerHTML = '';
    divLowContainerNote.innerHTML = '';
    
    for (const key in obj) {
      const note = obj[key];
      const title = note?.title as string;
      const content = note?.content as string;
      const typeNote = note?.typeNote.toLowerCase() as string;
      const isDeleted = note?.isDeleted as boolean;
      const isChange = note?.isChange;
      const idNote = +key;

      if(!isDeleted) {
        let html = `
          <h3>${title}</h3>
          <p>${content}</p>
          <button class="changeNote">Изменить</button>
          <button class="deleteNote">Удалить</button>
        `;

        if(isChange) {
          html = `
            <span>Название: </span>
            <input value="${title}" type="text" placeholder="Введите название заметки" id="title" class="addNote__form--title">
            <br>
            <br>
            <span>Содержание: </span>
            <textarea placeholder="Введите описание заметки" id="content" class="addNote__form--content">${content}</textarea>
            <button class="changeBtn">Сохранить изменения</button>
            <button class="cancellationChangeBtn">Отменить изменение заметки</button>
          `;
        };

        const div = document.createElement('div');
        div.classList.add('note', `note--${typeNote}`, `noteId--${idNote}`);
        div.draggable = true;
        div.innerHTML = html;
        div.style.position = 'relative';


        switch(typeNote) {
          case 'high':
            divHighContainerNote.appendChild(div);
            break;
          case 'medium':
            divMediumContainerNote.appendChild(div);
            break;
          case 'low':
            divLowContainerNote.appendChild(div);
            break;
        };
      };
    };
  };

  cleanInputs() {
    inputAddNoteFormTitle.value = '';
    inputAddNoteFormContent.value = '';
  };

  errorRender() {
    divMessageContainer.textContent = 'Одно из полей или оба поля пустые. Обновите пустые поля и повторите попытку';
  }
};