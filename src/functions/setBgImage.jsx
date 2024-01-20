import { TURNS_PROTECTION } from '../config/config'

export const setBgImage = (empire) =>
{
    let bgimage = '/images/summaries/default.webp'

    let cash = Math.round(empire.bldPop / empire.land * 100) + Math.round(empire.bldCash / empire.land * 100)
    let indy = Math.round(empire.bldTroop / empire.land * 100)
    let mage = Math.round(empire.bldWiz / empire.land * 100)
    let farm = Math.round(empire.bldFood / empire.land * 100)

    if (empire.turnsUsed < TURNS_PROTECTION) {
        bgimage = '/images/summaries/default.webp'
    } else if (cash > indy && cash > mage && cash > farm) {
        if (empire.era === 0) {
            bgimage = '/images/summaries/cashpast.webp'
        } else if (empire.era === 1) {
            bgimage = '/images/summaries/cashpresent.webp'
        } else if (empire.era === 2) {
            bgimage = '/images/summaries/cashfuture.webp'
        }
    } else if (indy > cash && indy > mage && indy > farm) {
        if (empire.era === 0) {
            bgimage = '/images/summaries/indypast.webp'
        } else if (empire.era === 1) {
            bgimage = '/images/summaries/indypresent.webp'
        } else if (empire.era === 2) {
            bgimage = '/images/summaries/indyfuture.webp'
        }
    } else if (mage > cash && mage > indy && mage > farm) {
        if (empire.era === 0) {
            bgimage = '/images/summaries/magepast.webp'
        } else if (empire.era === 1) {
            bgimage = '/images/summaries/magepresent.webp'
        } else if (empire.era === 2) {
            bgimage = '/images/summaries/magefuture.webp'
        }
    } else if (farm > cash && farm > indy && farm > mage) {
        if (empire.era === 0) {
            bgimage = '/images/summaries/farmpast.webp'
        } else if (empire.era === 1) {
            bgimage = '/images/summaries/farmpresent.webp'
        } else if (empire.era === 2) {
            bgimage = '/images/summaries/farmfuture.webp'
        }
    } else {
        bgimage = '/images/summaries/default.webp'
    }
    return bgimage
}