import {TypeNote, type TypeDataNote, type TypeDataNoteObjectIn} from '../config';
import * as model from './model';

class State {
  static instance: State;

  notes: TypeDataNote = model.getDataInLocalStorage(); // перед релизом

  idNote: number = 1; 

  private constructor() {};

  static getInstance() {
    if(this.instance) {
      return this.instance;
    };

    this.instance = new State();
    return this.instance;
  };

  addNote(obj: TypeDataNoteObjectIn) {
    this.notes[this.idNote] = obj;
    this.idNote++;

    model.updataLocalStorage();
  };
};

export const projectState = State.getInstance();