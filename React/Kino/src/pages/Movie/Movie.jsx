import { useParams } from 'react-router-dom';

function Movie() {  
  const { id } = useParams();

  return (
    <div>
      <h1>Страница фильма #{id}</h1>
      <p>Здесь будет информация о фильме с ID: {id}</p>
    </div>
  );
}

export default Movie;  