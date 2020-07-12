import { Reducer, useCallback } from 'react';
import useThunkReducer, { Thunk } from 'react-hook-thunk-reducer';

/*
    useEnhancedReducer es un React Hook que extiende la funcionalidad de useThunkReducer
    para permitir que el dispatcher regrese una promesa. Esto es util para regresar el
    control del flujo a la UI y mandar alertas al usuario basados en alguna operacion
    asincrona. Ejemplo:

    const [state, originalDispatch, promiseDispatch] = useEnhancedReducer(reducer, initialState);

    promiseDispatch(someAction())
    .then(...)
    .catch(...)

    o bien

    await promiseDispatch(someAction());

*/

export type ActionPromiseSignature<S, A> = (
    dispatch: React.Dispatch<A>,
    getState: () => S
) => Promise<any>;

function useEnhancedReducer<S, A>(
    reducer: Reducer<S, A>,
    initialArg: S
): [
    S,
    React.Dispatch<A | Thunk<S, A>>,
    (action: ActionPromiseSignature<S, A>) => Promise<any>
] {
    const [state, originalDispatch] = useThunkReducer(reducer, initialArg);

    const promiseDispatch = useCallback(function (
        action: ActionPromiseSignature<S, A>
    ): Promise<any> {
        return new Promise((res, rej) => {
            originalDispatch(
                (dispatch: React.Dispatch<A>, getState: () => S) => {
                    action(dispatch, getState).then(res, rej);
                }
            );
        });
    },
    []);

    return [state, originalDispatch, promiseDispatch];
}

export { useEnhancedReducer };
