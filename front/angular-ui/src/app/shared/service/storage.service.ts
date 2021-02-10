import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  private storage: Storage;

  constructor() {
    this.storage = JSON.parse(localStorage.getItem('remember')) ? localStorage : sessionStorage;
  }

  get length(): number {
    return this.storage.length;
  }

  selectSessionStorage(): this {
    this.storage = sessionStorage;

    return this;
  }

  selectLocalStorage(): this {
    this.storage = localStorage;

    return this;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string {
    return this.storage.getItem(key);
  }

  getArray(key: string): string[] {
    return this.storage.getItem(key) ? this.storage.getItem(key).split(',') : [];
  }

  getObject<T>(key: string): T {
    return JSON.parse(this.storage.getItem(key)) as T;
  }

  key(index: number): string {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, data: string): void {
    this.storage.setItem(key, data);
  }

  setArray(key: string, data: string[]): void {
    this.storage.setItem(key, data.join(','));
  }

  setObject(key: string, data: object): void {
    this.storage.setItem(key, JSON.stringify(data));
  }
}
