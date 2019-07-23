import Debug from 'debug';
import { NodePluginManager } from '@flowscripter/esm-dynamic-plugins';

const log = Debug('node');

export default function () {

    log('default()');

    return new NodePluginManager();
}
