import View from './View';
import { divStatusNote } from '../config';

class DragAndDropNoteView extends View {
  constructor() {
    super()
  };

  element(f: Function, e: DragEvent) {
    const target = e.target! as HTMLElement;
    const draggableElement = target.closest('[draggable="true"]') as HTMLElement;
    if(draggableElement) {
      f(e);
    };
  };

  container(f: Function, e: DragEvent) {
    const el = e.target! as HTMLElement;
    if(el.closest('.statusNote')) {
      f(e);
    };
  };


  addHandlerStart(f: Function) {
    divStatusNote.addEventListener('dragstart', this.element.bind(this, f));
  };

  addHandlerEnd(f: Function) {
    divStatusNote.addEventListener('dragend', this.element.bind(this, f));
  };

  addHandlerOver(f: Function) {
    divStatusNote.addEventListener('dragover', this.container.bind(this, f));
  };

  addHandlerLeave(f: Function) {
    divStatusNote.addEventListener('dragleave', this.container.bind(this, f));
  };

  addHandlerDrop(f: Function) {
    divStatusNote.addEventListener('drop', this.container.bind(this, f));
  };
};

export default new DragAndDropNoteView();