import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Element, ElementEdit, ElementDetail } from '@data/schema/element.interface';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  public ID: Element;
  constructor(private http: HttpClient) { }

  getAll(url: string) {
    return this.http.get<Array<Element>>(url);
  }

  create(url: string, data: FormData) {
    return this.http.post(url, data);
  }

  edit(url: string, data: ElementEdit) {
    const path = `${url}/${data.id}`;
    return this.http.put(path, data);
  }

  Detail(url: string, data: ElementDetail) {
    const path = `${url}/${data.id}`;
    return this.http.put(path, data);
  }

  delete(url: string, id: number) {
    const path = `${url}/${id}`;
    return this.http.delete(path);
  }

}
