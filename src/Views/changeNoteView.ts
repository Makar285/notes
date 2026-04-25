import View from './View';
import { divStatusNote } from '../config';

class changeNoteView extends View {
  constructor() {
    super();
  };

  change(f: Function, e: Event) {
    if(e.target instanceof HTMLButtonElement && e.target.classList.contains('changeNote')) {
      f(e.target);
    };
  };

  saveChange(f: Function, e: Event) {
    if(e.target instanceof HTMLButtonElement && e.target.classList.contains('changeBtn')) {
      console.log(e.target, f);
      f(e.target);
    };
  };

  cancellationChange(f: Function, e: Event) {
    if(e.target instanceof HTMLButtonElement && e.target.classList.contains('cancellationChangeBtn')) {
      f(e.target);
    };
  };

  addHandlerChange(f: Function) {
    divStatusNote.addEventListener('click', this.change.bind(this, f));
  }

  addHandlerSaveChange(f: Function) {
    divStatusNote.addEventListener('click', this.saveChange.bind(this, f));
  }

  addHandlerCancellationChange(f: Function) {
    divStatusNote.addEventListener('click', this.cancellationChange.bind(this, f));
  }
};

export default new changeNoteView();