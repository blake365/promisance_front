
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TurnResultCard from "./turnResultCard";


export default function TurnResultContainer({ empire })
{
  // const [results, setResults] = useState([])
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);

  let location = useLocation()

  const { turnResult } = useSelector((state) => state.results)

  useEffect(() =>
  {
    if (turnResult.length > 0) {
      setResult(turnResult);
    }
    setShow(true);
  }, [turnResult]);

  useEffect(() =>
  {
    setShow(false)
  }, [location])

  return show ? (
    <div style={{ maxHeight: '300px', overflow: 'scroll', padding: '0.5rem', paddingBottom: '0.75rem' }} className="step-twopointfive fifth-step">
      {result.map((item, index) =>
      {
        return (<TurnResultCard data={item} key={index} era={empire.era} />)
      })}
    </div>
  ) : null
}