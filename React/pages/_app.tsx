import { AppProps } from 'next/app';

import Layout from '../sharedComponents/Layout';

function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default App;
