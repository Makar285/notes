import View from "./View";
import { divStatusNote } from "../config";


class DeleteNoteView extends View {
  constructor() {
    super();
  };

  deleteNote(f: Function, e: Event) {
    if(e.target instanceof HTMLButtonElement && e.target.classList.contains('deleteNote')) { // если в нажатый элемент это кнопка и в нем есть класс deleteNote
      f(e.target);
    };
  };
  
  addHandler(f: Function) {
    divStatusNote.addEventListener('click', this.deleteNote.bind(this, f));
  }
};

export default new DeleteNoteView();