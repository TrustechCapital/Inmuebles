import React from 'react';
import GenericSelect from './GenericSelect';

import { catalogsApi } from '../core/catalogs';

function toInt(value: string) {
    if (value === null || (typeof value === 'string' && value.trim() === '')) {
        return null;
    } else {
        return parseInt(value, 10);
    }
}

type Props = {
    label: string;
    value: number | null;
    catalogId: number;
    fullWidth: boolean;
    onChange: (value: number | null) => void;
};

const CatalogSelect: React.FC<Props> = ({
    catalogId,
    value,
    onChange,
    ...selectProps
}) => {
    const handleOnSelect = (value: string) => {
        onChange(toInt(value));
    };

    const items = catalogsApi.getCatalogById(catalogId);
    return (
        <GenericSelect
            items={items}
            value={value}
            onChange={handleOnSelect}
            {...selectProps}
        />
    );
};

export default CatalogSelect;
