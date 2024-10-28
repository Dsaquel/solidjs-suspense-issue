import { Accessor, Component, createComponent, createContext, createEffect, createMemo, ParentProps, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

export function createContextProvider<T, P extends unknown & ParentProps>(
  factoryFn: (props: P) => T,
): [provider: Component<P>, useContext: () => T] {
  const ctx = createContext({} as T);
  return [
    props => {
      return createComponent(ctx.Provider, {
        value: factoryFn(props),
        get children() {
          return props.children;
        },
      });
    },
    () => useContext(ctx),
  ];
}

export function createProjection<T extends object, U = T>(
  accessor: Accessor<T | undefined>,
  options: {
    transform?: (values: T) => U
    initialValue: T
  },
): [() => T, SetStoreFunction<T>, () => U]
export function createProjection<T extends object, U = T>(
  accessor: Accessor<T | undefined>,
  options?: {
    transform?: (values: T) => U
    initialValue: undefined
  },
): [() => T | undefined, SetStoreFunction<T>, () => U]
export function createProjection<T extends object, U = T>(
  accessor: Accessor<T | undefined>,
  options?: {
    transform?: (values: T) => U
    initialValue?: T
  },
) {
  const [store, setStore] = createStore({ data: options?.initialValue })

  const set = ((...args: any[]) => {
    // @ts-ignore
    setStore('data', ...args)
  }) as SetStoreFunction<T>

  createEffect(() => {
    // To not block on suspense
    const a = accessor()
    if (a) {
      set(a)
    }
  })

  const memo = createMemo(() => {
    if (store.data) {
      return (options?.transform ?? ((x) => x as unknown as U))(store.data)
    }
  })

  const wrappedMemo = () => {
    // Trigger suspense
    accessor()

    // Split from the suspense as to not escape boundaries (until lazy memo)
    return memo()
  }

  const get = () => {
    accessor()
    return store.data
  }

  return [get, set, wrappedMemo] as const
}

type Data = Record<string, string>
export function fetchMockData(data: string): Promise<Data> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, 2000);
  });
}
