import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../i18n/i18n';

interface Todo {
  id: number;
  key?: 'todoWalk' | 'todoFocus' | 'todoLunch' | 'todoSpend' | 'todoEvening';
  title?: string;
  done: boolean;
}

@Component({
  selector: 'app-today',
  imports: [RouterLink],
  templateUrl: './today.html',
  styleUrl: './today.scss',
})
export class TodayPage {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  protected readonly todos = signal<Todo[]>([
    { id: 1, key: 'todoWalk', done: true },
    { id: 2, key: 'todoFocus', done: false },
    { id: 3, key: 'todoLunch', done: false },
    { id: 4, key: 'todoSpend', done: false },
    { id: 5, key: 'todoEvening', done: false },
  ]);

  protected readonly draft = signal('');

  protected label(todo: Todo): string {
    return todo.key ? this.t()[todo.key] : (todo.title ?? '');
  }

  protected toggle(id: number): void {
    this.todos.update((items) =>
      items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    );
  }

  protected onDraft(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value);
  }

  protected addTodo(event: Event): void {
    event.preventDefault();
    const title = this.draft().trim();
    if (!title) {
      return;
    }

    this.todos.update((items) => [...items, { id: Date.now(), title, done: false }]);
    this.draft.set('');
  }

  protected doneCount(): number {
    return this.todos().filter((item) => item.done).length;
  }
}
