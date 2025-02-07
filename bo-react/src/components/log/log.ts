/* eslint-disable no-console */
import { Log } from './types';

const logSet = new Set();

const log: Log = {
  warn(componentName, message): void {
    console.warn(`bo-react ${componentName} Warn: ${message}`);
  },
  warnOnce(componentName, message): void {
    const msgContent = `bo-react ${componentName} Warn: ${message}`;
    if (logSet.has(msgContent)) return;
    logSet.add(msgContent);
    console.warn(msgContent);
  },
  error(componentName, message): void {
    console.error(`bo-react ${componentName} Error: ${message}`);
  },
  errorOnce(componentName, message): void {
    const msgContent = `bo-react ${componentName} Error: ${message}`;
    if (logSet.has(msgContent)) return;
    logSet.add(msgContent);
    console.error(msgContent);
  },
  info(componentName, message): void {
    console.info(`bo-react ${componentName} Info: ${message}`);
  },
};

export default log;
