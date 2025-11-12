import { Injectable } from '@angular/core';
import { PublicClientApplication, AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private pca: PublicClientApplication;
  private account: AccountInfo | null = null;
  private initialized: Promise<void> | null = null;

  constructor() {
    const msalConfig = {
      auth: {
        clientId: '41e5e47c-037f-444c-b865-a91427b23c74',
        authority: environment.msal.authority,
        redirectUri: environment.msal.redirectUri,
      }
    };

    this.pca = new PublicClientApplication(msalConfig);

    // Ensure MSAL is initialized before calling other APIs.
    // Store the initialization promise so other methods can await it.
    this.initialized = this.pca.initialize().then(() => {
      // After initialize, handle redirect results (if any)
      return this.pca.handleRedirectPromise().then((result) => {
        console.debug('MSAL handleRedirectPromise result:', result);
        if (result && result.account) {
          this.handleResult(result);
        } else {
          // Try silent SSO first (if the IdP has a session cookie). This helps achieve SSO
          // across microfrontends when they share the same Azure AD tenant and redirect URIs.
          (async () => {
            try {
              const ssoResult = await (this.pca as any).ssoSilent({ scopes: ['openid', 'profile', 'User.Read'] });
              console.debug('MSAL ssoSilent result:', ssoResult);
              if (ssoResult && ssoResult.account) {
                this.handleResult(ssoResult as any);
                return;
              }
            } catch (ssoErr) {
              // ssoSilent will fail when there's no IdP session or browser blocks third-party cookies.
              console.debug('MSAL ssoSilent failed or not available:', ssoErr);
            }

            // If silent SSO didn't produce an account, fallback to cached accounts (if any)
            const accounts = this.pca.getAllAccounts();
            if (accounts && accounts.length > 0) {
              this.account = accounts[0];
            }
          })();
        }
      });
    }).catch(err => {
      console.error('MSAL initialize/redirect handling error', err);
      // fallback: try to read cached accounts
      try {
        const accounts = this.pca.getAllAccounts();
        if (accounts && accounts.length > 0) {
          this.account = accounts[0];
        }
      } catch (e) {
        console.error('Error reading cached accounts', e);
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.account;
  }

  getAccountName(): string | null {
    return this.account ? this.account.username : null;
  }

  async login(): Promise<void> {
    // Use redirect flow to authenticate via Microsoft Authenticator / Azure AD
    try {
      // Wait for MSAL to initialize first
      if (this.initialized) await this.initialized;

      const loginRequest = {
        scopes: ['openid', 'profile', 'User.Read']
      };

      // Check if we should use popup (from environment config)
      const usePopup = (environment.msal as any).usePopup === true;

      if (usePopup) {
        console.debug('Using popup login (configured in environment)');
        const result: AuthenticationResult = await this.pca.loginPopup(loginRequest as any);
        this.handleResult(result);
      } else {
        console.debug('Calling loginRedirect with request:', loginRequest, 'msal config:', environment.msal);
        // loginRedirect returns a Promise that completes after navigation is triggered
        await this.pca.loginRedirect(loginRequest as any);
        // Note: the redirect will navigate away; handleRedirectPromise will process the result on return
      }
    } catch (e) {
      console.error('Login error', e);
      // Fallback to popup flow if redirect fails (useful during development or when redirects are blocked)
      try {
        console.debug('Falling back to loginPopup');
        const result: AuthenticationResult = await this.pca.loginPopup({ scopes: ['openid', 'profile', 'User.Read'] } as any);
        this.handleResult(result);
      } catch (popupErr) {
        console.error('Login popup fallback also failed', popupErr);
      }
    }
  }

  async logout(): Promise<void> {
    try {
      if (this.initialized) await this.initialized;
      // Use redirect logout to clear session
      await this.pca.logoutRedirect({ account: this.account } as any);
      // After logout redirect, tokens will be cleared. Also clear local storage as a fallback.
      this.account = null;
      localStorage.removeItem('access_token');
    } catch (e) {
      console.error('Logout (redirect) error', e);
      // clear local state anyway
      this.account = null;
      localStorage.removeItem('access_token');
    }
  }

  private handleResult(result: AuthenticationResult) {
    if (result && result.accessToken) {
      // MSAL stores tokens in its own cache; copy to localStorage for the existing AuthInterceptor
      localStorage.setItem('access_token', result.accessToken);
    }
    if (result && result.account) {
      this.account = result.account;
    }
  }

  async acquireToken(scopes: string[] = ['User.Read']): Promise<string | null> {
    // If there's no account in memory, attempt a silent SSO/token acquisition first.
    if (!this.account) {
      try {
        const ssoResult = await (this.pca as any).ssoSilent({ scopes: scopes });
        if (ssoResult && (ssoResult as any).accessToken) {
          this.handleResult(ssoResult as any);
        }
      } catch (e) {
        // ignore - proceed to return null or attempt interactive flow below
        console.debug('ssoSilent in acquireToken failed', e);
      }
    }

    if (!this.account) return null;
    try {
      const request = {
        scopes,
        account: this.account
      } as any;
      const result = await this.pca.acquireTokenSilent(request);
      if (result && result.accessToken) {
        localStorage.setItem('access_token', result.accessToken);
        return result.accessToken;
      }
    } catch (e) {
      // Fallback to interactive
      try {
        const result = await this.pca.acquireTokenPopup({ scopes } as any);
        if (result && result.accessToken) {
          localStorage.setItem('access_token', result.accessToken);
          return result.accessToken;
        }
      } catch (err) {
        console.error('Acquire token failed', err);
      }
    }
    return null;
  }
}
