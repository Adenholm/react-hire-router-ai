import PropTypes from 'prop-types';
import PeopleListItem from './PeopleListItem';

function PeopleList({ people }) {
  if (!people || people.length === 0) {
    return <p>No people found.</p>;
  }

  return (
    <ul>
      {people.map((person) => (
        <PeopleListItem key={person.id || person.email || person.name} person={person} />
      ))}
    </ul>
  );
}

PeopleList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PeopleList;
