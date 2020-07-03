import { useContext, useCallback } from 'react';
import { SessionInfoContext } from '../core/LoginContext';

/*
 *   Returns a tuple: [canAccess, canView, canEdit];
 */

export default function useModulePermissions() {
    const { modulePermissionsMap } = useContext(SessionInfoContext);

    const canView = useCallback(
        (moduleName: string) => {
            return !!modulePermissionsMap?.get(moduleName)?.canView;
        },
        [modulePermissionsMap]
    );

    const canEdit = useCallback(
        (moduleName: string) => {
            return !!modulePermissionsMap?.get(moduleName)?.canEdit;
        },
        [modulePermissionsMap]
    );

    return [canView, canEdit];
}
