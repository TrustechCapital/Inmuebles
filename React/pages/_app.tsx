import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';

import Layout from '../sharedComponents/Layout';
import { catalogsApi } from '../core/api';

function App({ Component, pageProps }: AppProps) {
    const [loadingApp, setLoadingApp] = useState(true);

    useEffect(() => {
        catalogsApi.fetchAllCatalogs().then((params) => {
            setLoadingApp(false);
        });
    }, []);

    return (
        <Layout>
            {loadingApp ? 'Cargando...' : <Component {...pageProps} />}
        </Layout>
    );
}

App.getInitialProps = () => {
    return {};
};

export default App;
