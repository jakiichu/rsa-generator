import { Show } from 'solid-js';
import type { iQrPanelProps } from '../types';

const QrPlaceholder = () => (
  <div class="qr-placeholder">
    <div class="qr-placeholder-grid">
      {Array.from({ length: 25 }).map(() => (
        <div class="qr-cell" />
      ))}
    </div>
    <p>Заполните форму и нажмите «Сгенерировать QR»</p>
  </div>
);

export const QrPanel = (props: iQrPanelProps) => (
  <section class="panel qr-panel">
    <h2>QR Код</h2>
    <div class="qr-container">
      <Show when={props.dataUrl} fallback={<QrPlaceholder />}>
        <img src={props.dataUrl!} alt="QR Code" class="qr-image" />
      </Show>
    </div>
    <Show when={props.dataUrl}>
      <a href={props.dataUrl!} download="qr-code.png" class="btn btn-secondary download-btn">
        Скачать PNG
      </a>
    </Show>
  </section>
);
