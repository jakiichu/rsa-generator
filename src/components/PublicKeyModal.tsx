import { createEffect, createSignal, Show } from 'solid-js';
import type { iModalProps } from '../types';

export const PublicKeyModal = (props: iModalProps) => {
  const [keyInput, setKeyInput] = createSignal('');
  const [validationError, setValidationError] = createSignal('');

  createEffect(() => {
    if (props.isOpen) {
      setKeyInput(props.currentKey);
      setValidationError('');
    }
  });

  const handleSave = () => {
    const key = keyInput().trim();
    if (!key) {
      setValidationError('Вставьте публичный ключ');
      return;
    }
    if (!key.includes('-----BEGIN PUBLIC KEY-----')) {
      setValidationError('Неверный формат. Ожидается PEM (-----BEGIN PUBLIC KEY-----)');
      return;
    }
    setValidationError('');
    props.onSave(key);
  };

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) props.onClose();
  };

  return (
    <Show when={props.isOpen}>
      <div class="modal-overlay" onClick={handleOverlayClick}>
        <div class="modal">
          <div class="modal-header">
            <h3>Публичный RSA ключ</h3>
            <button class="modal-close" onClick={props.onClose}>✕</button>
          </div>
          <div class="modal-body">
            <p class="modal-hint">
              Вставьте RSA публичный ключ в формате PEM (SPKI). Используется для шифрования
              данных перед кодированием в QR.
            </p>
            <textarea
              class="key-input"
              placeholder={'-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----'}
              value={keyInput()}
              onInput={(e) => setKeyInput(e.currentTarget.value)}
              rows={10}
            />
            <Show when={validationError()}>
              <div class="error">{validationError()}</div>
            </Show>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onClick={props.onClose}>
              Отмена
            </button>
            <button class="btn btn-primary" onClick={handleSave}>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};
