declare global {
  interface Window {
    ym: (
      id: number,
      method: string,
      ...params: any[]
    ) => void;
  }
}

export {};

