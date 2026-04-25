// Контролирует связь между modul и view


import * as model from "./models/model";
import AddNoteView from "./Views/addNoteView";
import DeleteNoteView from "./Views/deleteNoteView";
import ChangeNoteView from "./Views/changeNoteView";
import DragAndDropNoteView from "./Views/dragAndDropNoteView";
import { projectState } from "./models/State";
import {
  type TypeDataNoteObjectIn,
  TypeNote,
  divMessageContainer,
  updateAllNoteDivElement,
  divHighContainerNote,
  divMediumContainerNote,
  divLowContainerNote
} from "./config";
import { returnNoteId } from "./helpers";

function getData() {
  const data = model.getDataInForm();
  console.log(data);
  const { title, content } = data;
  if (data.isError) {
    AddNoteView.errorRender();
  } else if (
    typeof title === "string" &&
    typeof content === "string" &&
    projectState.notes
  ) {
    const obj: TypeDataNoteObjectIn = {
      title,
      content,
      typeNote: TypeNote.low,
      isDeleted: false,
      isChange: false,
    };
    console.log(obj);
    projectState.addNote(obj);

    console.log(projectState.notes);
    divMessageContainer.innerHTML = "Данные введены правильно";

    AddNoteView.renderAllNotes(projectState.notes);
    updateAllNoteDivElement(document.querySelectorAll('.note'));
  }
}

function deleteNote(el: HTMLElement) {
  console.log(projectState.notes);

  const noteId = el.closest(".note")?.classList[2]?.slice(-1) as string;
  const note: TypeDataNoteObjectIn = projectState.notes[+noteId]!;
  if (note) {
    note.isDeleted = true;
  }

  projectState.notes[+noteId] = note;

  console.log(projectState.notes);

  // для рендеринга новых заметок
  AddNoteView.renderAllNotes(projectState.notes);
  updateAllNoteDivElement(document.querySelectorAll('.note'));

  // для сохранения новых заметок в localStorage
  model.updataLocalStorage();
}

function change(el: HTMLElement) {
  console.log(
    el,
    el?.closest(".note"),
    el?.closest(".note")?.classList[2],
    el?.closest(".note")?.classList[2]?.slice(-1),
  );

  const noteId = returnNoteId(el);
  const note: TypeDataNoteObjectIn = projectState.notes[+noteId]!;

  const { title, content } = note;

  note.isChange = true;

  // для сохранения изменений в текущей состоянии проекте и в localStorage
  projectState.notes[+noteId] = note;
  model.updataLocalStorage();

  AddNoteView.renderAllNotes(projectState.notes);
  updateAllNoteDivElement(document.querySelectorAll('.note'));
  console.log(title, content, note);

  return [title, content];
}

function saveChange(el: HTMLElement) {
  const noteId = returnNoteId(el);
  const data = model.getDataInFormPoIdNote(+noteId);
  console.log(data);
  if (data.isError) {
    AddNoteView.errorRender();
  } else {
    divMessageContainer.innerHTML = "Данные введены правильно";
    const { title, content } = data;
    const note = projectState.notes[+noteId]!;

    console.log(title, content);

    note.title = title;
    note.content = content;
    note.isChange = false;

    projectState.notes[+noteId] = note;
    model.updataLocalStorage();
    
    AddNoteView.renderAllNotes(projectState.notes);
    updateAllNoteDivElement(document.querySelectorAll('.note'));
  }
}

function cancellationChange(el: HTMLElement) {
  const noteId = returnNoteId(el);
  const data: TypeDataNoteObjectIn = projectState.notes[+noteId]!;
  console.log(el, noteId, data);

  data.isChange = false;

  projectState.notes[+noteId] = data;
  model.updataLocalStorage();

  AddNoteView.renderAllNotes(projectState.notes);
  updateAllNoteDivElement(document.querySelectorAll('.note'));
};

function dragStart(e: DragEvent) {
  if(e.dataTransfer) {
    const el = e.target as HTMLDivElement;

    e.dataTransfer.setData('text/plain', returnNoteId(el));
    el.style.opacity = '0.3';

    console.log('START START START START START START START START START START START START START START START', e);
  };
};

function dragEnd(e: DragEvent) {
  const el = e.target as HTMLDivElement;
  el.style.opacity = '1';

  console.log('END END END END END END END END END END END END END END END END END END END END END END END', e);
};


let currentActiveContainer: HTMLDivElement | null = null;

