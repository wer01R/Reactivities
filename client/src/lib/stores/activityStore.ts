import { makeAutoObservable } from "mobx";

export class ActivityStore {
  filter = 'all';
  startDate = new Date().toISOString();

  constructor() {
    makeAutoObservable(this);
  }

  setFilter = (filter: string) => {
    this.filter = filter;
  }

  setStartDate = (startDate: Date) => {
    this.startDate = startDate.toISOString();
  }
}