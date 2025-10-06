import Search from '../../components/Search/Search.jsx'; 
import Card from '../../components/Card/Card.jsx';  

function Home() {
  return (
    <>
      <Search onSearch={(query) => console.log("Поисковый запрос:", query)} />
      <Card />
    </>
  );
}

export default Home;