import { useState , useEffect} from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';

function Home() {
  const [selected, setSelected] = useState([]);
  const [lastSeletedCart, setLastSeletedCart] = useState(0);
  const [canPlay , setCanPlay] = useState(true)
  const [toggleLastClick , setToggleLastClick] = useState(true)
  const [deck , setDeck] = useState([])
  useEffect(()=>{
    setDeck(bufferDeck)
    console.log(deck)
    setDeck(bufferDeck.sort((a,b)=>Math.random()-Math.random()))
  },[toggleLastClick])
  

  const bufferDeck = [
    { id: 1, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 2, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 3, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 4, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 5, name: 'cactus', image: '/cactus.svg' },
    { id: 6, name: 'cactus', image: '/cactus.svg' },
    { id: 7, name: 'dog', image: '/dog.svg' },
    { id: 8, name: 'dog', image: '/dog.svg' },
    { id: 9, name: 'laptop', image: '/laptop.svg' },
    { id: 10, name: 'laptop', image: '/laptop.svg' },
    { id: 11, name: 'octopus', image: '/octopus.svg' },
    { id: 12, name: 'octopus', image: '/octopus.svg' },
    { id: 13, name: 'strawberry', image: '/strawberry.svg' },
    { id: 14, name: 'strawberry', image: '/strawberry.svg' },
    { id: 15, name: 'sunglasses', image: '/sunglasses.svg' },
    { id: 16, name: 'sunglasses', image: '/sunglasses.svg' },
  ]
  
  const selectCard = (id) => {
    if (canPlay && id != lastSeletedCart){
      
      if(!lastSeletedCart){
        setSelected([...selected, id]);
        setLastSeletedCart(id)
      }
      else{
        setCanPlay(false)
        setSelected([...selected, id]);
        if(deck.find(n=>lastSeletedCart===n.id).name === deck.find(n=>id===n.id).name){
          setCanPlay(true)
        }
        else{
          setTimeout(() => {
            setCanPlay(true)
            setSelected(selected.filter(idCart=>idCart !=id && idCart!=lastSeletedCart));
          }, "1000");
          
        }
        
        setLastSeletedCart(0)
      }
      if (selected.length === 16) {
        setSelected([]);
        setLastSeletedCart(0);
        setCanPlay(false)
        setTimeout(() => {
          setCanPlay(true)
          setToggleLastClick(!toggleLastClick)
        }, "1000");
        
      }
    }
  };

  const cardsToDisplay = deck.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={selectCard}
        selected={selected.includes(card.id)}
      />
    );
  });

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          Memory Game 🧠
        </h1>
        <div className={styles.headerDivider} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          {cardsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default Home;
