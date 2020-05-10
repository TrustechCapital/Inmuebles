import { useReducer, Dispatch, Reducer, ReducerAction } from 'react';

type TableSearchActions =
    | {
          type: 'field';
          fieldName: string;
          value: string | number | null;
      }
    | { type: 'clear'; initialState: any };

function searchParamsReducer<T>(state: T, action: TableSearchActions): T {
    switch (action.type) {
        case 'field':
            return {
                ...state,
                [action.fieldName]: action.value,
            };
        case 'clear':
            return {
                ...action.initialState,
            };
        default:
            return state;
    }
}

// Tipos auxiliares para cumplir con la estructura requerida del hook React.useReducer
type SearchParamsReducer<T> = Reducer<T, TableSearchActions>;
type SearchParamsDispatcher<T> = Dispatch<
    ReducerAction<SearchParamsReducer<T>>
>;

export function useSearchParamsReducer<T>(
    initialState: T
): [T, SearchParamsDispatcher<T>] {
    return useReducer<SearchParamsReducer<T>>(
        searchParamsReducer,
        initialState
    );
}
