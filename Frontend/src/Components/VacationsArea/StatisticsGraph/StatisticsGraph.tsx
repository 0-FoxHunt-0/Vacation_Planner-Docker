
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import VacationModel from '../../../Models/VacationModel';
import { vacationStore } from '../../../Redux/VacationState';
import "./StatisticsGraph.css";


interface Vacation {
    name: string;
    likes: number;
}

function StatisticsGraph(): JSX.Element {

    const [statisticsVacations, setStatisticsVacations] = useState<VacationModel[]>([])

    useEffect(() => {
        setStatisticsVacations(vacationStore.getState().vacations)
    }, [])
    const destinationData: Vacation[] = statisticsVacations.map(v => ({ name: v.destination, likes: v.followerCount }))

    return (
        <div className="StatisticsGraph">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <BarChart
                    width={900}
                    height={600}
                    data={destinationData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    )
}

export default StatisticsGraph;
