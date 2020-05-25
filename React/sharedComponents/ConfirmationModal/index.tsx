import baseConfirm from './BaseConfirmationModal';
import ConfirmationModal, { ConfirmationModalProps } from './ConfirmationModal';

const requestConfirmation = (
    props: Partial<ConfirmationModalProps> = {} as ConfirmationModalProps
) => {
    return baseConfirm<ConfirmationModalProps>(ConfirmationModal, props);
};

export type { ConfirmationComponentProps } from './BaseConfirmationModal';
export { baseConfirm as requestCustomConfirmation, requestConfirmation };
