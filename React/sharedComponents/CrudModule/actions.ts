import { OperacionesCatalogo } from '../../constants';
import {
    CrudModuleActions,
    ICrudModuleApi,
    ICrudActionsCreators,
    ICrudeModuleState,
} from './types';

export default abstract class CrudActions<
    MainModel,
    SearchModel,
    RowModel,
    ApiService extends ICrudModuleApi<MainModel, SearchModel, RowModel>
>
    implements
        ICrudActionsCreators<
            MainModel,
            SearchModel,
            RowModel,
            ApiService,
            ICrudeModuleState<MainModel, SearchModel, RowModel>
        > {
    api: ApiService;

    constructor(api: ApiService) {
        this.api = api;
    }

    abstract fetchFullModel(
        selectedRow: RowModel | null
    ): Promise<MainModel | null>;

    search(parameters: SearchModel) {
        return async (
            dispatch: React.Dispatch<
                CrudModuleActions<MainModel, SearchModel, RowModel>
            >
        ) => {
            dispatch({
                type: 'SET_SEARCH_PARAMETERS',
                searchParameters: parameters,
            });

            await this.searchAndSetResults(dispatch, parameters);
        };
    }

    async searchAndSetResults(
        dispatch: React.Dispatch<
            CrudModuleActions<MainModel, SearchModel, RowModel>
        >,
        parameters: SearchModel
    ) {
        const results = await this.api.find(parameters);
        dispatch({
            type: 'SET_SEARCH_RESULTS',
            results: results,
        });
    }

    selectRow(selectedRow: RowModel) {
        return (
            dispatch: React.Dispatch<
                CrudModuleActions<MainModel, SearchModel, RowModel>
            >
        ) => {
            dispatch({
                type: 'SET_ROWS_SELECTION',
                selectedRow: selectedRow,
            });
        };
    }

    async repeatCurrentSearch(
        dispatch: React.Dispatch<
            CrudModuleActions<MainModel, SearchModel, RowModel>
        >,
        getState: () => ICrudeModuleState<MainModel, SearchModel, RowModel>
    ) {
        const state = getState();
        return await this.searchAndSetResults(dispatch, state.searchParameters);
    }

    fetchAndDisplayModel(mode: OperacionesCatalogo) {
        return async (
            dispatch: React.Dispatch<
                CrudModuleActions<MainModel, SearchModel, RowModel>
            >,
            getState: () => ICrudeModuleState<MainModel, SearchModel, RowModel>
        ) => {
            const state = getState();
            const loadedModel = await this.fetchFullModel(state.selectedRow);

            if (loadedModel !== null) {
                dispatch({
                    type: 'SET_MODEL',
                    model: loadedModel,
                });
            }

            dispatch({
                type: 'OPEN_MODAL',
                mode: mode,
            });
        };
    }

    saveModel(model: MainModel) {
        return async (
            dispatch: React.Dispatch<
                CrudModuleActions<MainModel, SearchModel, RowModel>
            >,
            getState: () => ICrudeModuleState<MainModel, SearchModel, RowModel>
        ) => {
            const state = getState();
            dispatch({
                type: 'SAVE_MODEL',
            });

            try {
                if (state.modalMode === OperacionesCatalogo.Alta) {
                    await this.api.create(model);
                } else {
                    await this.api.update(model);
                }

                dispatch({
                    type: 'SET_MODEL_SAVE_SUCCESS',
                });

                this.repeatCurrentSearch(dispatch, getState);
            } catch (err) {
                dispatch({
                    type: 'SET_MODEL_SAVE_ERROR',
                    error: err.message,
                });
            }
        };
    }

    deleteSelectedModel() {
        return async (
            dispatch: React.Dispatch<
                CrudModuleActions<MainModel, SearchModel, RowModel>
            >,
            getState: () => ICrudeModuleState<MainModel, SearchModel, RowModel>
        ) => {
            const state = getState();

            if (!state.selectedRow) {
                return;
            }

            const model = this.api.getModelFromResultRow(state.selectedRow);
            await this.api.destroy(model);
            await this.repeatCurrentSearch(dispatch, getState);
        };
    }
}
