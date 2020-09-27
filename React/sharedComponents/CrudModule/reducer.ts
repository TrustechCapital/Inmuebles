import { ICrudeModuleState, CrudModuleActions } from './types';
import { OperacionesCatalogo, SavingStatus } from '../../constants';

interface ICrudModuleReduceHelpers<MainModel, SearchModel, RowModel> {
    mainModelFromRow: (rowModel: RowModel) => MainModel;
    newModel: () => MainModel;
}

export default function CrudModuleReducer<MainModel, SearchModel, RowModel>(
    state: ICrudeModuleState<MainModel, SearchModel, RowModel>,
    action: CrudModuleActions<MainModel, SearchModel, RowModel>,
    helperFunctions: ICrudModuleReduceHelpers<MainModel, SearchModel, RowModel>
): ICrudeModuleState<MainModel, SearchModel, RowModel> {
    switch (action.type) {
        case 'SET_SEARCH_PARAMETERS':
            return {
                ...state,
                searchParameters: action.searchParameters,
                selectedRow: null,
            };
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.results,
            };
        case 'SET_ROWS_SELECTION':
            const selectedRow = action.selectedRow;
            return {
                ...state,
                selectedRow: action.selectedRow,
                currentModel: helperFunctions.mainModelFromRow(selectedRow),
            };
        case 'SET_MODEL':
            return {
                ...state,
                currentModel: action.model,
            };
        case 'OPEN_MODAL':
            let currentModel = state.currentModel;
            const esConsultaOModificacion =
                action.mode === OperacionesCatalogo.Consulta ||
                action.mode === OperacionesCatalogo.Modificacion;
            const esAlta = action.mode === OperacionesCatalogo.Alta;

            if (esAlta) {
                currentModel = helperFunctions.newModel();
            }

            const shouldOpenModal =
                esAlta || (esConsultaOModificacion && state.selectedRow);

            if (shouldOpenModal) {
                return {
                    ...state,
                    modalOpen: true,
                    modalMode: action.mode,
                    savingStatus: SavingStatus.Initial,
                    currentModel: currentModel,
                };
            }

            return state;
        case 'CLOSE_MODAL':
            return {
                ...state,
                modalOpen: false,
                modalErrorMessage: null,
            };
        case 'SAVE_MODEL':
            return {
                ...state,
                savingStatus: SavingStatus.Saving,
                modalErrorMessage: null,
            };
        case 'SET_MODEL_SAVE_SUCCESS':
            let modalMode = state.modalMode;

            // Cambiar modo de edicion del modal
            if (modalMode === OperacionesCatalogo.Alta) {
                modalMode = OperacionesCatalogo.Modificacion;
            }

            return {
                ...state,
                savingStatus: SavingStatus.Success,
                modalMode: modalMode,
            };
        case 'SET_MODEL_SAVE_ERROR':
            return {
                ...state,
                savingStatus: SavingStatus.Error,
                modalErrorMessage: action.error,
            };
        default:
            return state;
    }
}
