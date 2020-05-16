import React from 'react';
import GenericSelect, { GenericSelectProps } from './GenericSelect';

import { catalogsApi } from '../core/api';

export type CatalogSelectProps = GenericSelectProps & {
    catalogId: number;
    useLabelAsValue?: boolean;
};

const CatalogSelect: React.FC<CatalogSelectProps> = ({
    catalogId,
    useLabelAsValue = false,
    valueKey,
    ...selectProps
}) => {
    const items = catalogsApi.getCatalogById(catalogId);

    return (
        <GenericSelect
            items={items}
            valueKey={useLabelAsValue ? 'label' : valueKey}
            {...selectProps}
        />
    );
};

export default CatalogSelect;
