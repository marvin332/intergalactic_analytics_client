import { GeneratorPage } from "../pages/generatorPage/GeneratorPage.tsx";

import { AnalyticPage } from "../pages/analyticPage/AnalyticPage.tsx";

import { HistoryPage } from "../pages/historyPage/HistoryPage.tsx";
import { Route, Routes } from "react-router-dom";
import { Container } from "../shared/container/Container.tsx";
import { Header } from "../widgets/header/Header.tsx";

function App() {
     return (
          <>
               <Container>
                    <Header />
                    <Routes>
                         <Route path={"/"} element={<AnalyticPage />} />
                         <Route path={"/generator"} element={<GeneratorPage />} />
                         <Route path={"/history"} element={<HistoryPage />} />
                    </Routes>
               </Container>
          </>
     );
}

export default App;
