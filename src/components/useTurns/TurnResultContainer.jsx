
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TurnResultCard from "./turnResultCard";


export default function TurnResultContainer()
{
    // const [results, setResults] = useState([])
      const [result, setResult] = useState([]);


    const {turnResult} = useSelector((state) => state.results)

    useEffect(() => {
    if (turnResult.length > 0) {
      setResult(turnResult);

    }
  }, [turnResult]);

    return (
        <div style={{ maxHeight: '600px', overflow: 'scroll', padding: '0.5rem'}}>
        { result.map(item =>
            {
                return (<TurnResultCard data={item} />)
            })}
        </div>
    )
}