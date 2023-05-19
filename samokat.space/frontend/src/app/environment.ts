interface Environment {
  baseUrl: string;
}

export const environment: Environment = {
  baseUrl: process.env.REACT_APP_BASE_URL!,
};
