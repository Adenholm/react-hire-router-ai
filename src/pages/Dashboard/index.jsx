/* eslint-disable react/prop-types */
import PeopleList from './components/PeopleList';
import './dashboard.css';

function Dashboard({ hiredPeople = [], people = [] }) {
  return (
    <main className="dashboard-layout">
      <section>
        <h2>People</h2>
        {people.length > 0 ? (
          <PeopleList people={people} />
        ) : (
          <p>No people available.</p>
        )}
      </section>
      <section>
        <h2>Hired People</h2>
        {hiredPeople.length > 0 ? (
          <PeopleList people={hiredPeople} />
        ) : (
          <p>No hired people yet.</p>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
