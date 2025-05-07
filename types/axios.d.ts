import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAttachAccessToken?: boolean;
  }
}
