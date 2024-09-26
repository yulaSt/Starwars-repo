import { useState } from "react";
import styled, { css } from "styled-components";
import { useShallow } from "zustand/shallow";
import type { Person } from "../interfaces/person";
import useStore from "../store/store";

const StyledTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto; // Adds horizontal scrolling for smaller screens
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  table-layout: fixed;

  @media (max-width: 768px) {
    width: 100%;
    display: block;
  }
`;

const cellStyles = css`
  padding: 14px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledTh = styled.th`
  ${cellStyles}
  background-color: #f8f9fa;
  color: #333;
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid #ddd;
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const StyledTd = styled.td`
  ${cellStyles}
  border-bottom: 1px solid #eee;
  color: #555;
  font-size: 14px;
  vertical-align: middle;
  transition: background-color 0.2s ease-in-out;

  &:last-child {
    text-align: right; // Right-align action buttons
  }

  @media (max-width: 768px) {
    display: block;
    padding: 10px;
    text-align: left;
  }
`;
const ActionButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 12px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:last-child {
    margin-right: 0;
  }
`;
const CancelButton = styled(ActionButton)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const StyledActionsTd = styled(StyledTd)`
  button {
    margin-right: 5px;
  }
  white-space: nowrap;

  @media (max-width: 768px) {
    &::before {
      content: "Actions";
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #555;
  transition: border-color 0.2s ease-in-out;
  z-index: 4;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const columns = [
  { key: "name", width: "10%" },
  { key: "birth_year", width: "5%" },
  { key: "hair_color", width: "7%" },
  { key: "skin_color", width: "7%" },
  { key: "eye_color", width: "7%" },
  { key: "gender", width: "7%" },
  { key: "height", width: "5%" },
  { key: "mass", width: "5%" },
  { key: "homeworld", width: "7%" },
  { key: "created", width: "7%" },
  { key: "edited", width: "7%" },
  { key: "url", width: "15%" },
];

interface ActionsTdProps {
  onSave: () => void;
  onCancel: () =>void;
  onDelete: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: Boolean;
}

const ActionsTd: React.FC<ActionsTdProps> = ({
  onSave,
  onCancel,
  onDelete,
  setIsEditing,
  isEditing,
}) => {
  return (
    <StyledTd>
      {isEditing ? (
        <>
          <ActionButton onClick={() => onSave()}>Save</ActionButton>
          <CancelButton onClick={() => onCancel()}>Cancel</CancelButton>
        </>
      ) : (
        <>
          <ActionButton onClick={() => onDelete()}>Delete</ActionButton>
          <ActionButton onClick={() => setIsEditing(true)}>Edit</ActionButton>
        </>
      )}
    </StyledTd>
  );
};

interface TableCellProps {
  value: string;
  isEditing: boolean;
  onChange: (newValue: string) => void;
}

const TableCell: React.FC<TableCellProps> = ({
  value,
  isEditing,
  onChange,
}) => {
  return isEditing ? (
    <StyledInput
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <span>{value}</span>
  );
};

interface TableRowProps {
  person: Person;
  isCreating?: boolean;
  setIsCreating?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableRow: React.FC<TableRowProps> = ({
  person,
  isCreating = false,
  setIsCreating,
}) => {
  const { deletePerson, updatePerson, addPerson } = useStore(
    useShallow((state) => ({
      deletePerson: state.deletePerson,
      updatePerson: state.updatePerson,
      addPerson: state.addPerson,
    }))
  );

  const [isEditing, setIsEditing] = useState(isCreating);
  const [tempPerson, setTempPerson] = useState(person); // to handle the editing

  const sortedPersonEntries = (person: Person, columns: any[]) => {
    // order the person attributes by the order of the table header
    return columns.map((column) => [
      column.key,
      person[column.key as keyof Person],
    ]);
  };

  const handelCancelEdit = () => {
    !!setIsCreating && setIsCreating(false)
    setIsEditing(false)
  }

  const handleDeletePerson = () => {
    deletePerson(person.name);
  };

  const handleSavePerson = () => {
    if (isCreating) {
      addPerson(tempPerson);
      !!setIsCreating && setIsCreating(false);
    } else {
      updatePerson(person.name, tempPerson);
    }
    setIsEditing(false);
  };

  const setAttr = (key: string, newValue: string) => {
    setTempPerson((prev) => ({ ...prev, [key]: newValue }));
  };

  const sortedEntries = sortedPersonEntries(tempPerson, columns);

  return (
    <tr key={tempPerson.name}>
      {sortedEntries.map(([key, value]) => (
        <StyledTd key={key}>
          <TableCell
            isEditing={isEditing}
            value={value}
            onChange={(newValue) => setAttr(key, newValue)}
          />
        </StyledTd>
      ))}
      <StyledActionsTd>
        <ActionsTd
          onSave={handleSavePerson}
          onCancel={handelCancelEdit}
          onDelete={handleDeletePerson}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        ></ActionsTd>
      </StyledActionsTd>
    </tr>
  );
};

const PeoplePage: React.FC = () => {
  const people = useStore((v) => v.getCategory("people"));

  const newPerson= {
    name: "",
    birth_year: "",
    hair_color: "",
    skin_color: "",
    eye_color: "",
    gender: "",
    height: "",
    mass: "",
    homeworld: "",
    created: "",
    edited: "",
    url: "",
  };

  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      <StyledTableWrapper>
        <StyledTable>
          <colgroup>
            {columns.map((col) => (
              <col key={col.key} style={{ width: col.width }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map((col) => (
                <StyledTh key={col.key}>{col.key.replace("_", " ")}</StyledTh>
              ))}
              <StyledTh>
                <ActionButton onClick={() => setIsCreating(true)}>
                  Create New Person
                </ActionButton>
              </StyledTh>
            </tr>
          </thead>
          <tbody>
            {!!isCreating && (
              <TableRow
                key={people.length}
                person={newPerson}
                isCreating={true}
                setIsCreating={setIsCreating}
              />
            )}
            {people.map((person: Person, index) => (
              <TableRow key={index} person={people[index]} />
            ))}
          </tbody>
        </StyledTable>
      </StyledTableWrapper>
    </>
  );
};

export default PeoplePage;
