import { departments, teams, employees } from '../../data/mockData';
import OrgChart from '../../components/org/OrgChart';

export default function OrgOverview() {
    return (
        <div>
            <div className="page-header">
                <h1>Organisation</h1>
                <p>Organigramm der AXA Generalagentur Stefan Malara, Bülach</p>
            </div>

            <OrgChart employees={employees} departments={departments} teams={teams} />
        </div>
    );
}
