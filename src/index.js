import _ from 'lodash';
import Debug from 'debug';
import { EXTENSION_POINT_A_ID } from './ExtensionPointA';
import { EXTENSION_POINT_B_ID } from './ExtensionPointB';

const log = Debug('index');

(async () => {

    let runtime;

    if (_.isUndefined(process)) {
        log('Loading browser support');
        runtime = await import('./browser');
    } else {
        log('Loading node suppport');
        runtime = await import('./node');
    }

    const pluginManager = runtime.default();

    pluginManager.registerExtensionPoint(EXTENSION_POINT_A_ID);
    pluginManager.registerExtensionPoint(EXTENSION_POINT_B_ID);

    let count = await pluginManager.registerPluginsByExtensionPoint(EXTENSION_POINT_A_ID);
    log(`Loaded ${count} new plugins providing extensions for Extension Point A`);

    count = await pluginManager.registerPluginsByExtensionPoint(EXTENSION_POINT_B_ID);
    log(`Loaded ${count} new plugins providing extensions for Extension Point B`);

    const plugins = Array.from(pluginManager.getRegisteredPlugins());
    const aExtensions = Array.from(pluginManager.getExtensions(EXTENSION_POINT_A_ID));
    const bExtensions = Array.from(pluginManager.getExtensions(EXTENSION_POINT_B_ID));

    plugins.forEach((plugin) => {
        log(`Plugin has data: ${plugin.pluginData}`);
    });

    aExtensions.forEach(async (info) => {
        log(`Extension for Extension Point A has data: ${info.extensionData}`);

        const aExtension = await pluginManager.instantiate(info.extensionHandle, 'Host');

        aExtension.sayHello();
    });

    bExtensions.forEach(async (info) => {
        log(`Extension for Extension Point B has data: ${info.extensionData}`);

        const bExtension = await pluginManager.instantiate(info.extensionHandle, 'Host');

        bExtension.sayGoodbye();
    });
})();
