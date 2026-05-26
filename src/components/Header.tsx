import type { iHeaderProps } from '../types';


export const Header = (props: iHeaderProps) => (
  <header class="header">
    <div class="header-timestamp">
      <span class="ts-label">Timestamp (UTC)</span>
      <span class="ts-value">{props.timestamp}</span>
    </div>
    <div class="header-right">
      <div classList={{ 'key-status': true, 'key-set': props.hasKey }}>
        {props.hasKey ? '● Ключ установлен' : '● Ключ не установлен'}
      </div>
      <button class="btn btn-primary" onClick={props.onOpenModal}>
        Установить публичный ключ
      </button>
    </div>
  </header>
);
