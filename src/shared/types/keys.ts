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
export type AmmoKey = 'pistol' | 'pdw' | 'rifle' | 'shotgun' | 'grenadeLauncher';
export type ArmorKey = 'armor';
export type BackpacksKey = 'backpacks';
export type BossesKey = 'bosses';
export type MapsKey = 'maps';
export type MedicalKey = 'medical';
export type ProvisionsKey = 'provisions';
export type QuestsKey = 'quests';

/**
 * Import key
 */
export type ImportKey = 'ammo' | 'armor' | 'backpacks' | 'bosses' | 'medical' | 'maps' | 'provisions' | 'quests';