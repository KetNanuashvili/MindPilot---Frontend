import { Component, effect, inject, signal } from '@angular/core';
import { I18nService } from '../../i18n/i18n';

interface Message {
  from: 'ai' | 'you';
  text: string;
}

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.html',
  styleUrl: './assistant.scss',
})
export class AssistantPage {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly messages = signal<Message[]>([]);
  protected readonly draft = signal('');

  constructor() {
    effect(() => {
      const t = this.t();
      this.messages.set([
        { from: 'ai', text: t.aiHello },
        { from: 'you', text: t.aiUserSample },
        { from: 'ai', text: t.aiSampleReply },
      ]);
    });
  }

  protected prompts(): string[] {
    const t = this.t();
    return [t.promptPlan, t.promptBurnout, t.promptSpend, t.promptStats];
  }

  protected onDraft(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value);
  }

  protected send(text = this.draft()): void {
    const value = text.trim();
    if (!value) {
      return;
    }

    this.messages.update((items) => [...items, { from: 'you', text: value }]);
    this.draft.set('');

    window.setTimeout(() => {
      this.messages.update((items) => [...items, { from: 'ai', text: this.reply(value) }]);
    }, 450);
  }

  private reply(input: string): string {
    const text = input.toLowerCase();
    const t = this.t();

    if (text.includes('ხარჯ') || text.includes('spend') || text.includes('budget')) {
      return t.aiReplySpend;
    }

    if (text.includes('გადაწვ') || text.includes('დაღლ') || text.includes('burnout') || text.includes('tired')) {
      return t.aiReplyBurnout;
    }

    if (text.includes('სტატისტიკ') || text.includes('გამოვიდ') || text.includes('stat') || text.includes('worked')) {
      return t.aiReplyStats;
    }

    return t.aiReplyDefault;
  }
}
