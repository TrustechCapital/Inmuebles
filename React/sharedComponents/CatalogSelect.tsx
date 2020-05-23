import React from 'react';
import GenericSelect, { GenericSelectProps } from './GenericSelect';

import { catalogsApi } from '../core/api';

export type CatalogSelectProps = {
    catalogId?: number;
    parentCatalogId?: number;
    parentValue?: number | string | null;
    useLabelAsValue?: boolean;
} & GenericSelectProps;

const CatalogSelect: React.FC<CatalogSelectProps> = ({
    catalogId,
    parentValue,
    parentCatalogId,
    useLabelAsValue = false,
    valueKey,
    ...selectProps
}) => {
    let items = [];
    if (parentCatalogId) {
        items =
            parentValue === undefined
                ? []
                : catalogsApi.getChildCatalog(parentCatalogId, parentValue);
    } else {
        items = !catalogId ? [] : catalogsApi.getCatalogById(catalogId);
    }

    return (
        <GenericSelect
            items={items}
            valueKey={useLabelAsValue ? 'label' : valueKey}
            {...selectProps}
        />
    );
};

export default CatalogSelect;