function dragOver(e: DragEvent) {
  e.preventDefault();

  const el = e.target as HTMLElement;
  const container = el.closest<HTMLDivElement>('.noteContainer');

  if (!container) return;

  if (currentActiveContainer !== container) {
    if (currentActiveContainer) {
      currentActiveContainer.style.backgroundColor = '';
    };

    container.style.backgroundColor = 'rgb(255, 182, 193)';
    currentActiveContainer = container;

    console.log(`Элемент зашел на контейнер:`, container);
  }
}


function dragLeave(e: DragEvent) {
  const el = e.target as HTMLElement;
  const container = el.closest<HTMLDivElement>('.noteContainer');
  
  if (container && currentActiveContainer === container) {
    container.style.backgroundColor = '';
    currentActiveContainer = null;
  }
}

function drop(e: DragEvent) {
  console.log(projectState.notes);
  e.preventDefault();
  
  const el = e.target as HTMLDivElement; // над чем отпустили элемент
  const container = el.closest('.noteContainer')! as HTMLDivElement; // ближайщие контейнер вверх по дереву DOM у которого есть класс noteContainer, => один из контейнеров контейнера statusNote

  container.style.backgroundColor = ''; // по факту этого тут быть не должно но container.style.backgroundColor = ''; из dragLeave не срабатывает почему то

  const noteId = e.dataTransfer?.getData('text/plain')!; // айди заметки которую перемещают
  const dragElement = document.querySelector(`.noteId--${+noteId}`)! as HTMLDivElement; // заметка которую перемешают
  const type = container.classList[1]! as string; // важность контейнера над которым отпустили элемент, high, medium или low

  console.log(el, container, noteId, dragElement, type);


  divHighContainerNote.innerHTML = '';
  divMediumContainerNote.innerHTML = '';
  divLowContainerNote.innerHTML = '';

  if(container !== dragElement.parentNode?.parentElement) { // если элемент отпустили не в тот же контейнер в котором он и так был
    dragElement.classList.remove(`note--${type}`); // удалить класс что бы изменить цвет фона

    // если раскоментировать следующую строку то элемент будет на странице дважду из за следующей строке и из за AddNoteView.renderAllNotes(projectState.notes);
    // container.appendChild(dragElement); // переместить элемент dragElement в container

    const notes = projectState.notes; // получить информацию и текущих заметках
    const data = notes[+noteId]!; // получить объект заметки с определенным айди
    switch(type) { // вместе if else
      case 'high': // если type === 'high'
        data.typeNote = TypeNote.high; // в объекте изменить typeNote на TypeNote.high
        dragElement.classList.add('high'); // добавить класс high для цвета фона
        break; // указать что текущий case закончен
      case 'medium': // если type === 'medium'
        data.typeNote = TypeNote.medium; // в объекте изменить typeNote на TypeNote.medium
        dragElement.classList.add('medium'); // добавить класс meduim для цвета фона
        break; // указать что текущий case закончен
      default: // если type не равен ни high ни meduim значит он low потому что type может быть только этими тремя строками
        data.typeNote = TypeNote.low;
        dragElement.classList.add('low'); // добавить класс low для цвета фона
        break; // указать что текущий case закончен
    };

    projectState.notes[+noteId] = data; // обновить информацию о заметки с определным айди на новую
    console.log(projectState.notes);

    AddNoteView.renderAllNotes(projectState.notes); // отрендерить проект
    model.updataLocalStorage(); // обновить localStorage
  };
};

function init() {
  model.defaultValudLocalStorage();

  AddNoteView.addHandler(getData);

  const data = model.getDataInLocalStorage();
  console.log(data);
  if (data) {
    AddNoteView.renderAllNotes(data);
  }
  updateAllNoteDivElement(document.querySelectorAll('.note'));

  DeleteNoteView.addHandler(deleteNote);

  ChangeNoteView.addHandlerChange(change);
  ChangeNoteView.addHandlerSaveChange(saveChange);
  ChangeNoteView.addHandlerCancellationChange(cancellationChange);

  DragAndDropNoteView.addHandlerStart(dragStart);
  DragAndDropNoteView.addHandlerEnd(dragEnd);
  DragAndDropNoteView.addHandlerOver(dragOver);
  DragAndDropNoteView.addHandlerLeave(dragLeave);
  DragAndDropNoteView.addHandlerDrop(drop);
}
init();

// функция renderAllNotes из класса родителя View но так как она не экспортируется то приходится обращаться к AddNoteView