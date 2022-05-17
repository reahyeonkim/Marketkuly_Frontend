import { useSelector ,useDispatch } from 'react-redux';

const Search = () => {

    const search = useSelector((state)=> state.product.search);
    return search;
};

export default Search;