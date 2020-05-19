import BienResultRow from '../models/BienResultRow';
import { MainBienesState, ITableBienesParameters } from '../types';
import Bien from '../../../../models/Bien';
import { OperacionesCatalogo, SavingStatus } from '../../../../constants';
import { bienesApi } from '../services';

type MainBienesActions =
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
        case 'SET_BIENES_SEARCH_RESULTS':
            return {
                ...state,
                bienes: {
                    ...state.bienes,
                    searchResults: action.results,
                    selectedRows: [],
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
            return {
                ...state,
                bienes: {
                    ...state.bienes,
                    savingStatus: SavingStatus.Success,
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
    selectedBienesRow: BienResultRow[],
    currentBienModel: Bien
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
    return async (dispatch: BienesDispatcher, getState: any) => {
        const state: MainBienesState = getState();

        const loadedModel = await fetchDetalleBien(
            state.bienes.selectedRows,
            state.bienes.currentModel
        );

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

function searchBienes(parameters: ITableBienesParameters) {
    return async (dispatch: BienesDispatcher) => {
        dispatch({
            type: 'SET_BIENES_SEARCH_RESULTS',
            results: [],
        });

        const bienes = await bienesApi.find(parameters);

        dispatch({
            type: 'SET_BIENES_SEARCH_RESULTS',
            results: bienes,
        });
    };
}

function saveBienModel(model: Bien) {
    return async (dispatch: BienesDispatcher) => {
        dispatch({
            type: 'SAVE_BIEN_MODEL',
        });

        try {
            await bienesApi.update(model);
            dispatch({
                type: 'SET_MODEL_SAVE_SUCCESS',
            });
        } catch (err) {
            dispatch({
                type: 'SET_MODEL_SAVE_ERROR',
                error: err.message,
            });
        }
    };
}

export { mainBienesReducer, fetchAndDisplayModel, searchBienes, saveBienModel };
