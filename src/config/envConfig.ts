interface IEnvConfig {
  backendUrl: string;
  cloudKey: string;
};

const _conf: IEnvConfig = {
  backendUrl: import.meta.env.VITE_BACKEND_URL as string,
  cloudKey: import.meta.env.VITE_GOOGLE_CLOUD_KEY as string,
};

export const envConfig = Object.freeze(_conf);