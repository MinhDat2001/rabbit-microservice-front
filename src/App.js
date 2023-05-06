import {  React } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { userRoute } from './routes/index';
function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                {userRoute.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<Page />}
                        />
                    );
                })}
            </Routes>
        </div>
    </Router>
  );
}

export default App;
