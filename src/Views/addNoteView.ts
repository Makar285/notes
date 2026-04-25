import View from './View';
import { buttonAddNoteFormBtn } from '../config';


class AddNoteView extends View {
  constructor() {
    super();
  };

  currentRender(f: Function, e: Event) {
    e.preventDefault();

    const obj = f();
    console.log(obj);

    this.cleanInputs();
  };

  addHandler(f: Function) {
    buttonAddNoteFormBtn.addEventListener('click', this.currentRender.bind(this, f));
  }
};

export default new AddNoteView();