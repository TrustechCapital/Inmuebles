import BienResultRow from '../models/BienResultRow';
import { MainBienesState, ITableBienesParameters } from '../types';
import Bien from '../../../../models/Bien';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';
import { bienesApi } from '../services';

type MainBienesActions =
    | {
          type: 'SET_BIENES_SEARCH_PARAMETERS';
          searchParameters: ITableBienesParameters;
      }
    | {
          type: 'SET_BIENES_SEARCH_RESULTS';
          results: BienResultRow[];
      }
    | {
          type: 'SET_BIENES_ROWS_SELECTION';
          selectedRows: BienResultRow[];
      }
    | {
          type: 'SET_BIEN_MODEL';
          model: Bien;
      }
    | {
          type: 'OPEN_BIENES_MODAL';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'SAVE_BIEN_MODEL';
      }
    | {
          type: 'SET_MODEL_SAVE_SUCCESS';
      }
    | {
          type: 'SET_MODEL_SAVE_ERROR';
          error: string;
      }
    | {
          type: 'CLOSE_BIENES_MODAL';
      }
    | {
          type: 'OPEN_DETALLE_BIENES_MODAL';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'CLOSE_DETALLE_BIENES_MODAL';
      };

type BienesDispatcher = React.Dispatch<MainBienesActions>;

function mainBienesReducer(
    state: MainBienesState,
    action: MainBienesActions
): MainBienesState {
    switch (action.type) {
        case 'SET_BIENES_SEARCH_PARAMETERS':
            return {
                ...state,
                bienes: {
                    ...state.bienes,
                    searchParameters: action.searchParameters,
                    selectedRows: [],
                },
            };
        case 'SET_BIENES_SEARCH_RESULTS':
            return {
                ...state,
                bienes: {
                    ...state.bienes,
                    searchResults: action.results,
                },
                detalleBienes: {
                    ...state.detalleBienes,
                    showActionsToolbar: false,
                },
            };
        case 'SET_BIENES_ROWS_SELECTION':
            return {
                ...state,
                bienes: {
                    ...state.bienes,
                    selectedRows: action.selectedRows,
                },
                detalleBienes: {
                    ...state.detalleBienes,
                    showActionsToolbar: true,
                },
            };
        case 'SET_BIEN_MODEL':
            return {
                ...state,
                bienes: {
                    ...state.bienes,
                    currentModel: action.model,
                },
            };
        case 'OPEN_BIENES_MODAL':
            const esConsultaOModificacion =
                action.mode === OperacionesCatalogo.Consulta ||
                action.mode === OperacionesCatalogo.Modificacion;
            const esAlta = action.mode === OperacionesCatalogo.Alta;

            const shouldOpenModal =
                esAlta ||
                (esConsultaOModificacion &&
                    state.bienes.selectedRows.length === 1);

            if (shouldOpenModal) {
                return {
                    ...state,
                    bienes: {
                        ...state.bienes,
                        modalOpen: true,
                        modalMode: action.mode,
                        savingStatus: SavingStatus.Initial,
                    },
                };
            }

            return state;
        case 'CLOSE_BIENES_MODAL':
            return {
                ...state,
                bienes: {
                    ...state.bienes,
                    modalOpen: false,
                },
            };
        case 'SAVE_BIEN_MODEL':
            return {
                ...state,
                bienes: {
                    ...state.bienes,
                    savingStatus: SavingStatus.Saving,
                    modalErrorMessage: null,
                },
            };
        case 'SET_MODEL_SAVE_SUCCESS':
            let modalMode = state.bienes.modalMode;

            // Cambiar modo de edicion del modal
            if (modalMode === OperacionesCatalogo.Alta) {
                modalMode = OperacionesCatalogo.Modificacion;
            }

            return {
                ...state,
                bienes: {
                    ...state.bienes,
                    savingStatus: SavingStatus.Success,
                    modalMode: modalMode,
                },
            };
        case 'SET_MODEL_SAVE_ERROR':
            return {
                ...state,
                bienes: {
                    ...state.bienes,
                    savingStatus: SavingStatus.Error,
                    modalErrorMessage: action.error,
                },
            };
        case 'OPEN_DETALLE_BIENES_MODAL':
            return {
                ...state,
                detalleBienes: {
                    ...state.detalleBienes,
                    modalOpen: true,
                },
            };
        case 'CLOSE_DETALLE_BIENES_MODAL':
            return {
                ...state,
                detalleBienes: {
                    ...state.detalleBienes,
                    modalOpen: false,
                },
            };
        default:
            return state;
    }
}

async function fetchDetalleBien(
    selectedBienesRow: BienResultRow[]
): Promise<Bien | null> {
    if (selectedBienesRow.length !== 1) {
        return null;
    }

    const bienResultRow = selectedBienesRow[0];
    let bien = new Bien(
        bienResultRow.idFideicomiso,
        bienResultRow.idSubcuenta,
        bienResultRow.idTipoBien
    );

    return await bienesApi.findByPK(bien);
}

function fetchAndDisplayModel(mode: OperacionesCatalogo) {
    return async (
        dispatch: BienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();
        const loadedModel = await fetchDetalleBien(state.bienes.selectedRows);

        if (loadedModel !== null) {
            dispatch({
                type: 'SET_BIEN_MODEL',
                model: loadedModel,
            });
        }

        dispatch({
            type: 'OPEN_BIENES_MODAL',
            mode: mode,
        });
    };
}

function newSearchBienes(parameters: ITableBienesParameters) {
    return async (dispatch: BienesDispatcher) => {
        dispatch({
            type: 'SET_BIENES_SEARCH_PARAMETERS',
            searchParameters: parameters,
        });

        await searchBienes(dispatch, parameters);
    };
}

async function searchBienes(
    dispatch: BienesDispatcher,
    parameters: ITableBienesParameters
) {
    const bienes = await bienesApi.find(parameters);
    dispatch({
        type: 'SET_BIENES_SEARCH_RESULTS',
        results: bienes,
    });
}

async function repeatCurrentSearch(
    dispatch: BienesDispatcher,
    getState: () => MainBienesState
) {
    const state = getState();
    await searchBienes(dispatch, state.bienes.searchParameters);
}

function saveBienModel(model: Bien) {
    return async (
        dispatch: BienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();
        dispatch({
            type: 'SAVE_BIEN_MODEL',
        });

        try {
            if (state.bienes.modalMode === OperacionesCatalogo.Alta) {
                await bienesApi.create(model);
            } else {
                await bienesApi.update(model);
            }

            dispatch({
                type: 'SET_MODEL_SAVE_SUCCESS',
            });

            repeatCurrentSearch(dispatch, getState);
        } catch (err) {
            dispatch({
                type: 'SET_MODEL_SAVE_ERROR',
                error: err.message,
            });
        }
    };
}

function deleteSelectedBienModels() {
    return async (
        dispatch: BienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();
        const selectedRows = state.bienes.selectedRows;

        selectedRows.forEach(() => {
            const model = bienesApi.getModelFromResultRow(
                state.bienes.selectedRows[0]
            );
            bienesApi
                .destroy(model)
                .then(() => {
                    repeatCurrentSearch(dispatch, getState);
                })
                .catch((e) => {
                    console.log(
                        'Ocurrio un error al eliminar el bien',
                        selectedRows,
                        e
                    );
                });
        });
    };
}

export {
    mainBienesReducer,
    fetchAndDisplayModel,
    newSearchBienes,
    saveBienModel,
    deleteSelectedBienModels,
};
