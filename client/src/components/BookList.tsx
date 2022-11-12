import { useQuery, gql } from '@apollo/client';


const GET_BOOKS = gql`
query GetBooks {
  books {
    title, price, id, author
  }
}
`

interface Book {
    title: string,
    author: string,
    id: string,
    price: number
}

function ListOfBooks() {
    const { data, error, loading } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return (
        <div className="App">
            <h1>
                List Of Books
            </h1>
            {data.books.map((b: Book) => (
                <p key={b.id}>{b.title}</p>
            ))}
        </div>
    );
}

export default ListOfBooks;
