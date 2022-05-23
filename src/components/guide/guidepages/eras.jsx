import { eraArray } from "../../../config/eras"

export default function FarmGuide({empire})
{
    return (
    <div>
        <h2>Agriculture Focus</h2>
<p>Here you may choose to spend time with extra focus placed on producing {eraArray[empire.era].food} to sustain your citizens and military.</p>
<p>While spending turns here, your empire's gross production of {eraArray[empire.era].food} will increase by 25%.</p>
    </div>
    )
}
