export type TGenerateToken = (length: number) => string;

export type TGetWeekStartDate = (date: Date, weekStart?: number) => Date;

export type TGetWeekLabel = (date: Date, weekStart?: number) => string;

export type TGenerateSerial = (name: string, state: string) => Promise<string>;
