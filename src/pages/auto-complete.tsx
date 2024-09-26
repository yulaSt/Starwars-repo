import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useSearchSwApi from "../hooks/use-search-sw-api";
import { categories, type CategoryKey } from "../interfaces/endpoints";
import useStore from "../store/store";

const StyledInput = styled.div`
  background: transparent;
  border-radius: 3px;
  flex-grow: 1;
  margin-bottom: 2rem;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;conso
  align-items: center;
  padding: 3rem;
  color: white;
  background-color: #131a22;
`;

const StyledCategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const StyledCard = styled.div`
  background-color: #1e2832;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 200px; // Adjust this value as needed
`;

const StyledCardContent = styled.div`
  flex-grow: 1;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const StyledListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const StyledButton = styled(Link)`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  margin-top: auto;
  display: block;

  &:hover {
    background-color: #0056b3;
  }
`;

const CategoryCard: React.FC<{ categoryName: CategoryKey }> = ({
  categoryName,
}) => {
  const categoryData = useStore((v) => v.getCategory(categoryName));

  if (!categoryData || categoryData.length === 0) {
    return null;
  }

  const displayItems = categoryData.slice(0, 3);

  return (
    <StyledCard>
      <StyledCardContent>
        <h2>{categoryName}</h2>
        <StyledList>
          {displayItems.map((item: any) => (
            <StyledListItem key={item.name || item.title}>
              {item.name || item.title}
            </StyledListItem>
          ))}
        </StyledList>
      </StyledCardContent>
      <StyledButton to={`/${categoryName}`}>Show All</StyledButton>
    </StyledCard>
  );
};

const AutoComplete: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, isError, error } = useSearchSwApi(searchTerm);

  return (
    <StyledContainer>
      <StyledInput>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
      </StyledInput>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error?.message}</p>
      ) : (
        <StyledCategoryGrid>
          {categories.map((category) => (
            <CategoryCard key={category.name} categoryName={category.name} />
          ))}
        </StyledCategoryGrid>
      )}
    </StyledContainer>
  );
};

export default AutoComplete;
