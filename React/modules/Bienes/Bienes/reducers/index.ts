import BienResultRow from '../models/BienResultRow';
import { MainBienesState, ITableBienesParameters } from '../types';
import Bien from '../../../../models/Bien';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';
import { bienesApi, detalleBienesApi } from '../services';
import DetalleBienResultRow from '../models/DetalleBienResultRow';

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
          selectedRow: BienResultRow;
          detalleBienSearchResults: DetalleBienResultRow[];
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
                    selectedRow: null,
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
                    selectedRow: action.selectedRow,
                },
                detalleBienes: {
                    ...state.detalleBienes,
                    searchResults: action.detalleBienSearchResults,
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
            let currentModel = state.bienes.currentModel;
            const esConsultaOModificacion =
                action.mode === OperacionesCatalogo.Consulta ||
                action.mode === OperacionesCatalogo.Modificacion;
            const esAlta = action.mode === OperacionesCatalogo.Alta;

            if (esAlta) {
                currentModel = new Bien(null, null, null);
            }

            const shouldOpenModal =
                esAlta || (esConsultaOModificacion && state.bienes.selectedRow);

            if (shouldOpenModal) {
                return {
                    ...state,
                    bienes: {
                        ...state.bienes,
                        modalOpen: true,
                        modalMode: action.mode,
                        savingStatus: SavingStatus.Initial,
                        currentModel: currentModel,
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
    selectedBienesRow: BienResultRow | null
): Promise<Bien | null> {
    if (!selectedBienesRow) {
        return null;
    }

    let bien = new Bien(
        selectedBienesRow.idFideicomiso,
        selectedBienesRow.idSubcuenta,
        selectedBienesRow.idTipoBien
    );

    return await bienesApi.findByPK(bien);
}

function selectBienesRow(selectedRow: BienResultRow) {
    return async (
        dispatch: BienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const detalleBienesSearchResults = await detalleBienesApi.find(
            selectedRow
        );

        dispatch({
            type: 'SET_BIENES_ROWS_SELECTION',
            selectedRow: selectedRow,
            detalleBienSearchResults: detalleBienesSearchResults,
        });
    };
}

function fetchAndDisplayModel(mode: OperacionesCatalogo) {
    return async (
        dispatch: BienesDispatcher,
        getState: () => MainBienesState
    ) => {
        const state = getState();
        const loadedModel = await fetchDetalleBien(state.bienes.selectedRow);

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

        if (!state.bienes.selectedRow) {
            return;
        }

        const model = bienesApi.getModelFromResultRow(state.bienes.selectedRow);
        await bienesApi.destroy(model);
        repeatCurrentSearch(dispatch, getState);
    };
}

export {
    mainBienesReducer,
    selectBienesRow,
    fetchAndDisplayModel,
    newSearchBienes,
    saveBienModel,
    deleteSelectedBienModels,
};
