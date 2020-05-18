import BienResultRow from '../models/BienResultRow';
import { MainBienesState, ITableBienesParameters } from '../types';
import Bien from '../../../../models/Bien';
import { OperacionesCatalogo } from '../../../../constants';
import { bienesApi } from '../services';

type MainBienesActions =
    | {
          type: 'bienesList';
          results: BienResultRow[];
      }
    | {
          type: 'selectedBienesRows';
          selectedRows: BienResultRow[];
      }
    | {
          type: 'loadBienesModel';
          model: Bien;
      }
    | {
          type: 'openBienesModal';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'closeBienesModal';
      }
    | {
          type: 'openDetalleBienesModal';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'closeDetalleBienesModal';
      };

type BienesDispatcher = React.Dispatch<MainBienesActions>;

function mainBienesReducer(state: MainBienesState, action: MainBienesActions) {
    switch (action.type) {
        case 'bienesList':
            return {
                ...state,
                bienesList: action.results,
                selectedBienes: [],
                showActionsDetalleBienesTable: false,
            };
        case 'selectedBienesRows':
            return {
                ...state,
                selectedBienesRows: action.selectedRows,
                showActionsDetalleBienesTable: true,
            };
        case 'loadBienesModel':
            return {
                ...state,
                currentBienModel: action.model,
            };
        case 'openBienesModal':
            if (
                (action.mode === OperacionesCatalogo.Consulta ||
                    action.mode === OperacionesCatalogo.Modificacion) &&
                state.selectedBienesRows.length === 1
            ) {
                return {
                    ...state,
                    modalBienesOpen: true,
                    modalBienesMode: action.mode,
                };
            }

            if (
                action.mode === OperacionesCatalogo.Baja &&
                state.selectedBienesRows.length > 0
            ) {
                return {
                    ...state,
                    modalBienesOpen: true,
                    modalBienesMode: action.mode,
                };
            }

            if (action.mode === OperacionesCatalogo.Alta) {
                return {
                    ...state,
                    modalBienesOpen: true,
                    modalBienesMode: action.mode,
                };
            }

            return state;
        case 'closeBienesModal':
            return {
                ...state,
                modalBienesOpen: false,
            };
        case 'openDetalleBienesModal':
            return {
                ...state,
                modalDetalleBienesOpen: true,
            };
        case 'closeDetalleBienesModal':
            return {
                ...state,
                modalDetalleBienesOpen: false,
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

    const isModelAlreadyLoaded = currentBienModel.hasSamePkAs(bien);

    if (isModelAlreadyLoaded) {
        return null;
    }

    return await bienesApi.findByPK(bien);
}

function fetchAndDisplayModel(mode: OperacionesCatalogo) {
    return async (dispatch: BienesDispatcher, getState: any) => {
        const state: MainBienesState = getState();

        const loadedModel = await fetchDetalleBien(
            state.selectedBienesRows,
            state.currentBienModel
        );

        if (loadedModel !== null) {
            dispatch({
                type: 'loadBienesModel',
                model: loadedModel,
            });
        }

        dispatch({
            type: 'openBienesModal',
            mode: mode,
        });
    };
}

function searchBienes(parameters: ITableBienesParameters) {
    return async (dispatch: BienesDispatcher) => {
        dispatch({
            type: 'bienesList',
            results: [],
        });

        const bienes = await bienesApi.find(parameters);

        dispatch({
            type: 'bienesList',
            results: bienes,
        });
    };
}

function saveBienModel(model: Bien) {
    return async (dispatch: BienesDispatcher) => {
        debugger;
        const updatedBien = await bienesApi.update(model);
        dispatch({
            type: 'loadBienesModel',
            model: updatedBien,
        });
    };
}

export { mainBienesReducer, fetchAndDisplayModel, searchBienes, saveBienModel };
