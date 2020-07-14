import {
    useEnhancedReducer,
    ActionPromiseSignature,
} from '../../sharedHooks/enhancedReducer';
import { useMemo, Reducer } from 'react';
import { useGlobalNotification } from '../../sharedHooks/globalMessages';
import { OperacionesCatalogo, SavingStatus } from '../../constants';
import { requestConfirmation } from '../ConfirmationModal';
import { Thunk } from 'react-hook-thunk-reducer';
import {
    ICrudModuleApi,
    ICrudActionsCreators,
    CrudModuleActions,
    ICrudeModuleState,
} from './types';

export const crudModuleInitialState = {
    searchParameters: {
        idFideicomiso: null,
        idDepto: '',
        calleYNumero: '',
        status: '',
    },
    searchResults: [],
    selectedRow: null,
    modalMode: OperacionesCatalogo.Alta,
    modalOpen: false,
    isLoadingModel: false,
    savingStatus: SavingStatus.Initial,
    modalErrorMessage: null,
};

type ExportedCallbacks<MainModel, SearchModel, RowModel> = {
    alertSuccess: (messaje: string) => void;
    alertError: (messaje: string) => void;
    onCloseModal: () => void;
    onSave: (model: MainModel) => void;
    onSearch: (parameters: SearchModel) => void;
    tableCallbacks: {
        onSelect: (selectedRows: RowModel[]) => void;
        onNew: () => void;
        onView: () => void;
        onModify: () => void;
        onDelete: () => Promise<void>;
    };
};

function useCrudModule<
    State extends ICrudeModuleState<MainModel, SearchModel, RowModel>,
    Action,
    MainModel,
    SearchModel,
    RowModel,
    ApiService extends ICrudModuleApi<MainModel, SearchModel, RowModel>
>(
    moduleReducer: Reducer<
        State,
        Action | CrudModuleActions<MainModel, SearchModel, RowModel>
    >,

    initialState: State,
    actions: ICrudActionsCreators<MainModel, SearchModel, RowModel, ApiService, State>,
): [
    State & ICrudeModuleState<MainModel, SearchModel, RowModel>,
    ExportedCallbacks<MainModel, SearchModel, RowModel>,
    React.Dispatch<Action | Thunk<State, Action>>,
    (action: ActionPromiseSignature<State, Action>) => Promise<any>
] {
    const [state, dispatch, promiseDispatch] = useEnhancedReducer(
        moduleReducer,
        initialState
    );

    const { alertSuccess, alertError } = useGlobalNotification();

    const callbacks = useMemo(() => {
        return {
            alertSuccess,

            alertError,

            onCloseModal: () => {
                dispatch({
                    type: 'CLOSE_MODAL',
                });
            },

            onSave: (model: MainModel) => {
                dispatch(actions.saveModel(model));
            },

            onSearch: (parameters: SearchModel) => {
                dispatch(actions.search(parameters));
            },

            tableCallbacks: {
                onSelect: (selectedRows: RowModel[]) => {
                    dispatch(actions.selectRow(selectedRows[0]));
                },

                onNew: () => {
                    dispatch({
                        type: 'OPEN_MODAL',
                        mode: OperacionesCatalogo.Alta,
                    });
                },

                onView: () => {
                    dispatch(
                        actions.fetchAndDisplayModel(
                            OperacionesCatalogo.Consulta
                        )
                    );
                },

                onModify: () => {
                    dispatch(
                        actions.fetchAndDisplayModel(
                            OperacionesCatalogo.Modificacion
                        )
                    );
                },

                onDelete: async () => {
                    const confirmed = await requestConfirmation();
                    if (confirmed) {
                        promiseDispatch(actions.deleteSelectedModel())
                            .then(() => {
                                alertSuccess(
                                    'Registros eliminados exitosamente'
                                );
                            })
                            .catch((e: Error) => {
                                alertError(e.message);
                            });
                    }
                },
            },
        };
    }, []);

    return [state, callbacks, dispatch, promiseDispatch];
}

export default useCrudModule;
