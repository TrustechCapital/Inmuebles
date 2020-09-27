import { useCallback, useState, useEffect } from 'react';
import { fideicomisosApi } from '../core/api/fideicomisos';

/*
 *   Returns a tuple: [nombreFideicomiso, findFideicomiso];
 */
export default function useNombreFideicomiso(resetProperties: any[]): [string, any] {
    const [nombreFideicomiso, setNombreFideicomiso] = useState('');

    useEffect(() => {
        setNombreFideicomiso('');
    }, resetProperties);

    const findNombreFideicomiso = useCallback(
        (idFideicomiso: number) => {
            fideicomisosApi.getName(idFideicomiso).then(setNombreFideicomiso);
        },
        []
    );

    return [nombreFideicomiso, findNombreFideicomiso];
}
