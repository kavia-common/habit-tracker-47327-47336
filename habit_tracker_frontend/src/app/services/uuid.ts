export function v4(): string {
  // RFC4122 version 4 compliant simple generator using crypto when available
  const g: any = (typeof globalThis !== 'undefined' ? globalThis : {}) as any;
  const cryptoObj = g.crypto && typeof g.crypto.getRandomValues === 'function' ? g.crypto : undefined;
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return template.replace(/[xy]/g, c => {
    let r = 0;
    if (cryptoObj) {
      const buf = new Uint8Array(1);
      cryptoObj.getRandomValues(buf);
      r = buf[0] & 15;
    } else {
      r = Math.floor(Math.random() * 16);
    }
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default { v4 };
