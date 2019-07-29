import { BrowserPluginManager } from '@flowscripter/esm-dynamic-plugins';
import commonApp from './commonApp';

export default async (urls) => {
    const pluginManager = new BrowserPluginManager(urls);

    await commonApp(pluginManager);
};
