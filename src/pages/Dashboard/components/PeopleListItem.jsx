import { Link, useNavigate } from "react-router-dom"
import PropTypes from "prop-types";


function PeopleListItem({ person }) {
  const navigate = useNavigate();

  const fullName = `${person.name.title} ${person.name.first} ${person.name.last}`;
  const personId = person.login?.uuid;

  return (
    <li className="person-li">
      <Link to={`/people/${personId}`} className="flex-row" aria-label={`View details for ${fullName}`}>
        <img
          src={person.picture?.medium}
          alt={fullName}
          loading="lazy"
          style={{ borderRadius: "50%" }}
        />
        <div>
          <h3>{fullName}</h3>
          {person.wage && (
            <p>
              Wage: <span aria-label="wage">£{person.wage}</span>
            </p>
          )}
        </div>
      </Link>
      {person.wage && (
        <button
          type="button"
          onClick={() => navigate(`/edit/${personId}`)}
          aria-label={`Edit wage for ${fullName}`}
        >
          Edit
        </button>
      )}
    </li>
  );
}

PeopleListItem.propTypes = {
  person: PropTypes.shape({
    login: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.shape({
      title: PropTypes.string,
      first: PropTypes.string,
      last: PropTypes.string,
    }).isRequired,
    picture: PropTypes.shape({
      medium: PropTypes.string,
    }),
    wage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default PeopleListItem;
