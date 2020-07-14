import { OperacionesCatalogo, SavingStatus } from '../../constants';

export type CrudModuleActions<MainModel, SearchModel, RowModel> =
    | {
          type: 'SET_SEARCH_PARAMETERS';
          searchParameters: SearchModel;
      }
    | {
          type: 'SET_SEARCH_RESULTS';
          results: RowModel[];
      }
    | {
          type: 'SET_ROWS_SELECTION';
          selectedRow: RowModel;
      }
    | {
          type: 'SET_MODEL';
          model: MainModel;
      }
    | {
          type: 'OPEN_MODAL';
          mode: OperacionesCatalogo;
      }
    | {
          type: 'SAVE_MODEL';
      }
    | {
          type: 'SET_MODEL_SAVE_SUCCESS';
      }
    | {
          type: 'SET_MODEL_SAVE_ERROR';
          error: string;
      }
    | {
          type: 'CLOSE_MODAL';
      };

export interface ICrudeModuleState<MainModel, SearchModel, RowModel> {
    searchParameters: SearchModel;
    searchResults: RowModel[];
    selectedRow: RowModel | null;
    currentModel: MainModel;
    modalOpen: boolean;
    modalMode: OperacionesCatalogo;
    savingStatus: SavingStatus;
    isLoadingModel: boolean;
    modalErrorMessage: string | null;
}

export interface ICrudModuleApi<MainModel, SearchModel, RowModel> {
    find(parameters: SearchModel): Promise<RowModel[]>;
    create(model: MainModel): Promise<MainModel>;
    update(model: MainModel): Promise<MainModel>;
    getModelFromResultRow(resultRow: RowModel): MainModel;
    destroy(model: MainModel): Promise<void>;
}

export type CrudModuleDispatch<
    MainModel,
    SearchModel,
    RowModel
> = React.Dispatch<CrudModuleActions<MainModel, SearchModel, RowModel>>;

export interface ICrudActionsCreators<
    MainModel,
    SearchModel,
    RowModel,
    ApiService extends ICrudModuleApi<MainModel, SearchModel, RowModel>,
    State extends ICrudeModuleState<MainModel, SearchModel, RowModel>
> {
    api: ApiService;
    fetchFullModel(selectedRow: RowModel | null): Promise<MainModel | null>;
    selectRow(
        selectedRow: RowModel
    ): (dispatch: CrudModuleDispatch<MainModel, SearchModel, RowModel>) => void;
    search(
        parameters: SearchModel
    ): (dispatch: CrudModuleDispatch<MainModel, SearchModel, RowModel>) => void;
    searchAndSetResults(
        dispatch: CrudModuleDispatch<MainModel, SearchModel, RowModel>,
        parameters: SearchModel
    ): void;
    fetchAndDisplayModel(
        mode: OperacionesCatalogo
    ): (
        dispatch: CrudModuleDispatch<MainModel, SearchModel, RowModel>,
        getState: () => State
    ) => void;
    saveModel(
        model: MainModel
    ): (
        dispatch: CrudModuleDispatch<MainModel, SearchModel, RowModel>,
        getState: () => State
    ) => void;
    deleteSelectedModel(): (
        dispatch: CrudModuleDispatch<MainModel, SearchModel, RowModel>,
        getState: () => State
    ) => Promise<void>;
}
