import Button from '@mui/material/Button';
import { useState, useContext } from 'react';
import { GoSearch } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../../App';

const SearchBox = () => {
  const [searchFields, setSearchFields] = useState('');
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const onChangeValue = (e) => {
    setSearchFields(e.target.value);
  };

  const searchProducts = () => {
    if (searchFields.trim() === '') {
      context.setAlertBox({
        open: true,
        error: true,
        msg: 'Please enter a valid search term.'
      });
      return;
    }

    navigate('/search', { state: { searchFields } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchProducts();
    }
  };

  return (
    <div className="headerSearch ml-3 mr-3">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchFields}
        onChange={onChangeValue}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={searchProducts}>
        <GoSearch />
      </Button>
    </div>
  );
};

export default SearchBox;
