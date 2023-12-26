const SearchFilter = ({ filter, handleFilterChange }) => {
    return (
        <>
            <h2>Filter countries</h2>
            <input value={filter} onChange={handleFilterChange} />
        </>
    );
}

export default SearchFilter