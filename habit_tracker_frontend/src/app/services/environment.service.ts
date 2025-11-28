import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * EnvironmentService provides access to environment variables configured at runtime.
 * It reads from window and process.env without failing if variables are not present.
 */
@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  private readonly doc = inject(DOCUMENT);

  /**
   * PUBLIC_INTERFACE
   * getApiBase returns the configured NG_APP_API_BASE value or undefined.
   */
  getApiBase(): string | undefined {
    try {
      const win = this.doc.defaultView as any;
      const fromWindow = win?.NG_APP_API_BASE ?? win?.ENV?.NG_APP_API_BASE;
      const fromProcess = (typeof process !== 'undefined' && (process as any)?.env?.NG_APP_API_BASE) || undefined;
      return (fromWindow || fromProcess || undefined) as string | undefined;
    } catch {
      return undefined;
    }
  }

  /**
   * PUBLIC_INTERFACE
   * getBackendUrl returns the configured NG_APP_BACKEND_URL value or undefined.
   */
  getBackendUrl(): string | undefined {
    try {
      const win = this.doc.defaultView as any;
      const fromWindow = win?.NG_APP_BACKEND_URL ?? win?.ENV?.NG_APP_BACKEND_URL;
      const fromProcess = (typeof process !== 'undefined' && (process as any)?.env?.NG_APP_BACKEND_URL) || undefined;
      return (fromWindow || fromProcess || undefined) as string | undefined;
    } catch {
      return undefined;
    }
  }
}
