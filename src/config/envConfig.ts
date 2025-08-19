interface IEnvConfig {
  backendUrl: string;
};

const _conf: IEnvConfig = {
  backendUrl: import.meta.env.VITE_BACKEND_URL as string,
};

export const envConfig = Object.freeze(_conf);