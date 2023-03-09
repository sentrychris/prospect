/**
 * Keys used to import data from the wiki.
 * 
 * These keys correspond to the object keys used in src/map/wiki.
 * 
 * Example:
 * 
 * MedicalKey: 'medical';
 * 
 * src/map/wiki:
 * export const medical = [
 *     'Medical'
 * ];
 * 
 * export const medicalTypes = {
 *     medical: medical,
 * };
 * 
 * Will result in a request to https://escapefromtarkov.fandom.com/wiki/Medical when the key is used
 */
export type DeviceKey = 'devices';

/**
 * Import key
 */
export type ImportKey = 'device';