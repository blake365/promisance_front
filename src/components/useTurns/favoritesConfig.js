import Build from './build'
import Demolish from './demolish'
import Cash from './cash'
import Explore from './explore'
import Farm from './farm'
import Industry from './industry'
import Meditate from './meditate'
import MagicCenter from './magiccenter'
import Heal from './heal'
import AttackMini from '../diplomacy/attackMini'
import SpellMini from '../diplomacy/spellMini'

export const FAVORITES_CONFIG = {
    'action_build': {
        component: Build,
        translationKey: 'turns:build.title',
        legacyKey: 'Build'  // for backward compatibility
    },
    'action_demolish': {
        component: Demolish,
        translationKey: 'turns:demolish.title',
        legacyKey: 'Demolish'
    },
    'action_cash': {
        component: Cash,
        translationKey: 'turns:cash.title',
        legacyKey: 'cash'
    },
    'action_explore': {
        component: Explore,
        translationKey: 'turns:explore.title',
        legacyKey: 'explore'
    },
    'action_farm': {
        component: Farm,
        translationKey: 'turns:farm.title',
        legacyKey: 'farm'
    },
    'action_industry': {
        component: Industry,
        translationKey: 'turns:industry.title',
        legacyKey: 'industry'
    },
    'action_meditate': {
        component: Meditate,
        translationKey: 'turns:meditate.title',
        legacyKey: 'meditate'
    },
    'action_magic_center': {
        component: MagicCenter,
        translationKey: 'turns:magic_center.title',
        legacyKey: 'MagicCenter'
    },
    'action_heal': {
        component: Heal,
        translationKey: 'turns:heal.title',
        legacyKey: 'heal'
    },
    'action_attack': {
        component: AttackMini,
        translationKey: 'turns:attack.title',
        legacyKey: 'Attack'
    },
    'action_spell': {
        component: SpellMini,
        translationKey: 'turns:spell.title',
        legacyKey: 'Spell'
    }
};

// Helper function to convert legacy keys to new format
export const convertLegacyKey = (key) => {
    // If it starts with 'bld_', it's a building key, keep as is
    if (key.startsWith('bld_')) {
        return key;
    }
    
    // Find the new key by matching against legacy keys
    for (const [newKey, config] of Object.entries(FAVORITES_CONFIG)) {
        if (config.legacyKey === key) {
            return newKey;
        }
    }
    
    return key; // Return original if no match found
};

// Helper function to get component info
export const getComponentInfo = (key) => {
    if (key.startsWith('bld_')) {
        return {
            type: 'building',
            key
        };
    }
    
    return FAVORITES_CONFIG[key] || null;
}; 