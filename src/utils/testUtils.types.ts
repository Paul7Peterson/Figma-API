/** Returns the keys of an object with the given type for the value */
export type KeysMatching<T extends Object | ClassType, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T];

/** Type for a class that returns a given interface */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ClassType<T extends {} = {}> = Function & { // FIXME
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new(...args: any[]): T;
};

/** Extracts the names of the instance methods of a given class */
export type MethodName<C extends ClassType | Function> =
  keyof C['prototype'];

/** Extracts the names of the static (class) methods of a given class */
export type StaticMethodName<C extends ClassType | Function> =
  KeysMatching<C, Function>;

export type ClassTyping<T extends string> = {
  __class__: T;
};

/** A HTTP or HTTPS URL as literal */
export type HTTP_URL = `http${'' | 's'}://${string}`;