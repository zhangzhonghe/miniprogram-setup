import { NOOP } from './shared';

let updateData = NOOP;

export const getUpdateData = () => updateData;
export const setUpdateData = (value: () => void) => (updateData = value);
