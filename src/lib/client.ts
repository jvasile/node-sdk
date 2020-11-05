import { ApiService } from './api/api.service';
import { PermSdkError } from './error';
import { AuthResource } from './resources/auth.resource';

export interface PermanentConstructorConfigI {
  sessionToken: string;
  mfaToken: string;
  archiveNbr: string;
  apiKey: string;
  baseUrl?: string;
}

export class Permanent {
  private apiKey: string;
  private sessionToken: string;
  private mfaToken: string;
  private archiveNbr: string;

  public api: ApiService;

  public auth: AuthResource;
  constructor(config: PermanentConstructorConfigI) {
    const { sessionToken, mfaToken, archiveNbr, apiKey, baseUrl } = config;

    if (!sessionToken) {
      throw new PermSdkError('Missing sessionToken in config');
    }

    if (!mfaToken) {
      throw new PermSdkError('Missing mfaToken in config');
    }

    if (!archiveNbr) {
      throw new PermSdkError('Missing archiveNbr in config');
    }

    if (!apiKey) {
      throw new PermSdkError('Missing apiKey in config');
    }

    this.sessionToken = sessionToken;
    this.mfaToken = mfaToken;
    this.archiveNbr = archiveNbr;
    this.apiKey = apiKey;
    this.api = new ApiService(sessionToken, mfaToken, this.apiKey, baseUrl);
    this.auth = new AuthResource(this.api);
  }

  public getSessionToken() {
    return this.sessionToken;
  }

  public getMfaToken() {
    return this.mfaToken;
  }

  public getArchiveNbr() {
    return this.archiveNbr;
  }
}