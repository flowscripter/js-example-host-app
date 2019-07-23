import Debug from 'debug';
import { BrowserPluginManager } from '@flowscripter/esm-dynamic-plugins';

const log = Debug('browser');

export default function () {

    log('default()');

    return new BrowserPluginManager(['']);
}
