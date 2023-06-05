import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => (
  axios
		.get(baseUrl)
    .then(response => response.data)
)

const addNew = (personObject) => {
	return(
    axios
      .post(baseUrl, personObject)
			.then(response => response.data)
	)
}

const yeetPerson = (id) => {
	return(
		axios
			.delete(baseUrl + '/' + id)
	)
}

const replace = (person, id) => {
  console.log(person)
  return(
    axios
      .put(baseUrl + '/' + id, person)
      .then(response => response.data)
  )
}

export default{
    getAll,
		addNew,
		yeetPerson,
    replace
}