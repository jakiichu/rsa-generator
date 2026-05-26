import { createSignal, onCleanup, onMount } from 'solid-js';
import QRCode from 'qrcode';
import { encryptWithRsa } from './utils/crypto';
import { Header } from './components/Header';
import { FormPanel } from './components/FormPanel';
import { QrPanel } from './components/QrPanel';
import { RsaExplanation } from './components/RsaExplanation';
import { PublicKeyModal } from './components/PublicKeyModal';
import type { iFormData } from './types';
import './App.css';

const App = () => {
  const [formData, setFormData] = createSignal<iFormData>({ userId: '', deviceId: '' });
  const [publicKey, setPublicKey] = createSignal('');
  const [modalOpen, setModalOpen] = createSignal(false);
  const [qrDataUrl, setQrDataUrl] = createSignal<string | null>(null);
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [timestamp, setTimestamp] = createSignal(new Date().toISOString());

  console.log('qwe')
  onMount(() => {
    const id = setInterval(() => setTimestamp(new Date().toISOString()), 100);
    onCleanup(() => clearInterval(id));
  });

  const handleGenerate = async () => {
    const { userId, deviceId } = formData();
    if (!publicKey()) {
      setError('Публичный ключ не установлен. Нажмите «Установить публичный ключ».');
      return;
    }
    if (!userId.trim() || !deviceId.trim()) {
      setError('Заполните User ID и Device ID.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const ts = new Date().toISOString();
      const payload = `${userId.trim()}:${deviceId.trim()}:${ts}`;
      const encrypted = await encryptWithRsa(payload, publicKey());
      const dataUrl = await QRCode.toDataURL(encrypted, {
        errorCorrectionLevel: 'H',
        width: 300,
        margin: 1,
        color: { dark: '#ffffff', light: '#0a0a14' },
      });
      setQrDataUrl(dataUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка шифрования. Проверьте публичный ключ.');
      setQrDataUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="app">
      <Header
        timestamp={timestamp()}
        hasKey={!!publicKey()}
        onOpenModal={() => setModalOpen(true)}
      />

      <main class="main">
        <FormPanel
          userId={formData().userId}
          deviceId={formData().deviceId}
          timestamp={timestamp()}
          error={error()}
          isLoading={isLoading()}
          onUserIdChange={(v) => setFormData((p) => ({ ...p, userId: v }))}
          onDeviceIdChange={(v) => setFormData((p) => ({ ...p, deviceId: v }))}
          onGenerate={handleGenerate}
        />
        <QrPanel dataUrl={qrDataUrl()} isLoading={isLoading()} />
      </main>

      <RsaExplanation />

      <PublicKeyModal
        isOpen={modalOpen()}
        onClose={() => setModalOpen(false)}
        onSave={(key) => {
          setPublicKey(key);
          setModalOpen(false);
        }}
        currentKey={publicKey()}
      />
    </div>
  );
};

export default App;
