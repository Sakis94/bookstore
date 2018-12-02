import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Data } from '../_models/data';

@Injectable()
export class DataService {

  private dataSource = new BehaviorSubject<Data>(new Data());
  data = this.dataSource.asObservable();

  constructor() { }

  updatedDataSelection(data: Data) {
    this.dataSource.next(data);
  }

}
