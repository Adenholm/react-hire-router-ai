import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function EditProfile({ hiredPeople, setHiredPeople }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const person = useMemo(
        () => hiredPeople.find((x) => x.login.uuid === id),
        [hiredPeople, id]
    );

    const [edited, setEdited] = useState(() =>
        person ? { ...person, name: { ...person.name } } : null
    );

    // Sync edited state if person changes (e.g., on fast navigation)
    // Prevents stale state if hiredPeople updates
    useMemo(() => {
        if (person) setEdited({ ...person, name: { ...person.name } });
    }, [person]);

    function handleChange(event) {
        const { name, value } = event.target;
        setEdited((prev) => ({
            ...prev,
            name: {
                ...prev.name,
                [name]: value,
            },
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setHiredPeople((prev) =>
            prev.map((item) =>
                item.login.uuid === person.login.uuid ? { ...edited } : item
            )
        );
        navigate("/");
    }

    if (!person || !edited) return <p>Loading...</p>;

    return (
        <form className="form-col" onSubmit={handleSubmit}>
            <img src={person.picture.large} alt={`${person.name.first} ${person.name.last}`} className="pic" />
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={edited.name.title}
                    autoComplete="off"
                />
            </label>
            <label>
                First name:
                <input
                    type="text"
                    name="first"
                    onChange={handleChange}
                    value={edited.name.first}
                    autoComplete="off"
                />
            </label>
            <label>
                Last name:
                <input
                    type="text"
                    name="last"
                    onChange={handleChange}
                    value={edited.name.last}
                    autoComplete="off"
                />
            </label>
            <button type="submit">Save changes</button>
        </form>
    );
}
EditProfile.propTypes = {
    hiredPeople: PropTypes.arrayOf(
        PropTypes.shape({
            login: PropTypes.shape({
                uuid: PropTypes.string.isRequired,
            }).isRequired,
            name: PropTypes.shape({
                title: PropTypes.string,
                first: PropTypes.string,
                last: PropTypes.string,
            }).isRequired,
            picture: PropTypes.shape({
                large: PropTypes.string,
            }),
        })
    ).isRequired,
    setHiredPeople: PropTypes.func.isRequired,
};