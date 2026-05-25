import { Show } from 'solid-js';
import { generateUUID } from '../utils/uuid';
import type { iFormPanelProps } from '../types';

export const FormPanel = (props: iFormPanelProps) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') props.onGenerate();
  };

  return (
    <section class="panel form-panel">
      <h2>Данные для QR</h2>

      <div class="form-group">
        <div class="form-group-header">
          <label for="userId">User ID</label>
          <button class="btn-uuid" onClick={() => props.onUserIdChange(generateUUID())}>
            ↺ UUID
          </button>
        </div>
        <input
          id="userId"
          type="text"
          placeholder="user-123"
          value={props.userId}
          onInput={(e) => props.onUserIdChange(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div class="form-group">
        <div class="form-group-header">
          <label for="deviceId">Device ID</label>
          <button class="btn-uuid" onClick={() => props.onDeviceIdChange(generateUUID())}>
            ↺ UUID
          </button>
        </div>
        <input
          id="deviceId"
          type="text"
          placeholder="device-abc-xyz"
          value={props.deviceId}
          onInput={(e) => props.onDeviceIdChange(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div class="payload-preview">
        <span class="payload-label">Payload (до шифрования)</span>
        <code>
          {props.userId || 'userId'}:{props.deviceId || 'deviceId'}:{props.timestamp}
        </code>
      </div>

      <Show when={props.error}>
        <div class="error">{props.error}</div>
      </Show>

      <button class="btn btn-generate" onClick={props.onGenerate} disabled={props.isLoading}>
        {props.isLoading ? 'Шифрование...' : 'Сгенерировать QR'}
      </button>
    </section>
  );
};
