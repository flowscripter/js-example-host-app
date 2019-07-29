import { NodePluginManager } from '@flowscripter/esm-dynamic-plugins';
import commonApp from './commonApp';

(async () => {
    const pluginManager = new NodePluginManager();

    await commonApp(pluginManager);
})();
