import { blue, cyan, grey, magenta, white, yellowBright } from 'chalk';

import type {
  ClassType,
  MethodName,
  StaticMethodName,
} from './testUtils.types';

function printFunction (func: Function): string {
  return printAsync(func) + yellowBright(func.name) + grey` ()`;
}

function printAnonymFunction (name: string): string {
  return yellowBright(name) + grey` ()`;
}

function printAsync (fnc: Function): string {
  const isAsync = fnc.toString().startsWith('async ');
  return isAsync ? blue`async ` : '';
}

// Class

/** 
 *
 * @example
 * ```ts
 * import { MyClass } from './MyClass.model.ts';
 * 
 * describe(aClass(MyClass), () => {
 *   // tests ...
 * })
 * ``` 
 */
export function aClass (className: ClassType | Function): string {
  return magenta`class ` + cyan(className.name);
}

/** 
 *
 * @example
 * ```ts
 * import { MyClass } from './MyClass.model.ts';
 * 
 * describe(aClass(MyClass), () => {
 *   describe(aStaticMethod(MyClass, 'myStaticMethod'), () => {
 *     it(`does what it's intended`, () => {
 *       // test...
 *     })
 *   })
 * })
 * ``` 
 */
export function aStaticMethod<C extends ClassType | Function, M extends StaticMethodName<C>> (_className: C, method: M): string {
  const classMethod = _className[method] as Function;
  return blue`static ` + printFunction(classMethod);
}

/** 
 *
 * @example
 * ```ts
 * import { MyClass } from './MyClass.model.ts';
 * 
 * describe(aClass(MyClass), () => {
 *   describe(aMethod(MyClass, 'myMethod'), () => {
 *     it(`does what it's intended`, () => {
 *       // test...
 *     })
 *   })
 * })
 * ``` 
 */
export function aMethod<C extends ClassType | Function, M extends MethodName<C>> (_className: C, method: M): string {
  const classMethod = _className.prototype[method];
  return printFunction(classMethod);
}

/** 
 *
 * @example
 * ```ts
 * import { MyClass } from './MyClass.model.ts';
 * 
 * describe(aClass(MyClass), () => {
 *   describe(aGetter(MyClass, 'myGetter'), () => {
 *     it(`does what it's intended`, () => {
 *       // test...
 *     })
 *   })
 * })
 * ``` 
 */
export function aGetter<C extends ClassType | Function, M extends MethodName<C>> (_className: C, method: M): string {
  return magenta`get ` + printAnonymFunction(method.toString());
}

/** 
 *
 * @example
 * ```ts
 * import { MyClass } from './MyClass.model.ts';
 * 
 * describe(aClass(MyClass), () => {
 *   describe(aSetter(MyClass, 'mySetter'), () => {
 *     it(`does what it's intended`, () => {
 *       // test...
 *     })
 *   })
 * })
 * ``` 
 */
export function aSetter<C extends ClassType | Function, M extends MethodName<C>> (_className: C, method: M): string {
  return magenta`set ` + printAnonymFunction(method.toString());
}

// Function

/** 
 *
 * @example
 * ```ts
 * import { myFunction } from './myHelpers.helpers.ts';
 * 
 * describe(aFunction(myFunction), () => {
 *   it(`does what it's intended`, () => {
 *     // test...
 *   })
 * })
 * ``` 
 */
export function aFunction (func: Function): string {
  return magenta`function ` + printFunction(func);
}

// Factory

/** 
 *
 * @example
 * ```ts
 * import { myFactory } from './myHelpers.helpers.ts';
 * 
 * describe(aFactory(myFactory), () => {
 *   it(`does what it's intended`, () => {
 *     // test...
 *   })
 * })
 * ``` 
 */
export function aFactory (factory: Function): string { // FIXME: () => Obj does not work for $Object
  return aFunction(factory) + white` \{\}`;
}

/** */
export function aFactoryMethod<M extends string> (factory: Function, method: M): string { // FIXME: M extends KeysMatching<F, Func>
  return grey(factory.name) + white`.` + printAnonymFunction(method);
}

// Component

/** */
export function aComponent (component: { __name: string; }): string { // FIXME: () => Obj does not work for $Object
  return `<${component.__name}/>`;
}
