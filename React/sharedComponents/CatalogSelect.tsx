import React from 'react';
import GenericSelect, { GenericSelectProps } from './GenericSelect';

import { catalogsApi } from '../core/api';

type CatalogSelectProps = Omit<GenericSelectProps, 'value' | 'onChange'> & {
    catalogId: number;
    useLabelAsValue?: boolean;
    value: number | string | null;
    onChange: (value: number | string | null) => void;
};

const CatalogSelect: React.FC<CatalogSelectProps> = ({
    catalogId,
    value,
    onChange,
    useLabelAsValue = false,
    valueKey,
    ...selectProps
}) => {
    const items = catalogsApi.getCatalogById(catalogId);

    const handleOnSelect = (value: string) => {
        onChange(useLabelAsValue ? value : parseInt(value, 10));
    };

    return (
        <GenericSelect
            items={items}
            value={value}
            valueKey={useLabelAsValue ? 'label' : valueKey}
            onChange={handleOnSelect}
            {...selectProps}
        />
    );
};

export default CatalogSelect;
