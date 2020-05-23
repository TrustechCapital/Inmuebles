import React from 'react';
import GenericSelect, { GenericSelectProps } from './GenericSelect';

import { catalogsApi } from '../core/api';

export type CatalogSelectProps = {
    catalogId?: number;
    parentCatalogId?: number;
    parentValue?: number | string | null;
    useLabelAsValue?: boolean;
} & GenericSelectProps;

function CatalogSelect(props: CatalogSelectProps) {
    const {
        catalogId,
        parentCatalogId,
        useLabelAsValue = false,
        valueKey,
        ...selectProps
    } = props;

    if (parentCatalogId) {
        const items =
            props.parentValue === undefined
                ? []
                : catalogsApi.getChildCatalog(
                      parentCatalogId,
                      props.parentValue
                  );

        return (
            <GenericSelect
                items={items}
                valueKey={useLabelAsValue ? 'label' : valueKey}
                {...selectProps}
            />
        );
    } else {
        const items = !catalogId ? [] : catalogsApi.getCatalogById(catalogId);

        return (
            <GenericSelect
                items={items}
                valueKey={useLabelAsValue ? 'label' : valueKey}
                {...selectProps}
            />
        );
    }
}

export default CatalogSelect;
