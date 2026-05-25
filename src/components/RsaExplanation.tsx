const steps = [
  {
    n: '1',
    title: 'Пара ключей',
    text: 'Сервер генерирует пару ключей: публичный (для шифрования) и приватный (для расшифровки). Публичный ключ можно передавать открыто — он вставляется сюда.',
  },
  {
    n: '2',
    title: 'OAEP Padding',
    text: 'OAEP (Optimal Asymmetric Encryption Padding) добавляет случайные байты перед шифрованием. Поэтому одни и те же данные каждый раз дают разный шифротекст.',
  },
  {
    n: '3',
    title: 'Шифрование',
    text: 'Строка userId:deviceId:timestamp шифруется публичным ключом через RSA-OAEP с SHA-256. Результат — набор байт, закодированных в Base64.',
  },
  {
    n: '4',
    title: 'QR код',
    text: 'Base64-строка шифротекста кодируется в QR код. Без приватного ключа данные невозможно расшифровать даже при наличии QR кода.',
  },
  {
    n: '5',
    title: 'Защита от повторов',
    text: 'Timestamp в payload гарантирует уникальность каждого QR кода. Сервер может отклонить устаревший или уже использованный код (replay attack protection).',
  },
];

export const RsaExplanation = () => (
  <div class="explanation-wrapper">
    <section class="explanation">
      <h2>Как работает RSA-OAEP шифрование</h2>
      <div class="steps">
        {steps.map((s) => (
          <div class="step">
            <div class="step-number">{s.n}</div>
            <div class="step-content">
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div class="schema">
        <span class="schema-item">userId:deviceId:timestamp</span>
        <span class="schema-arrow">→ RSA-OAEP / SHA-256 →</span>
        <span class="schema-item">Base64(ciphertext)</span>
        <span class="schema-arrow">→ QR encode →</span>
        <span class="schema-item">QR Code</span>
      </div>
    </section>
  </div>
);
