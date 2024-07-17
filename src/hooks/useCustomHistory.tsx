import { useHistory } from "react-router-dom";
import routes from "~/router/routes";

const useCustomHistory = () => {
    const history = useHistory();
    const goToHome = () => {
        history.push(routes.dashboard);
    };
    return { goToHome };
}

export default useCustomHistory;