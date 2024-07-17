import Router from "~/router";
import { Header } from "./components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIndicator from "./components/LoadingIndicator";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ModalProvider } from "./contexts/ModalContext";
import ModalConfirmation from "./components/ModalConfirmation";
import { RegistrationProvider } from "./contexts/RegistrationContext";

function App() {
  return (
    <>
      
      <LoadingProvider>
        <ModalProvider>
          <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
          />
          <LoadingIndicator />
          <ModalConfirmation />
          <RegistrationProvider>
          <Header>
            <h1>Caju Front Teste</h1>
          </Header>
          <Router />
          </RegistrationProvider>
        </ModalProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
