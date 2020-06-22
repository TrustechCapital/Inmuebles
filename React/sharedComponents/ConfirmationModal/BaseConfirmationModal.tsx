import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import BaseTheme from '../BaseTheme';

export interface ConfirmationComponentProps {
    giveAnswer: (answer: boolean) => void;
}

function baseConfirm<T extends ConfirmationComponentProps>(
    DialogContent: React.FC<T>,
    dialogProps: any
): Promise<boolean> {
    const confirmRoot = document.querySelector(
        '#confirmation-message-placeholder'
    ) as HTMLElement;

    return new Promise((res) => {
        const giveAnswer = (answer: boolean) => {
            ReactDOM.unmountComponentAtNode(confirmRoot);
            res(answer);
        };

        ReactDOM.render(
            <ThemeProvider theme={BaseTheme}>
                <DialogContent {...dialogProps} giveAnswer={giveAnswer} />
            </ThemeProvider>,
            confirmRoot
        );
    });
}

export default baseConfirm;
