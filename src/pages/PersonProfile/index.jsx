import PropTypes from 'prop-types';
import HireForm from './components/HireForm';
import { useParams } from 'react-router-dom';

function PersonProfile({ people, setHiredPeople }) {
  const { id } = useParams();
  const person = people.find((x) => x.login.uuid === id);

  if (!person) return <p>Loading...</p>;

  return (
    <article>
      <img
        src={person.picture.large}
        alt={`${person.name.first} ${person.name.last}`}
        style={{ borderRadius: '50%', width: 150, height: 150 }}
      />
      <h2>
        {person.name.title} {person.name.first} {person.name.last}
      </h2>
      <ul>
        <li>
          <strong>Location:</strong> {person.location.country}
        </li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${person.email}`}>{person.email}</a>
        </li>
        <li>
          <strong>Phone:</strong> <a href={`tel:${person.cell}`}>{person.cell}</a>
        </li>
      </ul>
      <HireForm person={person} setHiredPeople={setHiredPeople} />
    </article>
  );
}

PersonProfile.propTypes = {
  people: PropTypes.array.isRequired,
  setHiredPeople: PropTypes.func.isRequired,
};

export default PersonProfile;
