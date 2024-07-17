import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useRegistrations } from '~/contexts/RegistrationContext';
const DashboardPage = () => {
  const { registrations } = useRegistrations();

  return (
    <S.Container>
      <SearchBar/>
      <Collumns registrations={registrations}/>
    </S.Container>
  );
};
export default DashboardPage;
