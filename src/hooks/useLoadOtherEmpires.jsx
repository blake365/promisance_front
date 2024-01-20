import { useState, useEffect } from 'react';
import Axios from 'axios';
import { raceArray } from '../config/races';
import { eraArray } from '../config/eras';

export const useLoadOtherEmpires = (empireId, trigger) =>
{
    const [otherEmpires, setOtherEmpires] = useState([]);

    useEffect(() =>
    {
        const loadOtherEmpires = async () =>
        {
            try {
                const res = await Axios.post(`/empire/otherEmpires`, { empireId });
                let dataFormat = res.data.map((empire) => ({
                    value: empire.empireId.toLocaleString(),
                    land: empire.land.toLocaleString(),
                    networth: empire.networth.toLocaleString(),
                    race: raceArray[empire.race].name,
                    era: eraArray[empire.era].name,
                    name: empire.name,
                    empireId: empire.empireId,
                    label: `${empire.name}`,
                    dr: empire.diminishingReturns
                }));
                setOtherEmpires(dataFormat);
            } catch (error) {
                console.log(error);
            }
        };
        loadOtherEmpires();
    }, [empireId, trigger]);

    return otherEmpires;
};