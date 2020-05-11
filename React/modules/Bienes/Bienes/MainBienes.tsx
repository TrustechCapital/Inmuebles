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
    selectedBienes: BienResultRow[];
    modalBienesOpen: boolean;
    modalDetalleBienesOpen: boolean;
    modalDetalleBienesMode: OperacionesCatalogo;
    showActionsDetalleBienesTable: boolean;
};

type MainBienesActions =
    | {
          type: 'bienesList';
          results: BienResultRow[];
      }
    | {
          type: 'selectedBienesRows';
          selectedBienes: BienResultRow[];
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
    selectedBienes: [],
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
                selectedBienes: action.selectedBienes,
                showActionsDetalleBienesTable: true,
            };
        case 'openBienesModal':
            if (
                (action.mode === OperacionesCatalogo.Consulta ||
                    action.mode === OperacionesCatalogo.Modificacion) &&
                state.selectedBienes.length === 1
            ) {
                return {
                    ...state,
                    modalBienesOpen: true,
                    modalBienesMode: action.mode,
                };
            }

            if (
                action.mode === OperacionesCatalogo.Baja &&
                state.selectedBienes.length > 0
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

    async function handleViewDetalleBien() {
        const bienResultRow = state.selectedBienes[0];
        const bien = new Bien(
            bienResultRow.idFideicomiso,
            bienResultRow.idSubcuenta,
            bienResultRow.idTipoBien
        );

        await bienesApi.findByPK(bien);
        dispatch({
            type: 'openBienesModal',
            mode: OperacionesCatalogo.Consulta,
        });
    }

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
                onSelect={(selectedBienes) =>
                    dispatch({
                        type: 'selectedBienesRows',
                        selectedBienes: selectedBienes,
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
                opened={state.modalBienesOpen}
                handleClose={() =>
                    dispatch({
                        type: 'closeBienesModal',
                    })
                }
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
