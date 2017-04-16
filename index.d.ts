export type TestDouble<O> = (...args: any[]) => O;

export type DoubledObjectWithKey<Key extends string> = {};

export type DoubledObject<Subject> = Subject;

export interface TestdoubleConfig {
  promiseConstructor?: any;
  ignoreWarnings?: boolean;
  suppressErrors?: boolean;
}
export function config(config: TestdoubleConfig): void;

declare function functionDouble<O>(name?: string): TestDouble<O>;
export { functionDouble as function };

// When passed class or constructor function
export function object<T>(constructor: { new (...args: any[]): T }): DoubledObject<T>;

// When passed array of props
export function object<Key extends string>(props: Key[]): DoubledObjectWithKey<Key>;

// When passed general object
export function object<T>(object: T): DoubledObject<T>;

type PossiblePromise<O> = O | Promise<O>;

export interface Stubber<O> {
  thenReturn(out: O): TestDouble<O>;
  thenDo(f: (I) => O | void): TestDouble<O>;
  thenThrow(e: Error): TestDouble<O>;
  thenResolve(v: any): TestDouble<O>;
  thenReject(e: Error): TestDouble<O>;
  thenCallback(...args: any[]): TestDouble<O>;
}

export function callback(...args: any[]): void;

export function when<O>(td: TestDouble<O>): Stubber<O>;

export interface Matchers {
  anything(): any;
  isA(type: Function): any;
  contains(a: string|any[]|{}): any;
  argThat(matcher: Function): any;
  not(v: any): any;
  captor(): Captor
}

export interface Captor {
  capture(): any;
  value?: any;
  values?: any[];
}

export const matchers: Matchers;

export function replace(path: string, f?: any): any;
export function replace(path: {}, property: string, f?: any): any;

export function reset(): void;

export interface VerificationConfig {
  ignoreExtraArgs?: boolean;
  times?: number;
}

export function verify(a: any, check?: VerificationConfig): void;

interface Call {
  context: {};
  args: any[];
}

export interface Explanation {
  callCount: number;
  calls: Call[];
  description: string;
}

export function explain(f: TestDouble<any>): Explanation;
