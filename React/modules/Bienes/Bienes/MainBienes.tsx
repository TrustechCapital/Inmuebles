import React, { useReducer } from 'react';

import { ITableBienesParameters } from './types';
import BienResultRow from './models/BienResultRow';
import TableBienes from './TableBienes';
import TableDetalleBienes from './TableDetalleBienes';
import DialogBienes from './DialogBienes';
import DialogDetalleBienes from './DialogDetalleBienes';
import { OperacionesCatalogo } from '../../../constants';
import Bien from '../../../models/Bien';
import { bienesApi } from './services';

type MainBienesState = {
    searchParameters: ITableBienesParameters;
    modalBienesMode: OperacionesCatalogo;
    bienesList: BienResultRow[];
    selectedBienesRows: BienResultRow[];
    currentBienModel: Bien;
    modalBienesOpen: boolean;
    modalDetalleBienesOpen: boolean;
    modalDetalleBienesMode: OperacionesCatalogo;
    showActionsDetalleBienesTable: boolean;
};

type ValidFormValue = string | number | boolean | Date | null;

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
          type: 'updateBienesModelField';
          fieldName: string;
          value: ValidFormValue;
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

const initialState: MainBienesState = {
    searchParameters: {
        idFideicomiso: null,
        idTipoBien: null,
        idSubcuenta: '',
    },
    modalBienesMode: OperacionesCatalogo.Alta,
    bienesList: [],
    selectedBienesRows: [],
    currentBienModel: new Bien(null, null, null),
    modalBienesOpen: false,
    modalDetalleBienesOpen: false,
    modalDetalleBienesMode: OperacionesCatalogo.Alta,
    showActionsDetalleBienesTable: false,
};

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
        case 'updateBienesModelField':
            Object.assign(state.currentBienModel, {
                [action.fieldName]: action.value,
            });
            return {
                ...state,
                currentBienModel: state.currentBienModel,
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

const MainBienes: React.FC = () => {
    const [state, dispatch] = useReducer(mainBienesReducer, initialState);

    async function searchBienes(parameters: ITableBienesParameters) {
        dispatch({
            type: 'bienesList',
            results: [],
        });
        const bienes = await bienesApi.find(parameters);
        dispatch({
            type: 'bienesList',
            results: bienes,
        });
    }

    function handleSelectDetalleBien() {}

    async function fetchDetalleBien() {
        if (state.selectedBienesRows.length !== 1) {
            return;
        }

        const bienResultRow = state.selectedBienesRows[0];
        let bien = new Bien(
            bienResultRow.idFideicomiso,
            bienResultRow.idSubcuenta,
            bienResultRow.idTipoBien
        );

        const isModelAlreadyLoaded = state.currentBienModel.hasSamePkAs(bien);

        if (isModelAlreadyLoaded) {
            return;
        }

        bien = await bienesApi.findByPK(bien);

        dispatch({
            type: 'loadBienesModel',
            model: bien,
        });
    }

    async function handleViewDetalleBien() {
        await fetchDetalleBien();

        dispatch({
            type: 'openBienesModal',
            mode: OperacionesCatalogo.Consulta,
        });
    }

    function handleModelBienFieldChange(fieldName: string) {
        return (value: any) => {
            dispatch({
                type: 'updateBienesModelField',
                fieldName,
                value,
            });
        };
    }

    function handleSaveBienModel() {}

    return (
        <div>
            <TableBienes
                data={state.bienesList}
                onNew={() =>
                    dispatch({
                        type: 'openBienesModal',
                        mode: OperacionesCatalogo.Alta,
                    })
                }
                onView={handleViewDetalleBien}
                onSelect={(selectedRows) =>
                    dispatch({
                        type: 'selectedBienesRows',
                        selectedRows: selectedRows,
                    })
                }
                onSearch={searchBienes}
            />
            <TableDetalleBienes
                data={[]}
                showActionsHeader={state.showActionsDetalleBienesTable}
                onNew={() =>
                    dispatch({
                        type: 'openDetalleBienesModal',
                        mode: OperacionesCatalogo.Alta,
                    })
                }
                onSelect={handleSelectDetalleBien}
            />
            <DialogBienes
                mode={state.modalBienesMode}
                open={state.modalBienesOpen}
                model={state.currentBienModel}
                onClose={() =>
                    dispatch({
                        type: 'closeBienesModal',
                    })
                }
                onSaveRequest={handleSaveBienModel}
                onModelFieldChange={handleModelBienFieldChange}
            />
            <DialogDetalleBienes
                mode={state.modalDetalleBienesMode}
                opened={state.modalDetalleBienesOpen}
                handleClose={() =>
                    dispatch({
                        type: 'closeDetalleBienesModal',
                    })
                }
            />
        </div>
    );
};

export default MainBienes;
