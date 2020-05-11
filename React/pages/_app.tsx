import { useEffect } from 'react';
import { AppProps } from 'next/app';

import Layout from '../sharedComponents/Layout';
import { catalogsApi } from '../core/api';

function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        catalogsApi.fetchAllCatalogs();
    }, []);

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

App.getInitialProps = () => {
    return {};
};

export default App;
