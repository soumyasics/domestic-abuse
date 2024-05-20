import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';

function AdminSearchbar() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Search text:', searchText);
  };

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <div className="d-flex align-items-center mb-3">
      <InputGroup className="rounded-pill w-50">
        <InputGroup.Text className="border-0 bg-white">
          <FaSearch />
        </InputGroup.Text>
        <FormControl
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="search-bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border-0"
        />
        {searchText && (
          <InputGroup.Text
            className="border-0 bg-white"
            onClick={handleClear}
            style={{ cursor: 'pointer' }}
          >
            <FaTimes />
          </InputGroup.Text>
        )}
      </InputGroup>
      <Button
        variant="primary"
        onClick={handleSearch}
        className="ms-2 rounded-pill bg-theme border-0 text-dark fw-bolder px-4 m-3"
      >
        Search
      </Button>
    </div>
  );
}

export default AdminSearchbar;
